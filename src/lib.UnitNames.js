/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('lib.UnitNames');
 * mod.thing == 'a thing'; // true
 */

var UnitNames =
{
    GenerateGibberish: function()
    {
        var parts = ['ba','be','bi','bo','bu','da','de','di','do','du','fa','fe','fi','fo','fu','pa','pe','pi','po','pu'];
        var nbrparts = Math.random() * 3 + 1 ;
        var name = ""
        for (var i=0; i < nbrparts; i++)
        {
            name += parts[Math.floor(Math.random()*parts.length)]
        }
        return name.substring(0,1).toUpperCase() + name.substring(1,name.length)
    },

    Generate: function()
    {
      // Lists of first names and last names shamelessly stolen from the web
      var firstNames = new Array("Allen","Bob","Carlton","David","Ernie","Foster","George","Howard","Ian","Jeffery","Kenneth","Lawrence","Michael","Nathen","Orson","Peter","Quinten","Reginald","Stephen","Thomas","Morris","Victor","Walter","Xavier","Charles","Anthony","Gordon","Percy","Conrad","Quincey","Armand","Jamal","Andrew","Matthew","Mark","Gerald","Alice","Bonnie","Cassie","Donna","Ethel","Grace","Heather","Jan","Katherine","Julie","Marcia","Patricia","Mabel","Jennifer","Dorthey","Mary Ellen","Jacki","Jean","Betty","Diane","Annette","Dawn","Jody","Karen","Mary Jane","Shannon","Stephanie","Kathleen","Emily","Tiffany","Angela","Christine","Debbie","Karla","Sandy","Marilyn","Brenda","Hayley","Linda")
      var lastNames = new Array("Adams","Bowden","Conway","Darden","Edwards","Flynn","Gilliam","Holiday","Ingram","Johnson","Kraemer","Hunter","McDonald","Nichols","Pierce","Sawyer","Saunders","Schmidt","Schroeder","Smith","Douglas","Ward","Watson","Williams","Winters","Yeager","Ford","Forman","Dixon","Clark","Churchill","Brown","Blum","Anderson","Black","Cavenaugh","Hampton","Jenkins","Prichard")

        var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        var lastName = firstNames[Math.floor(Math.random() * lastNames.length)];

        return firstName + ' ' + lastName;
    }

}

module.exports = UnitNames;
