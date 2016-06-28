/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.RepairNonUrgent');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep, newState, altState)
{
    //Non-Urgent Repair - structures below 90% HP
    var targets = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < ( object.hitsMax * 0.9 ) });

    targets.sort((a,b) => a.hits - b.hits);

    if(targets.length > 0)
    {
        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(targets[0]);
        }
    }
    else
    {
        // No valid targets for repair, perform alternate tasks
        creep.memory.state = altState
        creep.say(creep.memory.state);
    }
    if(creep.carry.energy == 0)
    {
        creep.memory.state = newState
        creep.say(creep.memory.state);
    }
}
};
