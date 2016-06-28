/*
 * Harvester Role.
 *
 * 1) try and pick up free resources
 * 2) if no free resources, go harvest untill full
 * 3) when full, return resources to base
 *      if bases full, try and help with buildings
 *      if bases full and no building sites, dump in the controller
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
