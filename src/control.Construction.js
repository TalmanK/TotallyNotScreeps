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
    this.activeConstructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
    this.builders = this.room.find(FIND_MY_CREEPS, { filter: object => object.memory.role == 'builder' });


    // Set the Memory Objects
    if (!this.room.memory.roomInfo.futureConstructionSites) { this.room.memory.roomInfo.futureConstructionSites = new Array; }
    if (!this.room.memory.roomInfo.knownRoads) { this.room.memory.roomInfo.knownRoads = new Array; }

}

Construction.prototype.run = function()
{
    // Do construction stuff - but only if we have builders and are not already building
    if ( this.builders.length > 0  && this.activeConstructionSites.length == 0 )
    {
        if (this.room.memory.roomInfo.futureConstructionSites.length > 0 )
        {
            this.BuildNextConstructionSite();
        }
        else
        {
            this.PlanNextConstruction();
        }
    }
};

Construction.prototype.PlanNextConstruction = function ()
{
    // Build stuff based on room controller's upgrade level.
    // Check for higher level stuff first, leave the lowlevel stuff for when we have time later on.
    console.log('Construction.Run: Planning next construction project.');


    var spawn  = this.room.find(FIND_MY_SPAWNS)[0];
    var sources = this.room.find(FIND_SOURCES);
    var controller = this.room.controller;
    var controllerLevel = this.room.controller.level;



    // Level 2 or higher
    //      - Up to 5 Extensions (Near a road if possible)
    //      - a road around the spawn
    //      - Ramparts around spawn
    //      - Up to 5 containers (useful ?)
    if (controllerLevel >= 2 )
    {
		// if (!this.PlanBuilding(STRUCTURE_EXTENSION))
    }


    // Level 1 or higher
    //      - Roads to Nearest source
    //      - Roads to controller
    //		- Roads to the other sources (if there are any)
    if ( controllerLevel >= 1 )
    {

        // PlanRoad returns false if the road has already been built
        // the if(!) construct should therefor only execute the next line if the previous has anready been done


        if (!PlanRoad(spawn, sources[0])) 			// Test1: road from spawn to resource node
		if (!PlanRoad(sources[0], controller))		// Test2: road from resource to controller
		if (!PlanRoad(spawn, spawn))				// Test3: road around the spawn
		if (!PlanRoad(controller, controller))			// Test4: road around the controller
        if (!PlanRoad(spawn, sources[1])) 			// Test5: road from spawn to resource node
        if (!PlanRoad(spawn, sources[2])) 			// Test5: road from spawn to resource node
		{ } // Empty code block or it will not compile
		    // That, or put a ; after the last entry

        // Order sources by range
        // var targets = {};
		// for (var n in sources)
        // {
        //    var range = spawn.pos.getRangeTo(sources[n]);
        //    targets[range] = sources[n];
        // }

    }

};

function PlanRoad  (start, end)
{
    //Check if road is already known
    var roadIsKnown = false;
    var knownRoads =  this.room.memory.roomInfo.knownRoads;

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
            console.log('Construction.PlanRoad: Around position: ' + start.pos );

            road = getSurroundingPositions(start) ;

        }
        else
        {
            console.log('Construction.PlanRoad: start: ' + start + ' - position: ' + start.pos );
            console.log('Construction.PlanRoad: end: ' + end + ' - position: ' + end.pos );

            road = PathFinder.search(start.pos, { pos: end.pos, range: 1 }) ;
        }
        for ( let n in road.path )
        {
            var buildPosition = road.path[n];
            this.room.memory.roomInfo.futureConstructionSites.push({position: buildPosition, structure: STRUCTURE_ROAD})
        }

        this.room.memory.roomInfo.knownRoads.push({start: start.pos, end: end.pos });
    }

    // Set a return value, so the caller knows if we did anything
    return (!roadIsKnown);
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
