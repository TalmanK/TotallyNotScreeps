/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.BuildClosestSite');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep, newState, altState)
{
    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    if(target)
    {
        if(creep.build(target) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(target);
        }
    }
    else
    {
        // No valid targets for construction, perform alternate tasks
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
