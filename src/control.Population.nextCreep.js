/*
 * Functions for selecting the next creep role to spawn.
 *
 * Needs to know:
 *      - Current Room
 *          - Layout ( --> number of sources)
 *          - Creeps
 *      - Rules for creep type decision.
 *
 * Needs to do:
 *      - Get list of creeps
 *      - apply "logic" (tm) to figure out the next one to spawn
 *      - return the next one.
 */


/**
 * nextCreep - Which Creep Should I spawn Next?
 *
 * @param {Room} room Game.Room object in which to spawn.
 * @returns {string} role The Role of the next Creep to spawn in this room
 */
function nextCreep(room)
{


    var roomInfo = room.memory.roomInfo;
    var sources = roomInfo.sources;
    var spawns = roomInfo.spawns;
    var creeps = room.find(FIND_MY_CREEPS);  // TODO: stop using room.find to get basic creep info. Store it in roomInfo and use that.


    var nbrCreeps = creeps.length;
    var nbrSources = sources.length;

    var nbrMiners = getCreepCountByRole(creeps,'miner');
    var nbrHaulers = getCreepCountByRole(creeps,'hauler');
    var nbrBuilders = getCreepCountByRole(creeps,'builder');
    var nbrUpgraders = getCreepCountByRole(creeps,'upgrader');

    // Creep spawning decisions.

    // Rule 1.  If we have *NO* creeps in this room.
    //          Assume start of game. Spawn a Harvester. This will get us started.
    if (nbrCreeps == 0) return 'harvester';

    // Rule 2. If we have no miners/haulers, make sure we have one of each.
    if ( nbrMiners == 0 ) return 'miner';
    if ( nbrHaulers == 0 ) return 'hauler';

    // Rule 3. If we have more miners than haulers, spawn an additional hauler
    if ( nbrMiners >  nbrHaulers ) return 'hauler';

    // Rule 4. If we have more miners than builders, spawn an additional builder
    if ( nbrMiners >  nbrBuilders ) return 'builder';

    // Rule 5. We should have 1 miner for each resource location
    if ( nbrSources > nbrMiners ) return 'miner';

    // Rule 6. We should have at least 1 upgrader
    if ( nbrUpgraders == 0 ) return 'upgrader';



}

/**
 * getCreepCountByRole - How many creeps of this type do I have?
 *
 * @param {Array} creepList     An List of Game.Creep objects
 * @param {string} role         A role to match
 * @returns {number}            The number of objects matching the role
 */
function getCreepCountByRole(creepList, role)
{
    let count = 0;
    for (let n in creepList)
    {
        if (creepList[n].memory.role == role) count++
    }
    return count;
}


module.exports = null ;
