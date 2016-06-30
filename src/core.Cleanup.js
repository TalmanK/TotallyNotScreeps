/*
 * All Cleanup functions for the game in one place.
 * 
 * Tutorial shows us we need to manage stale memory objects
 * Just in case there's more as we learn, group cleanup code in this module.
 * 
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
