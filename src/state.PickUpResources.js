/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.PickUpResources');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep, newState, altState)
{
    var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if(target)
    {
        var result = creep.pickup(target);
        if( result == ERR_NOT_IN_RANGE)
        {
        creep.moveTo(target);
        }
        else if( result == OK)
        {
            // We picked up something, usualy this means we're full or there's nothing left here.
            // Don't be an asshole and hog the spot, go do what you need to do.
            creep.memory.state = newState
            creep.say(creep.memory.state);
        }
    }
    else
    {
        // No valid targets for pickup, perform alternate tasks
        creep.memory.state = altState
        creep.say(creep.memory.state);
    }
    if(creep.carry.energy == creep.carryCapacity)
    {
        creep.memory.state = newState
        creep.say(creep.memory.state);
    }
}
};
