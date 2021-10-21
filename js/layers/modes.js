addLayer("modes", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
    symbol: "M",
    tooltip: "Modes",
    color: "#444444",                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
    type: "none",                         // Determines the formula used for calculating prestige currency.
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
  clickables: {
    11:{
      title: "Grindless",
      display: "Autobuy upgrades, gain 3x more of each layer's currency, and keep L4 upgrades on middle reset.",
      canClick(){return !player.grindless},
      onClick(){
        if(confirm("您确定要进入 不受约束 吗？"))player.grindless=true
      },
      style(){return {"background-color":player.grindless?"#00ff00":"#ff0000"}}
    }
  },
  tabFormat:["clickables"]
})