/*
 * Dump all the roles into a single object
 *
 * All the roles should have a method "run()" 
 * with the creep object as parameter.
 * 
 * This should allow us later to run a creep's role by just running:
 *      ... roles[creep.memory.role].run(creep);
 *
 */

module.exports = {
    upgrader: require('role.Upgrader'),
    harvester: require('role.Harvester'),
    builder: require('role.Builder'),
    miner: require('role.Miner'),
    archer: require('role.Archer'),
    hauler: require('role.Hauler')
};
