/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('control.Construction');
 * mod.thing == 'a thing'; // true
 */

function Construction(room)
{
    this.room = room;
    this.roomInfo = room.memory.roomInfo;
    this.activeConstructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
    this.builders = this.room.find(FIND_MY_CREEPS, { filter: object => object.memory.role == 'builder' });


    // Set the Memory Objects
    if (!this.room.memory.roomInfo.futureConstructionSites) { this.room.memory.roomInfo.futureConstructionSites = new Array; }
    if (!this.room.memory.roomInfo.knownRoads) { this.room.memory.roomInfo.knownRoads = new Array; }

}

Construction.prototype.run = function()
{
    // Plan next constructions. (This fills up the futureconstructionsites array)
    this.PlanNextConstruction();

    // Do construction stuff - but only if we have builders and are not already building
    if ( this.builders.length > 0  && this.activeConstructionSites.length == 0 )
    {
        if (this.room.memory.roomInfo.futureConstructionSites.length > 0 )
        {
            this.BuildNextConstructionSite();
        }
    }
};

Construction.prototype.PlanNextConstruction = function ()
{
    // Build stuff based on room controller's upgrade level.
    // Check for higher level stuff first, leave the low level stuff for when we have time later on.

    // console.log('control.Construction.PlanNextConstruction: Planning next construction project.');


    var spawn  = this.roomInfo.spawns[0];
    var sources = this.roomInfo.sources;
    var controller = this.room.controller;
    var controllerLevel = this.room.controller.level;



    // Level 2 or higher
    //      - Up to 5 Extensions (Near a road if possible)
    //      - a road around the spawn
    //      - Ramparts around spawn
    //      - Up to 5 containers (useful ?)
    if (controllerLevel >= 2 )
    {

        var currentExtensions = this.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION } });
        var futureExtensions = _(this.roomInfo.futureConstructionSites).where({structure: STRUCTURE_EXTENSION});
        var maxExtensions = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][controllerLevel];

        if (currentExtensions + futureExtensions < maxExtensions)
        {
            var roads = this.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_ROAD } });
            // console.log('DEBUG: control.Construction - roads:' + roads);
            if (roads)
            {
                //Get a random piece of road, we'll try to build there
                var whereToBuild = roads[Math.floor(Math.random() * roads.length)];
                // console.log('DEBUG: control.Construction - whereToBuild:' + whereToBuild);
                if (PlanBuilding(whereToBuild,STRUCTURE_EXTENSION))
                {
                    console.log('control.Construction - Planning an EXTENSION at ' + whereToBuild.pos);
                }
            }
        }
    }


    // Level 1 or higher
    //      - Roads to Nearest source
    //      - Roads to controller
    //		- Roads to the other sources (if there are any)
    if ( controllerLevel >= 1 )
    {

        // PlanRoad returns false if the road has already been built (is in the "known roads" list)
        // the if(!) construct should therefor only execute the next line if the previous has already been done
        // makes for quick and easy lines of:  if (!planroad(a,b)) if (!planroad(b,c))

        // for every source, plan the following roads:
        //      1) road to/from the spawn
        //      2) road to/from the controller
        //      3)road around the source location (do we need this?)
        for (let n in sources)
        {
            source = Game.getObjectById(sources[n].id)
            if (!PlanRoad(spawn, source))
                if (!PlanRoad(source, spawn))
                    if (!PlanRoad(source, controller))
                    {} // Empty code block or it will not compile
        }

        // Plan a road between spawn and controller
        if (!PlanRoad(spawn, controller))

        // Pave the areas around the spawn and controller
		if (!PlanRoad(spawn, spawn))
		    if (!PlanRoad(controller, controller))
            { } // Empty code block or it will not compile

    }

};
Construction.prototype.BuildNextConstructionSite = function ()
{
    if (this.room.memory.roomInfo.futureConstructionSites.length > 0)
    {
        var nextConstructionSite = this.room.memory.roomInfo.futureConstructionSites.shift();
        var pos = new RoomPosition(nextConstructionSite.position.x, nextConstructionSite.position.y, nextConstructionSite.position.roomName);
        console.log('control.Construction: Starting work on structure [' + nextConstructionSite.structure + '] at position ' + pos)
        this.room.createConstructionSite(pos, nextConstructionSite.structure);
    }
};

Construction.prototype.Report = function()
{
    // Build a population Report
    var report = new Array;

    //Header
    report.push('---------- Construction Report ----------');
    report.push('-');

    report.push('- Number of planned construction sites: ' + this.room.memory.roomInfo.futureConstructionSites.length);
    report.push('- Number of known roads: ' + this.room.memory.roomInfo.knownRoads.length);


    return report;
};

module.exports = Construction ;

// Private stuff goes here

function PlanRoad  (start, end)
{
    //Check if road is already known
    var roadIsKnown = false;
    var knownRoads =  start.room.memory.roomInfo.knownRoads;

    if ( knownRoads && knownRoads.length > 0)
    {
        for ( let n in knownRoads )
        {
            var knownRoad = knownRoads[n];
            if ( knownRoad.start.x == start.pos.x &&  knownRoad.start.y == start.pos.y &&  knownRoad.end.x == end.pos.x &&  knownRoad.end.y == end.pos.y  )
            {
                roadIsKnown = true;
            }
        }
    }
    // If not a known road, plan it.
    if ( !roadIsKnown )
    {
        var road = {};

        // Special case, if start and end are the same, build a road around the object
        // otherwise plan one from start to end
        if (start == end )
        {
            console.log('control.Construction.PlanRoad: Around Position: ' + start.pos );

            road = getSurroundingPositions(start) ;

        }
        else
        {
            console.log('control.Construction.PlanRoad: start: ' + start + ' - position: ' + start.pos );
            console.log('control.Construction.PlanRoad: end: ' + end + ' - position: ' + end.pos );

            road = PathFinder.search(start.pos, { pos: end.pos, range: 1 }) ;
        }
        for ( let n in road.path )
        {
            var buildPosition = road.path[n];
            start.room.memory.roomInfo.futureConstructionSites.push({position: buildPosition, structure: STRUCTURE_ROAD})
        }

        start.room.memory.roomInfo.knownRoads.push({start: start.pos, end: end.pos });
    }

    // Set a return value, so the caller knows if we did anything
    return (!roadIsKnown);
}

function PlanBuilding (roomObject, StructureType)
{
    // Try to build a structure near to the roomObject

    var candidates = getSurroundingPositions(roomObject);
    var found = false;
    var attempts = 0;
    var buildPosition = {};

    // console.log('DEBUG: control.Construction.PlanBuilding - roomObject:' + roomObject);
    // console.log('DEBUG: control.Construction.PlanBuilding - StructureType:' + StructureType);

    while (!found && attempts < 10)
    {
        attempts++; // Just in case we end up looping infinitely.

        // Pick a random position from the candidates
        buildPosition = candidates.path[Math.floor(Math.random(candidates.path.length))];
        // console.log('DEBUG: control.Construction.PlanBuilding - buildPosition:' + buildPosition + ' (attempt: ' + attempts + ')');
        // console.log('DEBUG: control.Construction.PlanBuilding - buildPosition: HAS TERRAIN?' + JSON.stringify(buildPosition.lookFor(LOOK_TERRAIN)));
        // console.log('DEBUG: control.Construction.PlanBuilding - buildPosition: HAS SITES?' + JSON.stringify(buildPosition.lookFor(LOOK_CONSTRUCTION_SITES)));
        // console.log('DEBUG: control.Construction.PlanBuilding - buildPosition: HAS STRUCTURES?' + JSON.stringify(buildPosition.lookFor(LOOK_STRUCTURES)));
        // Check if it is buildable (I really hope this works )
        if (    buildPosition.lookFor(LOOK_TERRAIN) == 'plain'
            &&  buildPosition.lookFor(LOOK_CONSTRUCTION_SITES).length == 0
            &&  buildPosition.lookFor(LOOK_STRUCTURES).length == 0)
        {
            found = true;
            // Add the structure & location to the top of the construction list.
            roomObject.room.memory.roomInfo.futureConstructionSites.unshift({position: buildPosition, structure: StructureType})
        }
    }

    // Return success status to caller
    return found;
}


function getSurroundingPositions (roomObject)
{
    var pos = roomObject.pos;
    var RetVal = new Array;


    RetVal.push(new RoomPosition(pos.x + 1 , pos.y + 1 , pos.roomName));
    RetVal.push(new RoomPosition(pos.x + 1 , pos.y     , pos.roomName));
    RetVal.push(new RoomPosition(pos.x + 1 , pos.y - 1 , pos.roomName));
    RetVal.push(new RoomPosition(pos.x     , pos.y + 1 , pos.roomName));
    RetVal.push(new RoomPosition(pos.x     , pos.y - 1 , pos.roomName));
    RetVal.push(new RoomPosition(pos.x - 1 , pos.y + 1 , pos.roomName));
    RetVal.push(new RoomPosition(pos.x - 1 , pos.y     , pos.roomName));
    RetVal.push(new RoomPosition(pos.x - 1 , pos.y - 1 , pos.roomName));

    return {path: RetVal} ;


}
