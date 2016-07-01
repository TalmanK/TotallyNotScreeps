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
        type : 'SCV',
		roles: ['harvester', 'builder', 'upgrader'],
        initialmemory: {state: 'idle', role: 'none'},
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
		type : 'ORE',
		roles: ['miner'],
        initialmemory: {state: 'idle', role: 'none'},
        bodies: {
        	1: [WORK, WORK, MOVE],
        	2: [WORK, WORK, MOVE, WORK, WORK, MOVE],
        	3: [WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE],
       	   	}

    },

    // FTL - Fast Transport Loader
    FTL:
    {
		type : 'FTL',
		roles: ['hauler'],
        initialmemory: {state: 'idle', role: 'none'},
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
		type : 'AXE',
		roles: ['archer'],
        initialmemory: {state: 'idle', role: 'none'},
        bodies: {
        	1: [RANGED_ATTACK, MOVE, MOVE],
        	2: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
        	3: [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE],
        	4: [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE],
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

function getCreepType(creepRole)
{
	var creepTypes = require('tmp.CreepTypes2');

	for (let n in creepTypes)
	{
		if (creepTypes[n].roles.includes(creepRole))
		{
			return creepTypes[n]
		}
	}

}

function getBestBody (creepType, maxCost)
{
	var finalBody = [];
	for (let n in creepType.bodies)
	{
		if (calculateCreepCost(creepType.bodies[n] <= maxCost)) { finalBody = creepType.bodies[n]};
	}
	return finalBody;
}



module.exports = creepTypeInformation;