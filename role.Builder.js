/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder =
{
    /** @param {Creep} creep **/
    run: function(creep)
    {
        var states = require('core.States');

        switch (creep.memory.state)
        {
            case 'PickUpResources':
                states.PickUpResources.run(creep,'RepairUrgent', 'PickUpResources');
                break;

// Don't want builders trying to harvest.
// No resources? Tough luck.
//            case 'HarvestNearestNode':
//                states.HarvestNearestNode.run(creep,'RepairUrgent','PickUpResources');
//                break;

            case 'RepairUrgent':
                states.RepairUrgent.run(creep, 'PickUpResources', 'BuildClosestSite');
                break;

            case 'BuildClosestSite':
                states.BuildClosestSite.run(creep,'PickUpResources', 'RepairNonUrgent')
                break;

            case 'RepairNonUrgent':
                states.RepairNonUrgent.run(creep, 'PickUpResources', 'UpgradeController');
                break;

            //Should only be called if we *REALLY* don't have anything to do
            // Also... we should stop doing this as soon as other work is available (To-Do)
            case 'UpgradeController':
                states.UpgradeController.run(creep, 'PickUpResources', 'RepairUrgent');
                break;

            default:
                creep.memory.state = 'PickUpResources';
        }

    }
};
module.exports = roleBuilder;
