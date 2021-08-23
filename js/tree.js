var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
})


addLayer("tree-tab", {
    tabFormat: [["infobox","li"],["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
  
  infoboxes: {
    li: {
        title: "Layer Info",
        body:"Each layer resets the ones before it."
    },
  }
})