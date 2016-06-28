/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('lib.creeptypes');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    // SCV - Standard Construction Vehicle
    //
    SCV:
    {
        body: [WORK, CARRY, MOVE],
        cost: 200,
        initialmemory:
        {
            state: 'idle',
            role: 'none',
        }
    },

    // SEV - Standard Excavation Vehicle
    SEV:
    {
        body: [WORK, WORK, MOVE],
        cost: 250,
        initialmemory:
        {
            state: 'idle',
            role: 'none',
        }
    },

    //STV - Standard Transport Vehicle
    STV:
    {
        body: [CARRY, CARRY, MOVE],
        cost: 150,
        initialmemory:
        {
            state: 'idle',
            role: 'none',
        }
    },

   //AXE - test archer
    AXE:
    {
        body: [RANGED_ATTACK, MOVE, MOVE],
        cost: 250,
        initialmemory:
        {
            state: 'idle',
            role: 'none',
        }
    },

};
