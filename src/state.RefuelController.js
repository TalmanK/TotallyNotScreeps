/*
 *
 *
 */

module.exports = {
    run: function (creep, newState, altState)
    {
        var target = creep.room.controller;

        if(target)
        {

            var result = creep.transfer(target, RESOURCE_ENERGY);

            if(result == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target);
            }
            else if(result == OK)
            {
                // We've dumped our energy in the controller, we should be empty.
                // Go do something else.
                creep.memory.state = newState;
                creep.say(creep.memory.state);
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
