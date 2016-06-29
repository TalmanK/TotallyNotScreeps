/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('control.Population');
 * mod.thing == 'a thing'; // true
 */

function Population (room)
{
    this.room = room;
    this.creeps = this.room.find(FIND_MY_CREEPS);
    this.spawns = this.room.find(FIND_MY_SPAWNS);
    this.sources = this.room.find(FIND_SOURCES);
    this.population = this.creeps.length ;
    this.creepDistribution = this.getCreepDistribution();
}


Population.prototype.run = function ()
{
    // Perform all population related tasks here

    // Run the creeps
    var roles = require('core.Roles');
    for(var name in this.creeps) { roles[this.creeps[name].memory.role].run(this.creeps[name]); }

    // Try to spawn the next creep in the line.
    var nextSpawn = this.getNextSpawn();
    if (nextSpawn)
    {
        this.SpawnNewCreep(nextSpawn);
    }
}


Population.prototype.getCreepDistribution = function ()
{
    var creepDistribution = {};

    creepDistribution['total'] = 0;
    creepDistribution['roles'] = {};
    creepDistribution['types'] = {};


    for(var name in this.creeps)
    {
        var creepRole = this.creeps[name].memory.role;
        var creepType = this.creeps[name].name.substring(1,4);

        //Make sure the entries exist:
        if (!creepDistribution.roles[creepRole]) { creepDistribution.roles[creepRole] = 0 }
        if (!creepDistribution.types[creepType]) { creepDistribution.types[creepType] = 0 }

        //Increment the relevant counters
        creepDistribution.roles[creepRole] += 1 ;
        creepDistribution.types[creepType] += 1;
        creepDistribution['total'] += 1;
    }

    return creepDistribution;

}


Population.prototype.SpawnNewCreep = function (spawnType)
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
}

Population.prototype.getNextSpawn =  function ()
{
    //What should we spawn next.
    var nextSpawns = [] ;
    var spawnPriority = 0

    // ----------------------------
    spawnPriority = 1  // (lower is better)
    // ----------------------------

    // if we have no creeps. Spawn in a harvester
    if (this.creepDistribution.total == 0)
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has no creeps. Spawn a harvester to get us started.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SCV', creepRole: 'harvester'} );
    }

    // if we have no miners, spawn one
    if ( !this.creepDistribution.roles.miner )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has no miner creeps. This will not stand!');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SEV', creepRole: 'miner'} );
    }

    // ----------------------------
    spawnPriority = 2  // (lower is better)
    // ----------------------------


    // ----------------------------
    spawnPriority = 3  // (lower is better)
    // ----------------------------

    // Try to have equal haulers & miners
    if ( !this.creepDistribution.roles.hauler || ( this.creepDistribution.roles.hauler < this.creepDistribution.roles.miner ) )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has less haulers than miners.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'STV', creepRole: 'hauler'} );
    }
    // Try to have equal builders & miners (or even 1 more)
    if ( !this.creepDistribution.roles.builder || (this.creepDistribution.roles.builder <= this.creepDistribution.roles.miner ) )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has less builders than miners.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SCV', creepRole: 'builder'} );
    }

    // ----------------------------
    spawnPriority = 4  // (lower is better)
    // ----------------------------

    // if we have no upgraders, spawn one
    if ( !this.creepDistribution.roles.upgrader )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has no dedicated upgrader creeps.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SCV', creepRole: 'upgrader'} );
    }
    // Try to get a miner on each resource
    if ( this.creepDistribution.roles.miner < (this.sources.length) )
    {
        // console.log('contol.Population: Priority ' + spawnPriority + ': Room [' + this.room.name + '] has less miners than resource nodes.');
        nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'SEV', creepRole: 'miner'} );
    }

    // ----------------------------
    spawnPriority = 9  // (lower is better)
    // ----------------------------
    //Try out a few archers
    // nextSpawns.push ( {spawnPriority: spawnPriority, creepType: 'AXE', creepRole: 'archer'} );


    // Sort by priority, then return
    // var tmp = _(nextSpawns).sortBy('spawnPriority'); // Doesn't really work, tmp[0] returns undefined object
    // console.log('getNextSpawn: ' + JSON.stringify(nextSpawns[0]) );
    // console.log('getNextSpawn: sorted: ' + JSON.stringify(tmp) );
    // console.log('getNextSpawn: sorted (next): ' + JSON.stringify(tmp[0]) );

    return nextSpawns[0];
}

Population.prototype.Report =  function ()
{
    // Build a population Report
    var report = new Array;

    //Header
    report.push('---------- Population Report ----------');

    // Creep Distribution
    report.push('- Total Creeps: ' + this.creepDistribution.total);
    var line = '';
    for (let n in this.creepDistribution.roles)
    {
        line += ' (' + n + '): ' + this.creepDistribution.roles[n];
    }
    report.push('-     Roles: ' + line )

    var n = this.getNextSpawn();
    if (n !== undefined)
    {
        report.push('- Next Creep: ' + n.creepRole);
    }
    else
    {
        report.push('- Next Creep: UnKnown.');
    }


    return report;
}

module.exports = Population ;


/*** Private functions below ***/

