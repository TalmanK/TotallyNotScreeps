/*
 * Room Controller object
 *
 * Main entry point to all activities within a single Game.room
 *
 * Shouldn't actually *DO* anything gamewise,
 * but delegate to other controller objects, who will delegate, and so on.
 *
 */

/** Load modules & References **/
    var PopulationController = require('control.Population');
    var ConstructionController = require('control.Construction');


function roomHandler (room)
{
    this.room = room;
    this.roomInfo = this.getRoomInfo(room);
    this.constructionController = new ConstructionController(room);
    this.populationController = new PopulationController(room);
}

roomHandler.prototype.run = function()
{
    // Run all the independent controllers for this room.
    // in the right order... pLanning first, then movement & actions.

    this.constructionController.run();

    this.populationController.run();

}

roomHandler.prototype.getRoomInfo = function (room)
{
    if ( !room.memory.roomInfo )
    {
        // Probably a new room. Perform initial discovery.

        console.log('control.Room: Room [' + room.name + '] is new to me. Performing Discovery.')
        var roomInfo = new Object;


        // ----------------------------------------
        // Spawns
        // ----------------------------------------
        console.log('control.Room: Room [' + room.name + ']: Looking for spawn location.')
        var spawns = this.room.find(FIND_MY_SPAWNS);
        roomInfo.spawns = new Array;

        for (var n in spawns)
        {
            var spawn = spawns[n];
            console.log('control.Room: Room [' + room.name + ']: Found spawn [' + spawn.name + '] at position [' + spawn.pos + '].')
            roomInfo.spawns.push({name: spawn.name, id: spawn.id, pos: spawn.pos })
        }

        // ----------------------------------------
        // Controllers
        // ----------------------------------------
        console.log('control.Room: Room [' + room.name + ']: Looking for controller location.')
        var controller =  this.room.controller;
        console.log('control.Room: Room [' + room.name + ']: Found controller [' + room.name + '] at position [' + controller.pos + '].')
        roomInfo.controller = {name: room.name, id: controller.id, pos: controller.pos }

        // ----------------------------------------
        // Energy Sources
        // ----------------------------------------
        console.log('control.Room: Room [' + room.name + ']: Looking for resource location.')
        var sources =  this.room.find(FIND_SOURCES);
        roomInfo.sources = new Array;

        for (var n in sources)
        {
            var source = sources[n];
            console.log('control.Room: Room [' + room.name + ']: Found Resource [' + source.id + '] at position [' + spawn.pos + '].')
            roomInfo.sources.push({resourceType: source.resourceType, id: source.id, pos: source.pos });

        }

        // ----------------------------------------
        // Finished
        //      Save the info to persistent storage
        // ----------------------------------------
        room.memory.roomInfo = roomInfo;
    }

     return room.memory.roomInfo;
}


roomHandler.prototype.Report = function (room)
{
    // Build a population Report
    var report = new Array;

    //Header -- This should REALLY be in a separate entity. Has nothing to do with room
    report.push('---------- GAME Report ----------');
    report.push('- Game Time : ' + Game.time );
    report.push('- CPU: Limit: ' + Game.cpu.limit + ' | Max CPU/Tick : ' + Game.cpu.tickLimit + ' | Saved CPU : ' + Game.cpu.bucket);
    report.push('---------------------------------');

    //Population Report
    report = report.concat(this.populationController.Report());

    //Construction Report
    report = report.concat(this.constructionController.Report());

    report.push('---------------------------------');
    return report;
}
module.exports = roomHandler;
