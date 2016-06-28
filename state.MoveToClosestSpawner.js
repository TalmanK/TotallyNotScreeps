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
    var target = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

    if(target)
    {
        creep.moveTo(target);
    }
    else
    {
        // No valid targets for deposits, perform alternate tasks
        creep.memory.state = altState
        creep.say(creep.memory.state);
    }
    if (creep.pos.isNearTo(target))
    {
        //Target Reached
        //console.log(creep.name +': target reached.');
        creep.memory.state = newState;
        creep.say(creep.memory.state);
    }
}


};
