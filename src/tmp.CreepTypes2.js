/*
 * New creepType library construct
 *
 * Premade body types according to role.
 *
 */

module.exports = {

    // SCV - Standard Construction Vehicle
    //
    SCV:
    {
        roles: ['harvester', 'builder', 'upgrader'],
        initialmemory: {state: 'idle', role: 'none',}
        bodies: {
        	1: [WORK, CARRY, MOVE],
        	2: [WORK, CARRY, MOVE, MOVE],
        	3: [WORK, CARRY, CARRY, MOVE, MOVE],
        	4: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
       	   	}
    },

    // ORE - Official Resource Extracter
    ORE:
    {
        roles: ['miner'],
        initialmemory: {state: 'idle', role: 'none',}
        bodies: {
        	1: [WORK, WORK, MOVE],
        	2: [WORK, WORK, MOVE, WORK, MOVE],
        	3: [WORK, WORK, MOVE, WORK, MOVE, WORK, MOVE],
        	4: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
       	   	}

    },

    // FTL - Fast Transport Loader
    FTL:
    {
        roles: ['hauler'],
        initialmemory: {state: 'idle', role: 'none',}
        bodies: {
        	1: [MOVE, CARRY, CARRY],
        	2: [MOVE, CARRY, MOVE, CARRY],
        	3: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
        	4: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
       	   	}
    },

   //AXE - test archer
    AXE:
    {
        roles: ['archer'],
        initialmemory: {state: 'idle', role: 'none',}
        bodies: {
        	1: [RANGED_ATTACK, MOVE, MOVE],
        	2: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
        	3: [RANGED_ATTACK, RANGED_ATTACK, TOUGH, MOVE, MOVE, MOVE],
        	4: [RANGED_ATTACK, RANGED_ATTACK, TOUGH, MOVE, MOVE, MOVE],
       	   	}
    },

};
