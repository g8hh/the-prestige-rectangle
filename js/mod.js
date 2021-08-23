let modInfo = {
	name: "The Prestige Rectangle",
	id: "mhauirsbfvshncfhuscndfhdfgvfndu",
	author: "gapples2",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js", "ghostLayers.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name: "The Rectangle",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1 ~ The Rectangle</h3><br>
		- Created L1-4 and M<br>
    - Lots of gameplay<br>
    Endgame: 7 MP
    `

let winText = `Congratulations! You have reached the end of this grindy game that probably won't be updated again.`

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
  
  //middle
  if(hasMilestone('m',0))gain=gain.times(2)
  if(hasMilestone('m',3))gain=gain.times(10)
  
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.m.points.gte(7)
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