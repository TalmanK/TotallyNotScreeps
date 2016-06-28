/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('core.Roles');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    upgrader: require('role.Upgrader'),
    harvester: require('role.Harvester'),
    builder: require('role.Builder'),
    spawner: require('role.Spawner'),
    miner: require('role.Miner'),
    archer: require('role.Archer'),
    hauler: require('role.Hauler')
};
