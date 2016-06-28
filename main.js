/*
	Main.js

	This is the core loop. Gets called each tick.

// Spawn your first worker using the console:
//  Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Harvester1' , {role: 'harvester'} );

*/


/** Load modules & References **/
var cleanup = require('core.cleanup');
var RoomController = require('control.Room');

module.exports.loop = function () {

    // Clean up states & memory
    cleanup.RemoveDeadCreepsFromMemory();

    // Instantiate a RoomController object for each room.
    for (var name in Game.rooms)
    {
       var roomController = new RoomController(Game.rooms[name]);
       
       // Run it for now, should really dump them in an array
       roomController.run();
    }

    // Every 100 ticks or so, dump a report to the console
    if ( Game.time % 100 == 0 )
    {
        var report = roomController.Report();
        for ( var n in report ) { console.log(report[n]); }
    }


}
