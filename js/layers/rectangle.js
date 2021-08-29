const D = x=>new Decimal(x)
const keeperUpgs = [["l4",12],["l4",21],["l4",22],["l2",31],["l2",32]]

function isDisabled(layer,id){
  return player.l.disabled[layer].includes(Number(id))&&inChallenge("l",11)
}

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
      if(player.grindless)mult=mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1: Reset for L1 points", onPress(){if (canReset(this.layer)&&!tmp[this.layer].deactivated) doReset(this.layer)}},
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
        if(hasUpgrade(this.layer,31))eff=eff.pow(upgradeEffect(this.layer,31))
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      dp: 5,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    12:{
      title: "Extra Points",
      description: "Gain more points based on L1 points.",
      cost: D(3),
      effect(){
        let eff = player[this.layer].points.add(1).log(5).add(1).pow(2)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      dp: 2,
      unlocked(){return !isDisabled(this.layer, this.id)}
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
      unlocked(){return (tmp[this.layer].upgMax>=3||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 1
    },
    21:{
      title: "L1 Boosting",
      description: "Multiply L1 point gain based on the amount of L1 upgrades you have.",
      cost: D(100),
      effect(){
        let eff = D(player[this.layer].upgrades.length)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (tmp[this.layer].upgMax>=4||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 0.25
    },
    22:{
      title: "What?",
      description: "Unlock 2 L2 upgrades.",
      cost: D(10000),
      unlocked(){return (tmp[this.layer].upgMax>=5||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 2
    },
    23:{
      title: "Buy & Reset",
      description: "Unlock 2 L3 upgrades.",
      cost: D(1e8),
      unlocked(){return (tmp[this.layer].upgMax>=6||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 2
    },
    31:{
      title: "Final Doubler",
      description: "Raise <b>Doubler</b> to a number based on the amount of L1 upgrades you have.",
      cost: D("1e666"),
      effect(){
        let eff = D(player.l1.upgrades.length).sqrt()
        
        return eff
      },
      effectDisplay(){return `^${format(tmp[this.layer].upgrades[this.id].effect)}`},
      unlocked(){return tmp[this.layer].upgMax>=7||hasUpgrade(this.layer,this.id)},
    },
    32:{
      title: "Final L2",
      description: "Unlock 3 L2 upgrades.",
      cost: D("4.20e3069"),
      unlocked(){return tmp[this.layer].upgMax>=8||hasUpgrade(this.layer,this.id)}
    },
    33:{
      title: "Spend yer Lines",
      description: "Unlock 2 line upgrades.",
      cost: D("10^^10"),
      unlocked(){return tmp[this.layer].upgMax>=9||hasUpgrade(this.layer,this.id)}
    },
  },
  passiveGeneration(){return hasMilestone("m",0)&&!inChallenge("m",11)?1:0},
  deactivated(){return inChallenge("m",11)},
  upgMax(){
    let max = 2
    if(hasUpgrade("l2",12))max+=2
    if(hasUpgrade("l3",12))max+=2
    if(hasUpgrade("l",12))max+=3
    return max
  },
  tabFormat:[
    "main-display",
    function(){return hasMilestone("m",0)?"":"prestige-button"},
    "resource-display",
    "upgrades"
  ],
  autoUpgrade(){return hasMilestone("l",10)&&player.l.autoupgl1||player.grindless}
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
      if(player.grindless)mult=mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
  displayRow:4,
    hotkeys: [
        {key: "2", description: "2: Reset for L2 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(layer){
    if(layer=="l3"||layer=="l4"){
      let keepupgs = []
      if(hasUpgrade("l2",31)){
        let upgs = keeperUpgs
        upgs.forEach(upg=>{
          if(hasUpgrade(upg[0],upg[1]))keepupgs.push(upg)
        })
      }
      layerDataReset(this.layer,hasUpgrade("l4",21)?["upgrades"]:[])
      keepupgs.forEach(upg=>{
        if(!hasUpgrade(upg[0],upg[1]))player[upg[0]].upgrades.push(upg[1])
      })
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
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      dp: 1,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    12:{
      title: "Extra Upgrades",
      description(){return `Unlock 2 L${inChallenge("m",11)?2:1} upgrades.`},
      cost: D(2),
      dp: 2,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    13:{
      title: "So Many Points",
      description: "Make <b>Even More Points</b> better.",
      cost(){return D(inChallenge("m",11)?4:10)},
      unlocked(){return (tmp[this.layer].upgMax>=3||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 3
    },
    21:{
      title: "Extra L3",
      description: "Double L3 point gain.",
      cost: D(100),
      effect(){
        let eff = D(2)
        if(hasMilestone("l",7))eff=eff.pow(player.m.points.pow(2).add(1))
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (tmp[this.layer].upgMax>=4||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 0.25
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
      unlocked(){return (tmp[this.layer].upgMax>=5||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 1
    },
    23:{
      title: "Now What?",
      description(){return hasMilestone("m",2)?"Boost L2 point gain by L4 points.":"Unlock the next layer..."},
      cost: D(1e15),
      effect(){
        let eff = player.l4.points.add(1)
        
        return eff
      },
      effectDisplay(){return !hasMilestone("m",2)?(!hasUpgrade(this.layer,this.id)?"nothing":"new layer!"):`${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (tmp[this.layer].upgMax>=6||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 2
    },
    31:{
      title: "Keeper IV",
      description: "Keep all keeper upgrades on layer, corner, and line reset.",
      cost: D("1e2333"),
      unlocked(){return tmp[this.layer].upgMax>=7||hasUpgrade(this.layer,this.id)},
    },
    32:{
      title: "Keeper V",
      description: "Corner resets don't reset anything.",
      cost: D("1e2750"),
      unlocked(){return tmp[this.layer].upgMax>=8||hasUpgrade(this.layer,this.id)},
    },
    33:{
      title: "Spend yer Lines 2",
      description: "Unlock 2 line upgrades.",
      cost: D("10^^10"),
      unlocked(){return tmp[this.layer].upgMax>=9||hasUpgrade(this.layer,this.id)},
    },
  },
  passiveGeneration(){return hasMilestone("m",1)&&!inChallenge("m",11)||hasMilestone("l",6)&&inChallenge("m",11)?1:0},
  tabFormat:[
    "main-display",
    function(){return hasMilestone("m",1)&&!inChallenge("m",11)||hasMilestone("l",6)&&inChallenge("m",11)?"":"prestige-button"},
    "resource-display",
    "upgrades"
  ],
  upgMax(){
    let max = 2
    if(hasUpgrade("l1",22))max+=2
    if(hasUpgrade("l4",22))max+=2
    if(hasUpgrade("l1",32))max+=3
    if(inChallenge("m",11)&&hasUpgrade("l2",12))max+=2
    return max
  },
  autoUpgrade(){return hasMilestone("l",11)&&player.l.autoupgl2||player.grindless}
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
      if(player.grindless)mult=mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
  displayRow:4,
    hotkeys: [
        {key: "3", description: "3: Reset for L3 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(layer){
    if(layer=="l4"){
      let keepupgs = []
      if(hasUpgrade("l2",31)){
        let upgs = keeperUpgs
        upgs.forEach(upg=>{
          if(hasUpgrade(upg[0],upg[1]))keepupgs.push(upg)
        })
      }
      layerDataReset(this.layer,hasUpgrade("l4",22)?["upgrades"]:[])
      keepupgs.forEach(upg=>{
        if(!hasUpgrade(upg[0],upg[1]))player[upg[0]].upgrades.push(upg[1])
      })
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
      effectDisplay(){return `^${format(tmp[this.layer].upgrades[this.id].effect)}`},
      dp: 1,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    12:{
      title: "Extra Upgrades+",
      description: "Unlock 2 L1 upgrades.",
      cost: D(2),
      dp: 2,
      unlocked(){return !isDisabled(this.layer, this.id)&&!inChallenge("m",11)}
    },
    21:{
      title: "L3 to L1",
      description: "Gain more L1 points based on L3 points.",
      cost: D(25),
      effect(){
        let eff = player[this.layer].points.add(1).sqrt().add(1)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (tmp[this.layer].upgMax>=3||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 2
    },
    22:{
      title: "Other Layer Boosting",
      description: "Gain more L1 points based on L2 points.",
      cost: D(2500),
      effect(){
        let eff = player.l2.points.add(1)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      unlocked(){return (tmp[this.layer].upgMax>=4||hasUpgrade(this.layer,this.id))&&!isDisabled(this.layer, this.id)},
      dp: 2
    },
  },
  passiveGeneration(){return hasMilestone("m",4)&&!inChallenge("m",11)?1:0},
  tabFormat:[
    "main-display",
    function(){return hasMilestone("m",4)&&!inChallenge("m",11)?"":"prestige-button"},
    "resource-display",
    "upgrades"
  ],
  upgMax(){
    let max = 2
    if(hasUpgrade("l1",23))max+=2
    return max
  },
  autoUpgrade(){return hasMilestone("l",12)&&player.l.autoupgl3||player.grindless}
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
      if(player.grindless)mult=mult.times(3)
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
      let keepupgs = []
      if(hasUpgrade("l2",31)){
        let upgs = keeperUpgs
        upgs.forEach(upg=>{
          if(hasUpgrade(upg[0],upg[1]))keepupgs.push(upg)
        })
      }
      layerDataReset("l2",hasUpgrade(this.layer,21)?["upgrades"]:[])
      layerDataReset("l3",hasUpgrade(this.layer,22)?["upgrades"]:[])
      keepupgs.forEach(upg=>{
        if(!hasUpgrade(upg[0],upg[1]))player[upg[0]].upgrades.push(upg[1])
      })
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
        if(hasMilestone("l",4)){
          let exp = Math.min(0.2/(38.5-player.l.dp)+1,1.3)
          eff=eff.pow(exp)
        }
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      dp: 4,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    12:{
      title: "Keeper I",
      description: "Keep L1 upgrades on reset.",
      cost: D(5),
      unlocked(){return !inChallenge("m",11)},
      dp: 1,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    21:{
      title: "Keeper II",
      description: "Keep L2 upgrades on reset.",
      cost: D(15),
      dp: 1,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
    22:{
      title: "Keeper III",
      description: "Keep L3 upgrades on reset and unlock 2 L2 upgrades.",
      cost: D(25),
      dp: 3,
      unlocked(){return !isDisabled(this.layer, this.id)}
    },
  },
  upgMax(){
    let max = 4
    
    return max
  },
  tabFormat:[
    "main-display",
    function(){return hasMilestone("l",5)&&!inChallenge("m",11)?"":"prestige-button"},
    "resource-display",
    "upgrades"
  ],
  passiveGeneration(){return hasMilestone("l",5)&&!inChallenge("m",11)},
  autoUpgrade(){return hasMilestone("l",14)&&player.l.autoupgl4||player.grindless}
})
addLayer("m", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
  
    name(){return player.l.unlocked?"corner":"middle"},
  symbol(){return player.l.unlocked?"C":"M"},
    color: "#ffff00",                       // The color for this layer, which affects many elements.
    resource(){return tmp[this.layer].name+" points"},            // The name of this layer's main prestige resource.
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

    gainMult() {
      let mult = D(1)
      if(player.grindless)mult=mult.div(3)
        return mult               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade("l2",23)||player[this.layer].unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

  milestones: {
    0: {
      requirementDescription(){return `1 ${tmp[this.layer].symbol}P`},
      effectDescription: "Passively gain L1 points and double point gain.",
      done() { return player[this.layer].points.gte(1) }
    },
    1: {
      requirementDescription(){return `2 ${tmp[this.layer].symbol}P`},
      effectDescription: "Passively gain L2 points and keep 1 L4 upgrade per milestone.",
      done() { return player[this.layer].points.gte(2) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    2:{
      requirementDescription(){return `3 ${tmp[this.layer].symbol}P`},
      effectDescription: "Unlock challenges and change the effect of <b>Now What?</b>.",
      done() { return player[this.layer].points.gte(3) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    3:{
      requirementDescription(){return `4 ${tmp[this.layer].symbol}P`},
      effectDescription: "Gain 10x more points and raise <b>Point Boosters</b> to 1.2.",
      done() { return player[this.layer].points.gte(4) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    4:{
      requirementDescription(){return `6 ${tmp[this.layer].symbol}P`},
      effectDescription(){return "Gain 100x more of all layer points per "+tmp[this.layer].symbol+"P and passively gain L3 points."},
      done() { return player[this.layer].points.gte(6) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
  },
  doReset(layer){
    if(layer=="m"){
      let keepupgs = []
      if(hasUpgrade("l2",31)){
        let upgs = keeperUpgs
        upgs.forEach(upg=>{
          if(hasUpgrade(upg[0],upg[1]))keepupgs.push(upg)
        })
      }
      ([1,2,3,4]).forEach(x=>layerDataReset("l"+x))
      if(hasMilestone(this.layer,1)){
        let amt = player[this.layer].milestones.length
        let keep = []
        let upgs = [11,12,21,22]
        for(let x=0;x<Math.min(amt,upgs.length);x++){
          if(!isDisabled("l4",upgs[x]))keep.push(upgs[x])
        }
        player.l4.upgrades=keep
      }
      keepupgs.forEach(upg=>{
        if(!hasUpgrade(upg[0],upg[1]))player[upg[0]].upgrades.push(upg[1])
      })
    }
  },
  challenges: {
    11: {
        name: "The Prestige Triangle",
        challengeDescription(){return `L1 is deactivated and passive generation is removed but L2 requires points and some upgrades are changed.<br>Completions: ${challengeCompletions(this.layer,this.id)}/${inChallenge("l",11)?player.l.maxPTcompletions:5}`},
        goalAmt(){return D(1e5).pow(challengeCompletions(this.layer,this.id)).times(1e15)},
        canComplete: function() {return player.l2.points.gte(tmp[this.layer].challenges[11].goalAmt)},
      completionLimit(){return inChallenge("l",11)?player.l.maxPTcompletions:5},
      goalDescription(){return `${format(tmp[this.layer].challenges[11].goalAmt)} L2 points`},
      rewardDescription(){return `^${format(tmp[this.layer].challenges[11].effect,1)} <b>Doubler</b> effect`},
      effect(){return challengeCompletions(this.layer,this.id)+1},
      unlocked(){return hasMilestone("m",2)&&!(inChallenge("l",11)&&player.l.maxPTcompletions==0)},
      onExit(){
        if(hasMilestone("l",0)){
          let max = player.l2.points.div(1e15).log(1e5).min((inChallenge("l",11)?player.l.maxPTcompletions:5)-player[this.layer].challenges[11]).max(0).floor().toNumber()
          if(!isNaN(max))player[this.layer].challenges[11]+=max
        }
        let keepupgs = []
        if(hasUpgrade("l2",31)){
          let upgs = keeperUpgs
          upgs.forEach(upg=>{
            if(hasUpgrade(upg[0],upg[1]))keepupgs.push(upg)
          })
        }
        ([1,2,3,4]).forEach(x=>layerDataReset("l"+x))
        keepupgs.forEach(upg=>{
          if(!hasUpgrade(upg[0],upg[1]))player[upg[0]].upgrades.push(upg[1])
        })
        player.points=D(0)
      },
      onEnter(){
        player.l1.upgrades=[]
        player.points=D(0)
        layers.m.doReset("m")
      }
    },
},
  canBuyMax(){return hasMilestone("l",2)},
  resetsNothing(){return hasUpgrade("l2",32)},
  tabFormat:{
    "Main":{
      content:[
        "main-display",
        function(){return inChallenge("m",11)?"":"prestige-button"},
        "resource-display",
        "milestones"
      ]
    },
    "Challenges":{
      content:[
        "main-display",
        function(){return inChallenge("m",11)?"":"prestige-button"},
        "resource-display",
        "challenges"
      ],
      unlocked(){return hasMilestone("m",2)}
    },
  },
  milestonePopups(){return player.l.total.lt(2)}
})

function gridToNum(id){
  return Number(id.toString().replace("0",""))
}

addLayer("l", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
      challLayer: "l1",
      disabled:{
        l1:[],
        l2:[],
        l3:[],
        l4:[]
      },
      dp: 0,
      dpGain: 0,
      de: D(0),
      challGoal: "1.79e308",
      maxPTcompletions: 5,
      pointExp: 1,
      autoupgl1: false,
      autoupgl2: false,
      autoupgl3: false,
      autoupgl4: false
    }},

    color: "#ffbb00",                       // The color for this layer, which affects many elements.
    resource: "lines",            // The name of this layer's main prestige resource.
    row: 4,
    displayRow:3,

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal("1e1000"),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.0001,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
      let mult = D(1)
      if(player.grindless)mult=mult.times(3)
        return mult              // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.m.points.gte(7)||player[this.layer].unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    branches:["m"],
    doReset(layer){
      if(layer=="l"){
        let keepupgs = []
        if(hasUpgrade("l2",31)){
          let upgs = keeperUpgs
          upgs.forEach(upg=>{
            if(hasUpgrade(upg[0],upg[1]))keepupgs.push(upg)
          })
        }
        (["l1","l2","l3","l4","m"]).forEach(x=>layerDataReset(x))
        if(hasMilestone(this.layer,1))player.m.points=D(Math.min(Math.floor(player[this.layer].milestones.length/2),hasMilestone("l",8)?7:2))
        layers.m.doReset("m")
        keepupgs.forEach(upg=>{
          if(!hasUpgrade(upg[0],upg[1]))player[upg[0]].upgrades.push(upg[1])
        })
      }
    },
  
  upgrades:{
    11:{
      title: "Point Boosters+",
      description(){return "Boost point gain based on total lines and "+tmp["m"].symbol+"P."},
      cost: D(1),
      effect(){
        let eff = player.m.points.add(2).pow(player.l.total.add(1).sqrt()).times(100)
        if(eff.gte(1e100))eff=eff.div(1e100).pow(0.5).times(1e100)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`}
    },
    12:{
      title: "Final L1",
      description: "Unlock 3 L1 upgrades.",
      cost: D(2),
      unlocked(){return !inChallenge("m",11)}
    },
    21:{
      title: "DE Boost",
      description: "Gain more DE based on DP.",
      cost: D(250),
      effect(){
        let exp = 0.75
        if(hasUpgrade(this.layer,31))exp+=Math.log10(player.l.de*2)/100+0.05
        let eff = player.l.dp**exp+1
        if(hasUpgrade("l",42))eff=D(eff).pow(upgradeEffect("l",42)).toNumber()
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    22:{
      title: "DE to Points",
      description: "Gain more points based on DE.",
      cost: D(25000),
      effect(){
        let eff = player.l.de.add(1)
        if(hasUpgrade("l",41))eff=eff.pow(upgradeEffect("l",41))
        if(hasUpgrade("l",42))eff=eff.pow(upgradeEffect("l",42))
        if(eff.gte(1e50))eff=eff.div(1e50).pow(0.5).times(1e50)
        if(eff.gte(1e175))eff=eff.div(1e175).pow(0.3).times(1e175)
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    23:{
      title: "Speed Up",
      description: "Gain DE 5x faster.",
      cost: D(1e5),
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    31:{
      title: "Improve",
      description: "<b>DE Boost</b> is better based on DE.",
      cost: D(1e6),
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    32:{
      title: "Dividers",
      description(){return "Divide <b>"+tmp[this.layer].buyables[11].title+"</b>'s cost by the amount you have."},
      cost: D(4e6),
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    33:{
      title: "Doubler Update",
      description(){return "Increase <b>"+tmp[this.layer].buyables[11].title+"</b>'s base by 0.005 for each one you buy."},
      cost: D(1e9),
      effect(){
        let eff = player.l.buyables[11].times(0.005).min(0.25)
        
        return eff
      },
      effectDisplay(){return `+${format(tmp[this.layer].upgrades[this.id].effect,3)}`},
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    41:{
      title: "More DE to Points",
      description(){return "<b>DE to Points</b> is better based on DP and double DE gain."},
      cost: D(2.75e10),
      effect(){
        let eff = player.l.dp**0.4
        
        return eff
      },
      effectDisplay(){return `^${format(tmp[this.layer].upgrades[this.id].effect)}`},
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    42:{
      title: "Improve+",
      description(){return "<b>DE to Points</b> and <b>DE Boost</b> is better based on DE."},
      cost: D(3.14e12),
      effect(){
        let eff = player.l.de.add(1).log10().div(10).max(1).sqrt()
        
        return eff
      },
      effectDisplay(){return `^${format(tmp[this.layer].upgrades[this.id].effect)}`},
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
    43:{
      title: "DE Multiplier",
      description(){return "Gain more DE based on DE upgrades bought."},
      cost: D(5e13),
      effect(){
        let eff = player.l.upgrades.filter(u=>u>20).length**2
        
        return eff
      },
      effectDisplay(){return `${format(tmp[this.layer].upgrades[this.id].effect)}x`},
      currencyDisplayName: "DE",
      currencyInternalName: "de",
      currencyLayer: "l"
    },
  },
  milestones: {
    0: {
      requirementDescription: `1 Line`,
      effectDescription: "You can bulk complete <b>The Prestige Triangle</b>.",
      done() { return player[this.layer].total.gte(1) }
    },
    1: {
      requirementDescription: `3 Total Lines`,
      effectDescription: "Start with 1 CP per 2 line milestones.",
      done() { return player[this.layer].total.gte(3) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    2: {
      requirementDescription: `4 Total Lines`,
      effectDescription: "You can buy max CP.",
      done() { return player[this.layer].total.gte(4) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    3: {
      requirementDescription: `5 Total Lines`,
      effectDescription: "Unlock <b>The Challenge</b>.",
      done() { return player[this.layer].total.gte(5) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    4: {
      requirementDescription: `0.25 DP`,
      effectDescription: "<b>Point Boosters</b> is better based on DP.",
      done() { return player[this.layer].dp>=0.25 },
    },
    5: {
      requirementDescription: `1 DP`,
      effectDescription: "Passively gain L4 points.",
      done() { return player[this.layer].dp>=1 },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    6: {
      requirementDescription: `2 DP`,
      effectDescription: "Keep passive L2 gain in <b>The Prestige Triangle</b>.",
      done() { return player[this.layer].dp>=2 },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    7: {
      requirementDescription: `4 DP`,
      effectDescription: "<b>Extra L3</b> is better based on CP.",
      done() { return player[this.layer].dp>=4 },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    8: {
      requirementDescription: `5 DP`,
      effectDescription: "DP milestones affect line milestone 2 in a normal run.",
      done() { return player[this.layer].dp>=5 },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    9: {
      requirementDescription: `8 DP`,
      effectDescription: "DP generates downgrade energy.",
      done() { return player[this.layer].dp>=8 },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    10: {
      requirementDescription: `12 DP`,
      effectDescription: "Autobuy L1 upgrades.",
      done() { return player[this.layer].dp>=12 },
      unlocked(){return hasMilestone(this.layer,this.id-1)},
      toggles: [["l","autoupgl1"]]
    },
    11: {
      requirementDescription: `15 DP`,
      effectDescription: "Autobuy L2 upgrades.",
      done() { return player[this.layer].dp>=15 },
      unlocked(){return hasMilestone(this.layer,this.id-1)},
      toggles: [["l","autoupgl2"]]
    },
    12: {
      requirementDescription: `20 DP`,
      effectDescription: "Autobuy L3 upgrades.",
      done() { return player[this.layer].dp>=20 },
      unlocked(){return hasMilestone(this.layer,this.id-1)},
      toggles: [["l","autoupgl3"]]
    },
    13: {
      requirementDescription: `22.5 DP`,
      effectDescription: "Unlock extra nerfs for The <b>Challenge</b>.",
      done() { return player[this.layer].dp>=22.5 },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    14: {
      requirementDescription: `30 DP`,
      effectDescription: "Autobuy L4 upgrades.",
      done() { return player[this.layer].dp>=30 },
      unlocked(){return hasMilestone(this.layer,this.id-1)},
      toggles: [["l","autoupgl4"]]
    },
  },
  clickables: {
    11: {
      display: "<h2>L1</h2>",
      canClick: true,
      onClick(){
        player.l.challLayer="l1"
      },
      style(){
        return {"width":"50px","min-height":"50px","background-color":(player.l.challLayer=="l1"?"#00ff00":"#ff0000")}
      },
    },
    12: {
      display: "<h2>L2</h2>",
      canClick: true,
      onClick(){
        player.l.challLayer="l2"
      },
      style(){
        return {"width":"50px","min-height":"50px","background-color":(player.l.challLayer=="l2"?"#00ff00":"#ff0000")}
      },
    },
    13: {
      display: "<h2>L3</h2>",
      canClick: true,
      onClick(){
        player.l.challLayer="l3"
      },
      style(){
        return {"width":"50px","min-height":"50px","background-color":(player.l.challLayer=="l3"?"#00ff00":"#ff0000")}
      },
    },
    14: {
      display: "<h2>L4</h2>",
      canClick: true,
      onClick(){
        player.l.challLayer="l4"
      },
      style(){
        return {"width":"50px","min-height":"50px","background-color":(player.l.challLayer=="l4"?"#00ff00":"#ff0000")}
      },
    },
    21: {
      display: "<h2>Reset All</h2>",
      canClick(){return (player.l.disabled.l1.length>=1||player.l.disabled.l2.length>=1||player.l.disabled.l3.length>=1||player.l.disabled.l4.length>=1)&&!inChallenge("l",11)},
      onClick(){
        player.l.disabled={l1:[],l2:[],l3:[],l4:[]}
        player.l.dpGain=0
      },
      style:{"width":"70px","min-height":"70px"}
    },
  },
  grid: {
    rows: 3, // If these are dynamic make sure to have a max value as well!
    cols: 3,
    getStartData(id) {
        return 0
    },
    getUnlocked(id) { // Default
      return !!this.getUpgs()[gridToNum(id)]&&this.getUpgs()[gridToNum(id)].dp
    },
    getCanClick(data, id) {
        return !inChallenge("l",11)
    },
    onClick(data, id) { 
      id = gridToNum(id)
      let l = player.l.challLayer
      let i = player.l.disabled[l].indexOf(id)
      let dp = this.getUpgs()[id].dp
      if(i!=-1){
        player.l.disabled[l].splice(i,1)
        player.l.dpGain-=dp
        let d = this.getUpgs()[id].disable
        if(d&&d.remove){
          d.remove.forEach(d=>{
            i = player.l.disabled[d[0]].indexOf(d[1])
            if(i!=-1)player.l.disabled[d[0]].splice(i,1)
          })
        }
      }else{
        player.l.disabled[l].push(id)
        player.l.dpGain+=dp
        let d = this.getUpgs()[id].disable
        if(d&&d.req){
          d.req.forEach(d=>{
            i = player.l.disabled[d[0]].indexOf(d[1])
            if(i==-1)player.l.disabled[d[0]].push(d[1])
          })
        }
      }
    },
    getDisplay(data, id) {
      let upgs = this.getUpgs()
      id = gridToNum(id)
      if(!this.upgUnlocked(id))return "???"
      return "<b>"+upgs[id].title+"</b><br>DP: "+upgs[id].dp
    },
    getStyle(data, id){
      let upgs = this.getUpgs()
      id = gridToNum(id)
      if(!this.upgUnlocked(id))return;
      if(!player.l.disabled[player.l.challLayer].includes(id))return{"background-color":"#00ff00"}
      return{"background-color":"#ff0000"}
    },
    getUpgs(){
      return tmp[player.l.challLayer].upgrades
    },
    upgUnlocked(id){
      return true
    }
},
  challenges: {
    11: {
      name: "The Challenge",
      challengeDescription: "Lose upgrades of your choice.",
      canComplete: function() {return player.points.gte(player.l.challGoal)},
      goalDescription(){return format(player.l.challGoal)+" points"},
      rewardDescription(){return `gain ${format(tmp.l.dpGain)} DP`},
      onExit(){
        if(player.points.gte(player.l.challGoal)){
          player.l.dp=Math.max(player.l.dp,tmp.l.dpGain)
          player.l.challenges[11]=0
        }
      },
      onEnter(){
        player.m.points=D(2)
        player.l4.upgrades=[]
      }
    },
  },
  tabFormat:{
    "Main":{
      content:[
        "main-display",
        function(){return inChallenge("m",11)?"":"prestige-button"},
        "resource-display",
        ["display-text",function(){return `You have earned ${formatWhole(player.l.total)} lines in total.`}],
        ["milestones",[0,1,2,3]]
      ]
    },
    "Upgrades":{
      content:[
        "main-display",
        function(){return inChallenge("m",11)?"":"prestige-button"},
        "resource-display",
        ["row",[["upgrade",11],["upgrade",12]]]
      ]
    },
    "The Challenge":{
      content:[
        "main-display",
        function(){return inChallenge("m",11)?"":"prestige-button"},
        "resource-display",
        ["microtabs","The Challenge"]
      ],
      unlocked(){return hasMilestone("l",3)}
    },
  },
  microtabs:{
    "The Challenge":{
      Challenge:{
        content: ["challenges"]
      },
      Selector:{
        content: [
          ["microtabs","Selector"]
        ],
      },
      Info:{
        content:[
          ["infobox","challInfo"]
        ]
      },
      Help:{
        content:[["microtabs","Help"]]
      },
      DP:{
        content:[["microtabs","DP"]]
      }
    },
    DP:{
      Main:{
        content:[
          ["display-text",function(){return `You have ${format(player.l.dp)} downgrade points.`}],
          ["milestones",[4,5,6,7,8,9,10,11,12,13,14]]
        ]
      },
      Energy:{
        content:[
          ["display-text",function(){return `You have ${format(player.l.de)} downgrade energy (+${format(tmp.l.de.gain.minus(tmp.l.de.loss.times(player.l.de)).times(tmp.l.de.speed))})`}],
          ["row",[["buyable",11]]],
          ["row",[["upgrade",21],["upgrade",22],["upgrade",23]]],
          ["row",[["upgrade",31],["upgrade",32],["upgrade",33]]],
          ["row",[["upgrade",41],["upgrade",42],["upgrade",43]]]
        ],
        unlocked(){return hasMilestone("l",9)}
      },
    },
    Help:{
      "Help":{
        content:[["infobox","Hint"]]
      },
      "0-4DP":{
        content:[["infobox","0-4DP"]]
      },
      "5-8DP":{
        content:[["infobox","5-8DP"]]
      }
    },
    Selector:{
      Layers:{
        content: [
          ["row",[["clickable",11],["clickable",12],["clickable",13],["clickable",14]]],
          "grid",
          ["clickable",21],
          ["display-text",function(){return "DP on challenge completion: "+format(player.l.dpGain)}],
        ],
      },
      "Extra Nerfs":{
        content: [
          ["display-text","<h3>Challenge Goal</h3>"],
          ["row",[function(){return inChallenge("l",11)?["display-text",format(player.l.challGoal)]:["drop-down",["challGoal",["1e100","1e200","1.79e308","1e400","1e500","1e625","1e750","1e1,000"]]]},["display-text","&nbsp;points"]]],
          ["display-text",function(){return `${format(tmp.l.en.challGoal)}x DP`}],
          "blank",
          ["display-text","<h3>Max Prestige Triangle Completions</h3>"],
          function(){return inChallenge("l",11)?["display-text",formatWhole(player.l.maxPTcompletions)+" max completions"]:["slider",["maxPTcompletions",0,10]]},
          ["display-text",function(){return `${format(tmp.l.en.extraChallenges)}x DP`}],
          "blank",
          ["display-text","<h3>Point Exponent</h3>"],
          ["row",[["display-text","^"],function(){return inChallenge("l",11)?["display-text",format(player.l.pointExp)]:["drop-down",["pointExp",[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1]]]},["display-text","&nbsp;points"]]],
          ["display-text",function(){return `${format(tmp.l.en.pointExp)}x DP`}],
          "blank",
        ]
      }
    }
  },
  infoboxes:{
    challInfo:{
      title: "Challenge Info",
      body: "<span style='color:#ff0000'>Red</span> means it's deactivated for the challenge while <span style='color:#00ff00'>green</span> means it isn't. You get more DP from better upgrades."
    },
    Hint:{
      title: "Help",
      body: "If you don't know how to get enough DP to progress you can read these hints."
    },
    "0-4DP":{
      title: "Hint",
      body: "QoL, while helpful, isn't required."
    },
    "5-8DP":{
      title: "Hint",
      body: "L3 upgrades aren't as good as you might think."
    }
  },
  de:{
    gain(){
      let gain = D(player.l.dp**2).div(100)
      gain=gain.times(buyableEffect("l", 11))
      if(hasUpgrade("l",21))gain=gain.times(upgradeEffect("l",21))
      if(hasUpgrade("l",41))gain=gain.times(2)
      if(hasUpgrade("l",43))gain=gain.times(upgradeEffect("l",43))
      
      return gain
    },
    loss(){
      let loss = D(0.01)
      
      return loss
    },
    speed(){
      let s = 1
      if(hasUpgrade("l",23))s=5
      
      return s
    }
  },
  en:{
    challGoal(){
      let goal = D(player.l.challGoal).log(1.79e308)
      if(goal.gte(1))goal=goal.sqrt()
      return goal
    },
    extraChallenges(){
      let cc = player.l.maxPTcompletions
      if(cc>=5)return (5-cc)/20+1
      return (5-cc)/10+1
    },
    pointExp(){
      let exp = (1-player.l.pointExp)*2.5+1
      return exp
    }
  },
  update(diff){
    if(hasMilestone("l",9))player.l.de = getLogisticAmount(player.l.de, tmp[this.layer].de.gain, tmp[this.layer].de.loss, diff*tmp[this.layer].de.speed)
  },
  dpGain(){
    let gain = player.l.dpGain
    gain*=tmp.l.en.challGoal.toNumber()
    gain*=tmp.l.en.extraChallenges
    gain*=tmp.l.en.pointExp
    return gain
  },
  buyables: {
    11: {
      title(){
        let ver = 2
        if(hasUpgrade("l",33))ver=2.1
        
        return "Doubler "+ver.toFixed(1)
      },
        cost(x=getBuyableAmount(this.layer, this.id)) { return D(3).pow(x).times(25).div(hasUpgrade("l",32)?x.add(1):1) },
        display() { return `Gain ${format(tmp.l.buyables[11].base,hasUpgrade("l",33)?3:0)}x more DE per purchase.<br>Cost: ${format(tmp[this.layer].buyables[11].cost)} DE<br>Effect: ${format(buyableEffect(this.layer, this.id))}x<br>Amount: ${formatWhole(getBuyableAmount(this.layer,this.id))}` },
        canAfford() { return player[this.layer].de.gte(this.cost()) },
        buy() {
            player[this.layer].de = player[this.layer].de.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      base(){
        let base = D(2)
        if(hasUpgrade("l",33))base=base.add(upgradeEffect("l",33))
        
        return base
      },
      effect(){
        let eff = tmp.l.buyables[11].base.pow(getBuyableAmount(this.layer, this.id))
        
        return eff
      },
      style: {"height":"70px"}
    },
}
})