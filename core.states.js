/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('core.States');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    BuildClosestSite        : require('state.BuildClosestSite'),
    DepositEnergy           : require('state.DepositEnergy'),
    HarvestNearestNode      : require('state.HarvestNearestNode'),
    MoveToTarget            : require('state.MoveToTarget'),
    PickUpResources         : require('state.PickUpResources'),
    RepairUrgent            : require('state.RepairUrgent'),
    RepairNonUrgent         : require('state.RepairNonUrgent'),
    UpgradeController       : require('state.UpgradeController'),
    MoveToClosestSpawner    : require('state.MoveToClosestSpawner'),
    RefuelBuilder           : require('state.RefuelBuilder'),
    RangedAttack            : require('state.RangedAttack')

};
