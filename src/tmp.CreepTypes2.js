/*
 * New creepType library construct
 *
 * Premade body types according to role.
 *
 */

var creepTypeInformation = {

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

creepTypeInformation.getCreepTypeInformation = function (creepRole, maxCost)
{
	var creepType = getCreepType(creepRole);

	creepType.body = getBestBody(creepType, maxCost);

	delete creepType.bodies;
	delete creepType.roles;

	return creepType;
};

function getCreepType (creepRole)
}
	var creepTypes = require('tmp.CreepTypes2');

	for (let n in creepTypes)
	{
		if (creepTypes[n].roles.includes(creepRole))
		{
			return creepTypes[n]
		}
	}

}

fuction getBestBody (creepType, maxCost)
{
	var finalBody = []
	for (let n in creepType.bodies)
	{
		if (calculateCreepCost(creepType.bodies[n] <= maxCost) { finalBody = creepType.bodies[n]};
	}
	return finalBody;
}

function calculateCreepCost(bodyType)
{
	/* - From Documentation:
	 *
 	 *    BODY PARTS:								BODYPART_COST: {
	 *    			  					      			  "move": 50,
	 *    MOVE: "move",								      "work": 100,
	 *    WORK: "work",								      "attack": 80,
	 *    CARRY: "carry",				,			      "carry": 50,
	 *    ATTACK: "attack",							      "heal": 250,
	 *    RANGED_ATTACK: "ranged_attack"			      "ranged_attack": 150,
	 *    TOUGH: "tough",							      "tough": 10,
	 *		HEAL: "heal",															      "claim": 600
	 *    CLAIM: "claim",															      },
	 *
	 */

	var cost = 0;

	for (let n in bodyType)
	{
		cost += BODYPART_COST[bodyType[n]]
	}

	return cost;
};

module.exports = creepTypeInformation;