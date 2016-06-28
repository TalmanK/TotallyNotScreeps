/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('core.Roles');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    upgrader: require('role.upgrader'),
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    spawner: require('role.spawner'),
    miner: require('role.miner'),
    archer: require('role.archer'),
    hauler: require('role.hauler')
};
