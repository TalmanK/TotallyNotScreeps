/*
 * Hauler Role.
 *
 *  To be used alongside a 'miner' creep.
 *
 * Logic:
 * 1) Associate with a 'preferred' miner
 * 2) if no free resources, go to 'our' miner and pickup resources there.
 * 3) when full,
 *      3.a) return resources to base
 *      3.b) if bases full, find a builder and top up his energy supply.
 *      3.c) if bases full and nowhere to dump our resouces, wait near the spawner.
 */

var roleHauler =
{
    /**
     * Determine the state to apply to the creep and execute it
     * @param {Creep} creep
     */
    run: function(creep)
    {
        var states = require('core.States');

        var nextState = '';
        var altState = '';

        // Determine Current & Next States

        switch (creep.memory.state)
        {

            case 'MoveToTarget':
                nextState = 'PickUpResources';
                altState = 'FindMiner';
                break;

            case 'PickUpResources':
                nextState = 'DepositEnergy';
                altState = 'PickUpResources';
                 break;

            case 'DepositEnergy':
                nextState = 'MoveToTarget';
                altState = 'RefuelBuilder';
                break;

            case 'RefuelBuilder':
                nextState = 'MoveToTarget';
                altState = 'MoveToClosestSpawner';
                break;

            case 'MoveToClosestSpawner':
                nextState = 'DepositEnergy';
                altState = 'RefuelBuilder';
                break;

            case 'FindMiner':
                creep.memory.target = this.findMiner(creep);
                creep.memory.state = 'MoveToTarget';
                
            default:
                // No state actions to run.
                // Just find a new best friend, and move closer
                creep.memory.target = this.findMiner(creep);
                creep.memory.state = 'MoveToTarget';

       }

        // Run The state
        states[creep.memory.state].run(creep, nextState, altState)

    },

    findMiner: function(creep)
    {
        var targets = creep.room.find(FIND_MY_CREEPS, { filter: object => object.memory.role == 'miner' });

        if(targets.length > 0)
        {
            return targets[Math.floor(Math.random() * targets.length)].id;
        }

    }
};

module.exports = roleHauler;
