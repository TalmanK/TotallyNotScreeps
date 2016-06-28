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
    Generate: function()
    {
        var parts = ['ba','be','bi','bo','bu','da','de','di','do','du','fa','fe','fi','fo','fu','pa','pe','pi','po','pu'];
        var nbrparts = Math.random() * 3 + 1 ;
        var name = ""
        for (var i=0; i < nbrparts; i++)
        {
            name += parts[Math.floor(Math.random()*parts.length)]
        }
        return name.substring(0,1).toUpperCase() + name.substring(1,name.length)
    }
}

module.exports = UnitNames;

/*
SAve this for later, if we decide to redo this:
Lists for names found on the web


var firstName = ["Runny", "Buttercup", "Dinky", "Stinky", "Crusty",
"Greasy","Gidget", "Cheesypoof", "Lumpy", "Wacky", "Tiny", "Flunky",
"Fluffy", "Zippy", "Doofus", "Gobsmacked", "Slimy", "Grimy", "Salamander",
"Oily", "Burrito", "Bumpy", "Loopy", "Snotty", "Irving", "Egbert"];

var middleName =["Waffer", "Lilly","Rugrat","Sand", "Fuzzy","Kitty",
 "Puppy", "Snuggles","Rubber", "Stinky", "Lulu", "Lala", "Sparkle", "Glitter",
 "Silver", "Golden", "Rainbow", "Cloud", "Rain", "Stormy", "Wink", "Sugar",
 "Twinkle", "Star", "Halo", "Angel"];

var lastName1 = ["Snicker", "Buffalo", "Gross", "Bubble", "Sheep",
 "Corset", "Toilet", "Lizard", "Waffle", "Kumquat", "Burger", "Chimp", "Liver",
 "Gorilla", "Rhino", "Emu", "Pizza", "Toad", "Gerbil", "Pickle", "Tofu",
"Chicken", "Potato", "Hamster", "Lemur", "Vermin"];
var lastName2 = ["face", "dip", "nose", "brain", "head", "breath",
"pants", "shorts", "lips", "mouth", "muffin", "butt", "bottom", "elbow",
"honker", "toes", "buns", "spew", "kisser", "fanny", "squirt", "chunks",
"brains", "wit", "juice", "shower"];

var malename = new Array(
"Allen","Bob","Carlton",
"David","Ernie","Foster",
"George","Howard","Ian",
"Jeffery","Kenneth","Lawrence",
"Michael","Nathen","Orson",
"Peter","Quinten","Reginald",
"Stephen","Thomas","Morris",
"Victor","Walter","Xavier",
"Charles","Anthony","Gordon",
"Percy","Conrad","Quincey",
"Armand","Jamal","Andrew",
"Matthew","Mark","Gerald"
)
var femalename = new Array(
"Alice","Bonnie","Cassie",
"Donna","Ethel","Grace",
"Heather","Jan","Katherine",
"Julie","Marcia","Patricia",
"Mabel","Jennifer","Dorthey",
"Mary Ellen","Jacki","Jean",
"Betty","Diane","Annette",
"Dawn","Jody","Karen",
"Mary Jane","Shannon","Stephanie",
"Kathleen","Emily","Tiffany",
"Angela","Christine","Debbie",
"Karla","Sandy","Marilyn",
"Brenda","Hayley","Linda"
)
var lastname = new Array(
"Adams","Bowden","Conway",
"Darden","Edwards","Flynn",
"Gilliam","Holiday","Ingram",
"Johnson","Kraemer","Hunter",
"McDonald","Nichols","Pierce",
"Sawyer","Saunders","Schmidt",
"Schroeder","Smith","Douglas",
"Ward","Watson","Williams",
"Winters","Yeager","Ford",
"Forman","Dixon","Clark",
"Churchill","Brown","Blum",
"Anderson","Black","Cavenaugh",
"Hampton","Jenkins","Prichard"
)



*/
