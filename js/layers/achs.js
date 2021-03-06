addLayer("achs", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#ffff00",
    row: "side",                                 
    type: "none",                         // Determines the formula used for calculating prestige currency.
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    achievements: {
      11: {
        name: "The Beginning of a Journey",
        tooltip: "Get 1 L1 point.",
        done(){return player.l1.points.gte(1)}
      },
      12: {
        name: "Layer Up!",
        tooltip: "Get 1 L2 point.",
        done(){return player.l2.points.gte(1)}
      },
      13: {
        name: "There's more of them?",
        tooltip: "Buy 4 L1 upgrades.",
        done(){return player.l1.upgrades.length>=4}
      },
      14: {
        name: "Where's the QoL?",
        tooltip: "Get 1 L3 point.",
        done(){return player.l3.points.gte(1)}
      },
      15: {
        name: "Strategy Acquired",
        tooltip: "Buy 6 L1 upgrades.",
        done(){return player.l1.upgrades.length>=6}
      },
      16: {
        name: "What about the last one?",
        tooltip: "Buy 3 L3 upgrades.",
        done(){return player.l3.upgrades.length>=3}
      },
      17: {
        name: "Half Way There!",
        tooltip: "Get 50 L3 points.",
        done(){return player.l3.points.gte(50)}
      },
      21: {
        name: "Yet Another Layer",
        tooltip: "Get 1 L4 point.",
        done(){return player.l4.points.gte(1)},
        unlocked(){return hasAchievement(this.layer,16)}
      },
      22: {
        name: "Actually Qol!?",
        tooltip: "Get Keeper I.",
        done(){return hasUpgrade("l4",12)},
        unlocked(){return hasAchievement(this.layer,16)}
      },
      23: {
        name: "Even More Qol!",
        tooltip: "Get 4 L4 upgrades.",
        done(){return player.l4.upgrades.length>=4},
        unlocked(){return hasAchievement(this.layer,16)}
      },
      24: {
        name: "The Middle",
        tooltip: "Get 1 MP.",
        done(){return player.m.points.gte(1)},
        unlocked(){return hasAchievement(this.layer,23)}
      },
      25: {
        name: "Loss of a corner",
        tooltip: "Unlock The Prestige Triangle.",
        done(){return hasMilestone("m",2)},
        unlocked(){return hasAchievement(this.layer,23)}
      },
      26: {
        name: "A few MP later...",
        tooltip: "Get 4 MP.",
        done(){return player.m.points.gte(4)},
        unlocked(){return hasAchievement(this.layer,23)}
      },
      27: {
        name: "Maxed Out",
        tooltip: "Finish The Prestige Triangle 5 times.",
        done(){return maxedChallenge("m",11)},
        unlocked(){return hasAchievement(this.layer,23)}
      },
      31: {
        name: "Creating Lines",
        tooltip: "Get 1 line.",
        done(){return player.l.total.gte(1)},
        unlocked(){return hasAchievement(this.layer,27)}
      },
      32: {
        name: "Keeper IV",
        tooltip: "Get the second line milestone.",
        done(){return player.l.total.gte(3)},
        unlocked(){return hasAchievement(this.layer,27)}
      },
      33: {
        name: "A New Challenge?",
        tooltip: "Unlock The Challenge.",
        done(){return player.l.total.gte(5)},
        unlocked(){return hasAchievement(this.layer,27)}
      },
      34: {
        name: "It's not like I needed those upgrades anyway",
        tooltip: "Finish The Challenge.",
        done(){return player.l.dp>0},
        unlocked(){return hasAchievement(this.layer,33)}
      },
      35: {
        name: "Energize!",
        tooltip: "Unlock downgrade energy.",
        done(){return hasMilestone("l",9)},
        unlocked(){return hasAchievement(this.layer,33)}
      },
      36: {
        name: "Even More Points!",
        tooltip: "Buy DE to Points.",
        done(){return hasUpgrade("l",22)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      37: {
        name: "Getting OP",
        tooltip: "Buy More DE to Points.",
        done(){return hasUpgrade("l",42)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      41: {
        name: "But there's no point...",
        tooltip: "Reach 1.79e308 points within The Challenge with Doubler disabled.",
        done(){return player.points.gte(1.79e308)&&isDisabled("l1",11)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      42: {
        name: "Upgrade <strike>Complete</strike> Loss",
        tooltip: "Reach 1.79e308 points within The Challenge with all the upgrades that unlock new upgrades disabled.",
        done(){return player.points.gte(1.79e308)&&isDisabled("l1",22)&&isDisabled("l1",23)&&isDisabled("l2",12)&&isDisabled("l3",12)&&isDisabled("l4",22)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      43: {
        name: "Imagine using Doublers",
        tooltip: "Reach 1.79e308 points within The Challenge with only Point Boosters enabled.",
        done(){
          return player.points.gte(1.79e308)&&isDisabled("l1",11)&&isDisabled("l1",12)&&isDisabled("l1",13)&&isDisabled("l1",21)&&isDisabled("l1",22)&&isDisabled("l1",23)
          &&isDisabled("l2",11)&&isDisabled("l2",12)&&isDisabled("l2",13)&&isDisabled("l2",21)&&isDisabled("l2",22)&&isDisabled("l2",23)
          &&isDisabled("l3",11)&&isDisabled("l3",12)&&isDisabled("l3",21)&&isDisabled("l3",22)&&isDisabled("l4",12)&&isDisabled("l4",21)&&isDisabled("l4",22)
        },
        unlocked(){return hasAchievement(this.layer,35)}
      },
      44: {
        name: "Actually 2?",
        tooltip: "Be able to gain 2 lines in one line reset.",
        done(){return tmp.l.resetGain.gte(2)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      45: {
        name: "Finally More Upgrades",
        tooltip: "Get Final L2.",
        done(){return hasUpgrade("l1",32)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      46: {
        name: "Lossless Corners",
        tooltip: "Get Keeper V.",
        done(){return hasUpgrade("l2",32)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
      47: {
        name: "Extreme Downgrades",
        tooltip: "Get 1e40 downgrade energy.",
        done(){return player.l.de.gte(1e40)},
        unlocked(){return hasAchievement(this.layer,35)}
      },
    },
  tabFormat: [["display-text",function(){return `You have completed <h2 style="color:#ffff00;text-shadow:#ffff00 0px 0px 10px">${formatWhole(player.achs.achievements.length)}/${formatWhole(Object.keys(layers.achs.achievements).length-2)}</h2> achievements.`}],"blank","achievements"],
  tooltip: "",
  symbol: "A"
})