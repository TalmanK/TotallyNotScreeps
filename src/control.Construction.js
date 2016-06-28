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
}

Construction.prototype.PlanNextConstruction = function ()
{
    // Build stuff based on room controller's upgrade level.
    console.log('Construction.Run: Planning next construction project.');


    var spawn  = this.room.find(FIND_MY_SPAWNS)[0];
    var sources = this.room.find(FIND_SOURCES);
    var controller = this.room.controller;
    var controllerLevel = this.room.controller.level;



    // Level 1 or higher
    //      - Roads to Nearest source
    //      - Roads to controller
    if ( controllerLevel >= 1 )
    {
        // Test: build road from spawn to resource node

        var targets = {};

        // Order sources by range
        for (var n in sources)
        {
            var range = spawn.pos.getRangeTo(sources[n]);
            targets[range] = sources[n];
        }

        //
        if (this.PlanRoad(spawn, sources[0])) {}
        // this.PlanRoad(spawn, sources[1]);

        // Test 3 : from spawn to room controller
        // this.PlanRoad(spawn, controller);

        // Test 4 : From resources to controller
        else if (this.PlanRoad(sources[0], controller)){}
        // this.PlanRoad(sources[1], controller);

        // Test 5 : plan road around objects
        else if(this.PlanRoadAround(spawn)) {}
        else if(this.PlanRoadAround(controller)) {}


    }

    // Level 2 or higher
    //      - Up to 5 Extensions (Near a road if possible)
    //      - a road around the spawn
    //      - Ramparts around spawn
    //      - Up to 5 containers (useful ?)
    if (controllerLevel >= 2 )
    {

    }
/*
    // Level 3 or higher
    //      - a tower !!
    if ( controllerLevel >= 3 )
    {

    }


*/

}

Construction.prototype.PlanRoad = function(start, end)
{
    //Check if road is already known
    var roadIsKnown = false;
    var knownRoads =  this.room.memory.roomInfo.knownRoads;

    if ( this.room.memory.roomInfo.knownRoads.length > 0)
    {
        for ( var n in this.room.memory.roomInfo.knownRoads )
        {
            var knownRoad = this.room.memory.roomInfo.knownRoads[n];

            if ( knownRoad.start.x == start.pos.x &&  knownRoad.start.y == start.pos.y &&  knownRoad.end.x == end.pos.x &&  knownRoad.end.y == end.pos.y  )
            {
                roadIsKnown = true;
            }
        }
    }
    // If not a known road, plan it.
    if ( !roadIsKnown )
    {
        console.log('Construction.PlanRoad: start: ' + start + ' - position: ' + start.pos );
        console.log('Construction.PlanRoad: end: ' + end + ' - position: ' + end.pos );

        var road = PathFinder.search(start.pos, { pos: end.pos, range: 1 }) ;

        for ( var n in road.path )
        {
            var buildPosition = road.path[n];
            this.room.memory.roomInfo.futureConstructionSites.push({position: buildPosition, structure: STRUCTURE_ROAD})
        }

        this.room.memory.roomInfo.knownRoads.push({start: start.pos, end: end.pos });
    }

    // Set a return value, so the caller knows if we did anything
    return (!roadIsKnown);
}

Construction.prototype.PlanRoadAround = function(roomObject)
{
    //Check if road is already known
    var roadIsKnown = false;
    if ( this.room.memory.roomInfo.knownRoads.length > 0)
    {
        for ( var n in this.room.memory.roomInfo.knownRoads )
        {
            var knownRoad = this.room.memory.roomInfo.knownRoads[n];

            if ( knownRoad.start.x == roomObject.pos.x &&  knownRoad.start.y == roomObject.pos.y &&  knownRoad.end.x == roomObject.pos.x &&  knownRoad.end.y == roomObject.pos.y  )
            {
                roadIsKnown = true;
            }
        }
    }
    // If not a known road, plan it.
    if ( !roadIsKnown )
    {
        console.log('Construction.PlanRoad: Around position: ' + roomObject.pos );

        var road = getSurroundingPositions(roomObject) ;

        for ( var n in road.path )
        {
            var buildPosition = road.path[n];
            this.room.memory.roomInfo.futureConstructionSites.push({position: buildPosition, structure: STRUCTURE_ROAD})
        }

        this.room.memory.roomInfo.knownRoads.push({start: roomObject.pos, end: roomObject.pos });
    }
}

Construction.prototype.BuildNextConstructionSite = function ()
{
    if (this.room.memory.roomInfo.futureConstructionSites.length > 0)
    {
        var nextConstructionSite = this.room.memory.roomInfo.futureConstructionSites.shift();
        var pos = new RoomPosition(nextConstructionSite.position.x, nextConstructionSite.position.y, nextConstructionSite.position.roomName);
        console.log('control.Construction: Starting work on structure [' + nextConstructionSite.structure + '] at position ' + pos)
        this.room.createConstructionSite(pos, nextConstructionSite.structure);
    }
}

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
}

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
