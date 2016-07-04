/*
 * New creepType library construct
 *
 * Premade body types according to role.
 *
 * Reference: Max energy levels
 * T1: Spawn has max 300 E
 * T2: Spawn (300) +  5x Extensions(50) = 550 E
 * T3: Spawn (300) + 10x Extensions(50) = 800 E
 * ...
 */

var creepTypeInformation = {

    // SCV - Standard Construction Vehicle
    //
    SCV:
    {
        type : 'SCV',
		roles: ['harvester', 'builder', 'upgrader'],
        initialmemory: {state: 'idle', role: 'none'},
        bodies: {
        	'T1': [WORK, CARRY, MOVE], // 200 E
        	'T2': [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], //500 E
        	'T3': [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //800 E
       	   	}
    },

    // ORE - Official Resource Extracter
    ORE:
    {
		type : 'ORE',
		roles: ['miner'],
        initialmemory: {state: 'idle', role: 'none'},
        bodies: {
        	'T1': [WORK, WORK, MOVE],   // 250 E
        	'T2': [WORK, WORK, WORK, WORK, MOVE], // 450E
        	'T3': [WORK, WORK, WORK, WORK, WORK, WORK, MOVE], //650 E
       	   	}

    },

    // FTL - Fast Transport Loader
    FTL:
    {
		type : 'FTL',
		roles: ['hauler'],
        initialmemory: {state: 'idle', role: 'none'},
        bodies: {
        	'T1': [MOVE, CARRY, MOVE, CARRY], // 200 E (100 carry)
        	'T2': [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], //500 E (250 carry)
        	'T3': [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], // 800 E (400 carry)
       	   	}
    },

   //AXE - test archer
    AXE:
    {
		type : 'AXE',
		roles: ['archer'],
        initialmemory: {state: 'idle', role: 'none'},
        bodies: {
        	'T1': [TOUGH, RANGED_ATTACK, MOVE, MOVE],  // 260 E, 10 DPS, 400 HP, Move 1/1
        	'T2': [TOUGH, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], // 460 E , 20 DPS, 600HP, Move 1/1
        	'T3': [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE], //780 E, 30 DPS, 1200 HP, Move 1/1
       	   	}
    },

};

module.exports = creepTypeInformation;