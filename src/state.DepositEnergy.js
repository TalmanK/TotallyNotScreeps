/*
 * Deposit Energy State
 *
 * Should try to deposit in structures that are nto at max capacity.
 * In the following order:
 * 1) STRUCTURE_SPAWN       (energy & energyCapacity)
 * 2) STRUCTURE_EXTENSION   (energy & energyCapacity)
 * 3) STRUCTURE_TOWER       (energy & energyCapacity)
 * 4) STRUCTURE_CONTAINER   (store & storeCapacity)
 */

module.exports = {
run: function (creep, newState, altState)
{
    // First, find spawns with remaining capacity.
    var targets = creep.room.find(FIND_STRUCTURES,
    {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
    });

    // If no valid spawns, look for extensions
    if(targets.length == 0)
    {
        targets = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                }
            });
    }

    // If no valid extensions, look for towers
    if(targets.length == 0)
    {
        targets = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
    }

    // If no valid towers, look for containers (beware the different store)
    if(targets.length == 0)
    {
        targets = creep.room.find(FIND_STRUCTURES,
            {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity);
                }
            });
    }

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
        creep.memory.state = altState;
        creep.say(creep.memory.state);
    }
    if(creep.carry.energy == 0)
    {
        //No more energy, switch to next state
        creep.memory.state = newState;
        creep.say(creep.memory.state);
    }
}


};
