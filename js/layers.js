const D = x=>new Decimal(x)

addLayer("l1", {
    name: "layer 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
		  points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "L1 points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if(hasUpgrade('l1',21))mult=mult.times(upgradeEffect("l1",21))
        if(hasUpgrade('l3',21))mult=mult.times(upgradeEffect("l3",21))
        if(hasMilestone('m',4))mult=mult.times(D(100).pow(player.m.points))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1: Reset for L1 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return !inChallenge("m",11)},
  doReset(layer){
    if(layer=="l2"||layer=="l3"||layer=="l4"){
      layerDataReset(this.layer,hasUpgrade("l4",12)?["upgrades"]:[])
    }
  },
  branches: ["l2"],
  upgrades:{
    11:{
      title: "Doubler",
      description: "Double point gain per L1 upgrade bought.",
      cost: D(1),
      effect(){
        let eff = D(2).add(hasUpgrade(this.layer,13)?upgradeEffect(this.layer,13):0).pow(player[this.layer].upgrades.length+(hasUpgrade("l2",22)?player.l2.upgrades.length:0))
        if(hasUpgrade("l3",11))eff=eff.pow(upgradeEffect("l3",11))
        eff=eff.pow(tmp.m.challenges[11].effect)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`}
    },
    12:{
      title: "Extra Points",
      description: "Gain more points based on L1 points.",
      cost: D(3),
      effect(){
        let eff = player[this.layer].points.add(1).log(5).add(1).pow(2)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`}
    },
    13:{
      title: "Past Doubler",
      description: "Increase <b>Doubler</b>'s base by L2 upgrades.",
      cost: D(25),
      effect(){
        let eff = D(player.l2.upgrades.length)
        
        return eff
      },
      effectDisplay(){return `+${format(tmp[this.layer].upgrades[this.id].effect)}`},
      unlocked(){return hasUpgrade("l2",12)||hasUpgrade("l3",12)}
    },
    21:{
      title: "L1 Boosting",
      description: "Multiply L1 point gain based on the amount of L1 upgrades you have.",
      cost: D(100),
      effect(){
        let eff = D(player[this.layer].upgrades.length)
        
        return eff
      },
      effectDisplay(){return `+${format(tmp[this.layer].upgrades[this.id].effect)}`},
      unlocked(){return hasUpgrade("l2",12)||hasUpgrade("l3",12)}
    },
    22:{
      title: "What?",
      description: "Unlock 2 L2 upgrades.",
      cost: D(10000),
      unlocked(){return hasUpgrade("l2",12)&&hasUpgrade("l3",12)}
    },
    23:{
      title: "Buy & Reset",
      description: "Unlock 2 L3 upgrades.",
      cost: D(1e8),
      unlocked(){return hasUpgrade("l2",12)&&hasUpgrade("l3",12)}
    },
  },
  passiveGeneration(){return hasMilestone("m",0)&&!inChallenge("m",11)?1:0},
  deactivated(){return inChallenge("m",11)}
})

addLayer("l2", {
    name: "layer 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
		  points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "L2 points", // Name of prestige currency
    baseResource(){return inChallenge("m",11)?"points":"L1 points"}, // Name of resource prestige is based on
    baseAmount() {return inChallenge("m",11)?player.points:player.l1.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasMilestone("m",2)&&hasUpgrade("l2",23))mult=mult.times(upgradeEffect("l2",23))
        if(hasMilestone('m',4))mult=mult.times(D(100).pow(player.m.points))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "2", description: "2: Reset for L2 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(layer){
    if(layer=="l3"||layer=="l4"){
      layerDataReset(this.layer,hasUpgrade("l4",21)?["upgrades"]:[])
    }
  },
  branches: ["l3"],
  upgrades:{
    11:{
      title: "Even More Points",
      description: "Gain more points based on L2 points.",
      cost: D(1),
      effect(){
        let eff = player[this.layer].points.add(1)
        if(!hasUpgrade(this.layer, 13))eff = eff.sqrt().add(1)
        if(inChallenge("m",11)&&hasUpgrade("l3",11))eff=eff.pow(2)
        if(eff.gte(1e5)&&inChallenge("m",11))eff=eff.div(1e5).pow(0.55).mul(1e5)
        if(inChallenge("m",11)&&hasUpgrade(this.layer,22))eff=eff.times(upgradeEffect(this.layer,22))
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`}
    },
    12:{
      title: "Extra Upgrades",
      description(){return `Unlock 2 L${inChallenge("m",11)?2:1} upgrades.`},
      cost: D(2),
    },
    13:{
      title: "So Many Points",
      description: "Make <b>Even More Points</b> better.",
      cost(){return D(inChallenge("m",11)?4:10)},
      unlocked(){return (hasUpgrade("l1",22)||hasUpgrade(this.layer,this.id)||hasUpgrade("l4",22))||(inChallenge("m",11)&&hasUpgrade(this.layer,12))}
    },
    21:{
      title: "Extra L3",
      description: "Double L3 point gain.",
      cost: D(100),
      effect(){
        let eff = D(2)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (hasUpgrade("l1",22)||hasUpgrade(this.layer,this.id)||hasUpgrade("l4",22))||(inChallenge("m",11)&&hasUpgrade(this.layer,12))}
    },
    22:{
      title(){return "Ultimate "+(inChallenge("m",11)?"Points":"Doubler")},
      description(){return `L2 upgrades ${inChallenge("m",11)?"boost <b>Even More Points":"count for <b>Doubler"}</b>.`},
      cost: D(1e8),
      effect(){
        let eff = player.l2.upgrades.length
        
        return eff
      },
      effectDisplay(){let eff = format(tmp[this.layer].upgrades[this.id].effect);return inChallenge("m",11)?`${eff}x`:`+${eff}`},
      unlocked(){return (hasUpgrade("l1",22)&&hasUpgrade("l4",22)||hasUpgrade(this.layer,this.id))||(inChallenge("m",11)&&hasUpgrade("l4",22))}
    },
    23:{
      title: "Now What?",
      description(){return hasMilestone("m",2)?"Boost L2 point gain by L4 points.":"Unlock the next layer..."},
      cost: D(1e15),
      effect(){
        let eff = player.l4.points.add(1)
        
        return eff
      },
      effectDisplay(){return !hasMilestone("m",2)?"new layer!":`${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (hasUpgrade("l1",22)&&hasUpgrade("l4",22)||hasUpgrade(this.layer,this.id))||(inChallenge("m",11)&&hasUpgrade("l4",22))}
    },
  },
  passiveGeneration(){return hasMilestone("m",1)&&!inChallenge("m",11)?1:0}
})

addLayer("l3", {
    name: "layer 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
		  points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "L3 points", // Name of prestige currency
    baseResource: "L2 points", // Name of resource prestige is based on
    baseAmount() {return player.l2.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("l2",21))mult=mult.times(upgradeEffect("l2",21))
        if(hasMilestone('m',4))mult=mult.times(D(100).pow(player.m.points))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "3", description: "3: Reset for L3 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(layer){
    if(layer=="l4"){
      layerDataReset(this.layer,hasUpgrade("l4",22)?["upgrades"]:[])
    }
    if(inChallenge("m",11)){
      player.m.activeChallenge = 11
    }
  },
  branches: ["l4"],
  upgrades:{
    11:{
      title(){return "Ultra "+(inChallenge("m",11)?"Points":"Doubler")},
      description(){return `Square <b>${inChallenge("m",11)?"Even More Points</b>":"Doubler</b>'s"} effect.`},
      cost: D(1),
      effect(){
        let eff = D(2)
        
        return eff
      },
      effectDisplay(){return `^${format(tmp[this.layer].upgrades[this.id].effect)}`}
    },
    12:{
      title: "Extra Upgrades+",
      description: "Unlock 2 L1 upgrades.",
      cost: D(2),
      unlocked(){return !inChallenge("m",11)}
    },
    21:{
      title: "F3 to F1",
      description: "Gain more F1 points based on F3 points.",
      cost: D(25),
      effect(){
        let eff = player[this.layer].points.add(1).sqrt().add(1)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return hasUpgrade("l1",23)||hasUpgrade(this.layer,this.id)}
    },
    22:{
      title: "Other Layer Boosting",
      description: "Gain more F1 points based on F2 points.",
      cost: D(2500),
      effect(){
        let eff = player.l2.points.add(1)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return hasUpgrade("l1",23)||hasUpgrade(this.layer,this.id)}
    },
  },
  passiveGeneration(){return hasMilestone("m",4)&&!inChallenge("m",11)?1:0}
})

addLayer("l4", {
    name: "layer 4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L4", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: false,
		  points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "L4 points", // Name of prestige currency
    baseResource: "L3 points", // Name of resource prestige is based on
    baseAmount() {return player.l3.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasMilestone('m',4))mult=mult.times(D(100).pow(player.m.points))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "4", description: "4: Reset for L4 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(layer){
    if(layer=="l4"){
      layerDataReset("l2",hasUpgrade(this.layer,21)?["upgrades"]:[])
      layerDataReset("l3",hasUpgrade(this.layer,22)?["upgrades"]:[])
    }
  },
  branches(){return inChallenge("m",11)?["l2"]:["l1"]},
  upgrades:{
    11:{
      title: "Point Boosters",
      description: "Boost point gain based on point amount.",
      cost: D(1),
      effect(){
        let eff = player.points.add(1).root(3)
        if(hasMilestone("m",3))eff=eff.pow(1.2)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`}
    },
    12:{
      title: "Keeper I",
      description: "Keep L1 upgrades on reset.",
      cost: D(5),
      unlocked(){return !inChallenge("m",11)}
    },
    21:{
      title: "Keeper II",
      description: "Keep L2 upgrades on reset.",
      cost: D(15),
    },
    22:{
      title: "Keeper III",
      description: "Keep L3 upgrades on reset and unlock 2 L2 upgrades.",
      cost: D(25),
    },
  }
})
addLayer("m", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ffff00",                       // The color for this layer, which affects many elements.
    resource: "middle points",            // The name of this layer's main prestige resource.
    row: 3,                                 // The row this layer is on (0 is the first row).
  displayRow: 1,

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e54),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 4,
  base: 5,
  // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade("l2",23)||player[this.layer].unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

  milestones: {
    0: {
        requirementDescription: "1 MP",
        effectDescription: "Passively gain L1 points and double point gain.",
        done() { return player[this.layer].points.gte(1) }
    },
    1: {
        requirementDescription: "2 MP",
        effectDescription: "Passively gain L2 points and keep 1 L4 upgrade per milestone.",
        done() { return player[this.layer].points.gte(2) }
    },
    2:{
      requirementDescription: "3 MP",
      effectDescription: "Unlock challenges and change the effect of <b>Now What?</b>.",
      done() { return player[this.layer].points.gte(3) }
    },
    3:{
      requirementDescription: "4 MP",
      effectDescription: "Gain 10x more points and raise <b>Point Boosters</b> to 1.2.",
      done() { return player[this.layer].points.gte(4) }
    },
    4:{
      requirementDescription: "6 MP",
      effectDescription: "Gain 100x more of all layer points per MP and passively gain L3 points.",
      done() { return player[this.layer].points.gte(6) }
    },
  },
  doReset(layer){
    if(layer=="m"){
      ([1,2,3,4]).forEach(x=>layerDataReset("l"+x))
      if(hasMilestone(this.layer,1)){
        let amt = player[this.layer].milestones.length
        let keep = []
        let upgs = [11,12,21,22]
        for(let x=0;x<Math.min(amt,upgs.length);x++){
          keep.push(upgs[x])
        }
        player.l4.upgrades=keep
      }
    }
  },
  challenges: {
    11: {
        name: "The Prestige Triangle",
        challengeDescription(){return `L1 is deactivated and passive generation is removed but L2 requires points and some upgrades are changed.<br>Completions: ${challengeCompletions(this.layer,this.id)}/10`},
        goalAmt(){return D(1e5).pow(challengeCompletions(this.layer,this.id)).times(1e15)},
        canComplete: function() {return player.l2.points.gte(tmp[this.layer].challenges[11].goalAmt)},
      completionLimit: 10,
      goalDescription(){return `${format(tmp[this.layer].challenges[11].goalAmt)} L2 points`},
      rewardDescription(){return `^${format(tmp[this.layer].challenges[11].effect,1)} <b>Doubler</b> effect`},
      effect(){return challengeCompletions(this.layer,this.id)/2+1},
      unlocked(){return hasMilestone("m",2)}
    },
}
})