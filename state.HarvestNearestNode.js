/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.HarvestNearestNode');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function (creep, newState, altState)
    {
        if (creep.memory.target)
        {
            var target = Game.getObjectById(creep.memory.target);

            if(creep.harvest(target) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target);
            }
        }
        else
        {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
         if((creep.carry.energy == creep.carryCapacity) && !(creep.memory.role == 'miner')) // Miner can not carry, and shouldn't change roles once mining
        {
            creep.memory.state = newState
            creep.say(creep.memory.state);
        }
    }
};
