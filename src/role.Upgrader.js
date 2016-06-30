/*
 * Upgrader Role.
 *
 *  Only used early game.
 *  (Later we'll just use the haulers to dump massive amounts of energy into the controller)
 *
 * Logic:
 * 1) Try and pick up free resources (Don't harvest!!)
 * 2) If full, goto and upgrade controller
 *
 */

var roleUpgrader =
{
    /** @param {Creep} creep **/
    run: function(creep)
    {
        var states = require('core.States');

        var nextState = '';
        var altState = '';

        // Determine Current & Next States

        switch (creep.memory.state)
        {
            case 'PickUpResources':
                nextState = 'UpgradeController';
                altState = 'PickUpResources';
                break;

            case 'UpgradeController':
                nextState = 'PickUpResources';
                altState = 'PickUpResources';
                break;

            default:
                creep.memory.state = 'PickUpResources'
        }

        // Run The state
        
        states[creep.memory.state].run(creep, nextState, altState)

    }
};
module.exports = roleUpgrader;
