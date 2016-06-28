/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.UpgradeController');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep, newState, altState)
{
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
    {
        creep.moveTo(creep.room.controller);
    }
    if(creep.carry.energy == 0)
    {
        creep.memory.state = newState
        creep.say(creep.memory.state);
    }

}
};
