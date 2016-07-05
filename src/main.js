/*
	Main.js

	This is the core loop. Gets called each tick.

	Main loop will be used to set up the handlers for each room we control
	(Just the simulator for now)

	Once everything is properly set up, we'll run them.

*/

/** Some values that we might want to change eventually **/
const ticksBetweenReports = 200;

/** Load modules & References **/
var cleanup = require('core.Cleanup');
var RoomController = require('control.Room');

/** Globally scoped Variable Declarations **/
var roomControllers = {};

/** the loop() function is called each tick **/
module.exports.loop = function () {

    // Clean up states & memory
    cleanup.RemoveDeadCreepsFromMemory();

    // Instantiate a RoomController object for each room.
    for (let name in Game.rooms)
    {
        roomControllers[name] = new RoomController(Game.rooms[name]);

       // Run it for now, should really dump them in an array
        roomControllers[name].run();
    }

    // Every 100 ticks or so, dump a report to the console
    if ( Game.time % ticksBetweenReports == 0 )
    {
        var report = Report();
        for ( let n in report ) { console.log(report[n]); }
    }
}

function Report()
{
    // Build a status Report
    var report = new Array;

    //Header.
    report.push('---------- GAME Report ----------');
    report.push('- Game Time : ' + Game.time );
    report.push('- CPU: Limit: ' + Game.cpu.limit + ' | Max CPU/Tick : ' + Game.cpu.tickLimit + ' | Used: ' + Game.cpu.getUsed() + ' | Saved : ' + Game.cpu.bucket);
    // report.push('---------------------------------');

    // Add subReports by room
    for (let name in roomControllers)
    {
        report = report.concat(roomControllers[name].Report());
    }

    //Send the report back up the chain.
    return report;
}