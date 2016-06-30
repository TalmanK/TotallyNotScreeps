/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var roleMiner =
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
            default:
            case 'FindResource':
                creep.memory.target = this.findSource(creep);
                creep.memory.state = 'MoveToTarget';

            case 'MoveToTarget':
                nextState = 'HarvestNearestNode';
                altState = 'FindResource';
                break;

            case 'HarvestNearestNode':
                nextState = 'HarvestNearestNode';
                altState = 'FindResource';
                break;
        }

        // Run The state
        states[creep.memory.state].run(creep, nextState, altState)

    },

    findSource: function(creep)
    {
        // If we're the only miner in the room, move to the source closest to the Spawn.
        // Otherwise try to take the next cloest one.

        var sources = creep.room.find(FIND_SOURCES);
        var miners = creep.room.find(FIND_MY_CREEPS, { filter: object => object.memory.role == 'miner' })
        //console.log('role.miner.findSource: Found the following miners: ' + JSON.stringify(miners));

        if (miners.length <= 2)
        {
            // console.log('role.miner - findSource - found < 2 miners - selecting closest source');
            return creep.pos.findClosestByPath(sources).id ;

        }
        else
        {
            // This just selects a random source
            // console.log('role.miner - findSource - found > 2 miners - selecting random source');
            var nbr = Math.floor(Math.random() * sources.length);
            return sources[nbr].id;
        }

    }
};
module.exports = roleMiner;
