/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.archer');
 * mod.thing == 'a thing'; // true
 */

var roleArcher =
{
    /** @param {Creep} creep **/
    run: function(creep)
    {
        var states = require('core.states');

        var nextState = '';
        var altState = '';

        // Determine Current & Next States

        switch (creep.memory.state)
        {
            case 'RangedAttack':
            default:
                // No known state,or default state, force default values
                creep.memory.state = 'RangedAttack'
                nextState = 'RangedAttack';
                altState = 'RangedAttack';

       }

       // Run The state
       states[creep.memory.state].run(creep, nextState, altState)
    }
};
module.exports = roleArcher;
