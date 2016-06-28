/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.RangedAttack');
 * mod.thing == 'a thing'; // true
 */


/*

*/
module.exports = {
run: function (creep, newState, altState)
{
    var targetsInRange = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    var closestTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);


    if(targetsInRange.length > 0)
    {
        creep.say('pew!');
        creep.rangedAttack(targetsInRange[0]);
    }
    else if (closestTarget)
    {
        creep.say('Aha!')
        creep.moveTo(closestTarget);
    }
    else
    {
        //No targets for attack
        creep.memory.state = newState
    }
    
}
};
