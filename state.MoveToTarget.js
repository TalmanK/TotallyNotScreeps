/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.MoveToTarget');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep, newState, altState)
{
    var target = Game.getObjectById(creep.memory.target);

    //console.log('MoveToTarget: target: ' + JSON.stringify(target) );
    if (target)
    {
        if (creep.pos.isNearTo(target))
        {
            //Target Reached
            //console.log(creep.name +': target reached.');
            creep.memory.state = newState;
            creep.say(creep.memory.state);
        }
        else
        {
            //console.log(creep.name +': moving closer to target.');
            creep.moveTo(target);
        }
    }
    else
    {
        //Target does not exist
        console.log(creep.name + ': Current target invalid.');
        creep.memory.state = altState;
        creep.say(creep.memory.state);
    }
}

};
