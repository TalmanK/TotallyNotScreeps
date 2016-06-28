/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.hauler');
 * mod.thing == 'a thing'; // true
 */

var roleHauler =
{
    /** @param {Creep} creep **/
    run: function(creep)
    {
        var states = require('core.States');

        switch (creep.memory.state)
        {
            case 'FindMiner':
                creep.memory.target = this.findMiner(creep);
                creep.memory.state = 'MoveToTarget';

            case 'MoveToTarget':
                states.MoveToTarget.run(creep, 'PickUpResources', 'FindMiner');
                break;

            case 'PickUpResources':
                states.PickUpResources.run(creep,'DepositEnergy', 'PickUpResources');
                break;

            case 'DepositEnergy':
                states.DepositEnergy.run(creep,'MoveToTarget','RefuelBuilder');
                break;

            case 'RefuelBuilder':
                states.RefuelBuilder.run(creep,'MoveToTarget','MoveToClosestSpawner');
                break;

            case 'MoveToClosestSpawner':
                states.MoveToClosestSpawner.run(creep,'DepositEnergy','RefuelBuilder');
                break;

            default:
                creep.memory.state = 'FindMiner';
       }

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
