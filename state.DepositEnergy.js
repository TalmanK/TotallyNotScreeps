/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.DepositEnergy');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep, newState, altState)
{
    var targets = creep.room.find(FIND_STRUCTURES,
    {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
    });

    if(targets.length > 0)
    {

        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(targets[0]);
        }
    }
    else
    {
        // No valid targets for deposits, perform alternate tasks
        creep.memory.state = altState
        creep.say(creep.memory.state);
    }
    if(creep.carry.energy == 0)
    {
        //No more energy, switch to next state
        creep.memory.state = newState
        creep.say(creep.memory.state);
    }
}


};
