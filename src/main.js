/*
	Main.js

	This is the core loop. Gets called each tick.

	Main loop will be used to set up the handlers for each room we control
	(Just the simulator for now)

	Once everything is properly set up, we'll run them.

*/


/** Load modules & References **/
var cleanup = require('core.Cleanup');
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
    if ( Game.time % 200 == 0 )
    {
        var report = roomController.Report();
        for ( var n in report ) { console.log(report[n]); }
    }


}
