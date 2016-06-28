/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader =
{
    /** @param {Creep} creep **/
    run: function(creep)
    {
        var states = require('core.states');

        switch (creep.memory.state)
        {

            case 'PickUpResources':
                states.PickUpResources.run(creep,'UpgradeController', 'PickUpResources');
                break;

            case 'UpgradeController':
                states.UpgradeController.run(creep, 'PickUpResources', 'PickUpResources');
                break;

            default:
                creep.memory.state = 'PickUpResources'


        }
    }
};
module.exports = roleUpgrader;
