/*
 * Population Handler
 *
 * Main Responsibilities:
 *  - Run the creeps according to their roles/state
 *  - Spawn new creeps
 *      - keep track of creep type distribution
 *  - Report on population numbers
 *
 *  TODO: Add a job-Manager function (re-assign haulers to miners, miners to sources, etc...)
 *  TODO: Clean this up, it's messy.
 */


/**
 * Population - The Population Handler
 *
 * @param room a Game.Room object referring to the room this handler will work in.
 * @constructor
 */
function Population (room)
{
    this.room = room;
    var roomInfo = room.memory.roomInfo;

    this.spawns = roomInfo.spawns;
    this.sources = roomInfo.sources;

    this.creeps = this.room.find(FIND_MY_CREEPS);
    this.creepTypeDistribution = getCreepTypeDistribution(this.creeps);

    // Save/update the Creep Type Distribution object in the roomInfo persistent memory
    roomInfo.creepTypeDistribution = this.creepTypeDistribution;
}

/**
 * Execute all actions this Object is responsible for:
 *  - Run the creeps according to their role/state
 *  - Spawn new creeps
 */
Population.prototype.run = function ()
{
    // Run the creeps
    var roles = require('core.Roles');
    for(let name in this.creeps) { roles[this.creeps[name].memory.role].run(this.creeps[name]); }

    // Try to spawn the next creep in the line.
    // TODO: replace this with the cleaner code once it's ready
    var nextSpawn = this._getNextSpawn();
    if (nextSpawn)
    {
        this._SpawnNewCreep(nextSpawn); //old code
    }
};


Population.prototype.SpawnNewCreep = function ()
{
  /*
   * Work in Progress
   *
   *    1. Figure Out which creep role we need next
   *    2. Figure Out the properties of the new creep
   *        - based on the role, cost, available energy, etc...
   *    3. Figure out wich spawn can buid the new creep
   *    4. Give the spawn order (with all the necessary properties)
   *
   */

    let newCreepRole = nextCreepRole(this.room);
};



Population.prototype._SpawnNewCreep = function (spawnType)
{
    var unitNames = require('lib.UnitNames');
    var creepClasses = require('lib.CreepTypes');

    // Geth the spawn info from the creep class definitions


    if (creepClasses[spawnType.creepType])
    {
        var bodyparts = creepClasses[spawnType.creepType].body;
        var name = '[' + spawnType.creepType + '] ' + unitNames.Generate() ;
        var initialmemory = creepClasses[spawnType.creepType].initialmemory;
        initialmemory.role = spawnType.creepRole;

        for (var n in this.spawns )
        {

            var spawner = this.spawns[n];
            if(spawner.canCreateCreep(bodyparts, name) == OK)
            {
                spawner.createCreep(bodyparts, name, initialmemory );
                console.log('control.Population:  Spawner [' + spawner.name + '] - Spawning new Creep: ' + name + ' - Role: ' + spawnType.creepRole );
            }
        }

    }
    else
    {
        console.log('role.spawner: SpawnNewCreep: [WARNING] - Unknown Creep Class: ' + spawnType.creepType)
    }
};

Population.prototype._getNextSpawn =  function ()
{
    //What should we spawn next.
    var nextSpawns = [] ;
    var spawnPriority = 0;

    // ----------------------------
    spawnPriority = 1;  // (lower is better)
    // ----------------------------

    // if we have no creeps. Spawn in a harvester
    if (this.creepTypeDistribution.total == 0)
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has no creeps. Spawn a harvester to get us started.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SCV', creepRole: 'harvester'} );
    }

    // if we have no miners, spawn one
    if ( !this.creepTypeDistribution.roles.miner )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has no miner creeps. This will not stand!');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SEV', creepRole: 'miner'} );
    }

    // ----------------------------
    spawnPriority = 2;  // (lower is better)
    // ----------------------------


    // ----------------------------
    spawnPriority = 3; // (lower is better)
    // ----------------------------

    // Try to have equal haulers & miners
    if ( !this.creepTypeDistribution.roles.hauler || ( this.creepTypeDistribution.roles.hauler < this.creepTypeDistribution.roles.miner ) )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has less haulers than miners.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'STV', creepRole: 'hauler'} );
    }
    // Try to have equal builders & miners (or even 1 more)
    if ( !this.creepTypeDistribution.roles.builder || (this.creepTypeDistribution.roles.builder <= this.creepTypeDistribution.roles.miner ) )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has less builders than miners.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SCV', creepRole: 'builder'} );
    }

    // ----------------------------
    spawnPriority = 4;  // (lower is better)
    // ----------------------------

    // if we have no upgraders, spawn one
    if ( !this.creepTypeDistribution.roles.upgrader )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has no dedicated upgrader creeps.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SCV', creepRole: 'upgrader'} );
    }
    // Try to get a miner on each resource
    if ( this.creepTypeDistribution.roles.miner < (this.sources.length) )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has less miners than resource nodes.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SEV', creepRole: 'miner'} );
    }

    // ----------------------------
    spawnPriority = 9;  // (lower is better)
    // ----------------------------
    //Try out a few archers
    // nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'AXE', creepRole: 'archer'} );


    // Sort by priority, then return
    // var tmp = _(nextSpawns).sortBy('spawnPriority'); // Doesn't really work, tmp[0] returns undefined object
    // console.log('getNextSpawn: ' + JSON.stringify(nextSpawns[0]) );
    // console.log('getNextSpawn: sorted: ' + JSON.stringify(tmp) );
    // console.log('getNextSpawn: sorted (next): ' + JSON.stringify(tmp[0]) );

    return nextSpawns[0];
};

/**
 * Report on Population Status for this room.
 * @returns {Array}
 *      A list of strings, each is a line of text for the report.
 */
Population.prototype.Report =  function ()
{
    // Build a population Report
    var report = [];

    //Header
    report.push('---------- Population Report ----------');

    // Creep Distribution
    report.push('- Total Creeps: ' + this.creepTypeDistribution.total);
    var line = '';
    for (let n in this.creepTypeDistribution.roles)
    {
        line += ' (' + n + '): ' + this.creepTypeDistribution.roles[n];
    }
    report.push('-     Roles: ' + line );

    var n = this._getNextSpawn();
    if (n !== undefined)
    {
        report.push('- Next Creep: ' + n.creepRole);
    }
    else
    {
        report.push('- Next Creep: UnKnown.');
    }


    return report;
};

module.exports = Population ;


/* ** *** Private functions below *** ** */

/**
 * getCreepTypeDistribution - How many of each Type do I have?
 * @param {[]} creepList
 *  An Array of Game.Creep objects, like the one returned by Room.find(FIND_MY_CREEPS)
 * @returns {{}} creepTypeDistribution
 *  An object with the following properties:
 *      .total - integer, count of all creeps.
 *      .roles - object, properties of count per role name.
 *      .types - object, properties of count per body type.
 */
function getCreepTypeDistribution(creepList)
{
    var distribution = {};

    distribution['total'] = 0;
    distribution['roles'] = {};
    distribution['types'] = {};



    for(var name in creepList)
    {
        var creepRole = this.creeps[name].memory.role;
        var creepType = this.creeps[name].name.substring(1,4);

        //Make sure the entries exist:
        if (!distribution.roles[creepRole]) { distribution.roles[creepRole] = 0 }
        if (!distribution.types[creepType]) { distribution.types[creepType] = 0 }

        //Increment the relevant counters
        distribution.roles[creepRole] += 1 ;
        distribution.types[creepType] += 1;
        distribution['total'] += 1;
    }

    return distribution;

}


/**
 * nextCreep - Which Creep Should I spawn Next?
 *
 * @param {Room} room Game.Room object in which to spawn.
 * @returns {string} role The Role of the next Creep to spawn in this room
 */
function nextCreepRole(room)
{


    var roomInfo = room.memory.roomInfo;
    var sources = roomInfo.sources;
    var spawns = roomInfo.spawns;
    var creepTypeDistribution = roomInfo.creepTypeDistribution;

    var nbrCreeps = creepTypeDistribution.total;
    var nbrSources = sources.length;

    var nbrMiners = creepTypeDistribution.roles['miner'];
    var nbrHaulers = creepTypeDistribution.roles['hauler'];
    var nbrBuilders = creepTypeDistribution.roles['builder'];
    var nbrUpgraders = creepTypeDistribution.roles['upgrader'];

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


    // Rule 99. If you get here, there's nothing I can do for you.
    // return null;
}

