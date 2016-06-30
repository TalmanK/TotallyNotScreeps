/*
 * Harvester Role.
 *
 *  Only used early game. 
 *  Dedicated Miner/Hauler teams are more effective.
 * 
 * Logic:
 * 1) try and pick up free resources (default state?)
 * 2) if no free resources, go harvest until full
 * 3) when full, 
 *      3.a) return resources to base
 *      3.b) if bases full, try and help with building
 *      3.c) if bases full and no building sites, dump in the controller
 *
 *
 */

var roleHarvester =
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
            case 'HarvestNearestNode':
                nextState = 'DepositEnergy';
                altState = 'PickUpResources';
                break;

            case 'DepositEnergy':
                nextState = 'PickUpResources';
                altState = 'BuildClosestSite';
                break;

            case 'BuildClosestSite':
                nextState = 'PickUpResources';
                altState = 'UpgradeController';
                break;

            case 'UpgradeController':
                nextState = 'PickUpResources';
                altState = 'PickUpResources';
                break;

            case 'PickUpResources':
            default:
                // No known state,or default state, force default values
                creep.memory.state = 'PickUpResources'
                nextState = 'DepositEnergy';
                altState = 'HarvestNearestNode';

       }

       // Run The state
       states[creep.memory.state].run(creep, nextState, altState)
    }
};
module.exports = roleHarvester;
