/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('core.Cleanup');
 * mod.thing == 'a thing'; // true
 */

module.exports =
{
    RemoveDeadCreepsFromMemory: function ()
    {
        for (var name in Memory.creeps)
        {
          if (!Game.creeps[name])
          {
              console.log('Cleanup: Removing stale data for creep: ' + name);
              delete Memory.creeps[name];
          }
        }
    }
};
