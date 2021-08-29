let modInfo = {
	name: "The Prestige Rectangle",
	id: "mhauirsbfvshncfhuscndfhdfgvfndu",
	author: "gapples2",
	pointsName: "points",
	modFiles: ["utils/mathstuff.js", "layers/rectangle.js", "tree.js", "layers/ghostLayers.js", "layers/achs.js", "layers/modes.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.3",
	name: "Downgrade II",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1 ~ The Rectangle</h3><br>
		- Created L1-4 and M<br>
    - Lots of gameplay<br>
    Endgame: 7 MP<br><br>
  <h3>v1.1 ~ The Line</h3><br>
    - Created Lines<br>
    - Created The Challenge<br>
    Endgame: All achievements<br><br>
  v1.1.1<br>
    - Fixed a few bugs<br><br>
  <h3>v1.2 ~ Downgrade I</h3><br>
    - Made The Challenge possible<br>
    - Added 1 new achievement<br>
    - Added 6 DP milestones<br>
    Endgame: 6th DP milestone<br><br>
  v1.2.1<br>
    - Removed ability to reset in The Prestige Triangle<br>
    - The Challenge glows when you can complete it<br>
    - Removed warning<br>
    - Added DP hints<br>
    - Added a softcap to Point Boosters+ (it won't do anything right now unless your save inflated)<br><br>
  <h3>v1.3 ~ Downgrade II</h3><br>
    - Added downgrade energy<br>
    - Added grindless mode<br>
    - You can get another L1 upgrade<br>
    - Added 3 L2 upgrades which you can only get 2 of<br>
    - Added extra nerfs to The Challenge<br>
    - Added 11 new achievements (now has 4 rows of 7 achs!)<br>
    Endgame: All achievements
    `

let winText = `Congratulations! You have reached the end of this grindy game!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  
  // l1
  if(hasUpgrade('l1',11))gain=gain.times(upgradeEffect("l1",11))
  if(hasUpgrade('l1',12))gain=gain.times(upgradeEffect("l1",12))
  
  // l2
  if(hasUpgrade('l2',11))gain=gain.times(upgradeEffect("l2",11))
  
  // l4
  if(hasUpgrade('l4',11))gain=gain.times(upgradeEffect("l4",11))
  
  // middle/center
  if(hasMilestone('m',0))gain=gain.times(2)
  if(hasMilestone('m',3))gain=gain.times(10)
  
  // lines
  if(hasUpgrade('l',11))gain=gain.times(upgradeEffect("l",11))
  if(hasUpgrade('l',22))gain=gain.times(upgradeEffect("l",22))
  if(inChallenge("l",11))gain=gain.pow(player.l.pointExp)
  
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  grindless: false
}}

// Display extra things at the top of the page
var displayThings = [
  function(){return false?"<span style='color:red'>WARNING: Content beyond this point is untested.</span>":""}
]

// Determines when the game "ends"
function isEndgame() {
	return player.achs.achievements.length==Object.keys(layers.achs.achievements).length-2
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
