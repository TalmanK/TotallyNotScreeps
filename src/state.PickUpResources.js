/*
 * state.PickUpResources
 *
 * go find dropped resources (usually by the miner creep)
 * pick up as much as you can carry (or as much as is available)
 */

module.exports = {
run: function (creep, newState, altState)
{
    //Todo: find another way to locate the resources. Need to prioritize decaying heaps.

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
            // We picked up something.
            // Usualy this means either:
            //      a) we're full
            //      or
            //      b) there's nothing left here.
            // Even if we're not 100% full, Don't be an asshole and hog the spot, go do what you need to do.
            creep.memory.state = newState;
            creep.say(creep.memory.state);
        }
    }
    else
    {
        // No valid targets for pickup, perform alternate tasks
        creep.memory.state = altState;
        creep.say(creep.memory.state);
    }
    if(creep.carry.energy == creep.carryCapacity)
    {
        creep.memory.state = newState;
        creep.say(creep.memory.state);
    }
}
};
