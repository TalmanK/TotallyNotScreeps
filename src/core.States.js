/*
 * Dump all the states into a single object
 *
 * All the states should have a method "run()" 
 * with the following parameters.
 * 
 *  creep - the subject of the activity
 *  newState - The state to set if the activity was completed successfully
 *  altState (optional) - Alternate state, in case the current activity can't be executed
 *              (the state should determine if/why)
 * 
 * This should allow us later to run a creep's state by just running:
 *      ... states[creep.memory.state].run(creep);
 *
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
    RefuelController        : require('state.RefuelController'),
    RangedAttack            : require('state.RangedAttack')

};
