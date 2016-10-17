"use strict";

initPalette();
initCanvas();
var brushColor; //a reference to an entry in palette
var mouseDown = false;
var penSelected = true;
// var brushElement;

function initPalette() {
  for (var key in colorPalette) {
    // console.log(colorPalette[key]);
    var div = document.createElement("div");
    div.className = "color-blob";
    div.id = colorPalette[key];
    div.style.backgroundColor = colorPalette[key];
    div.style.borderColor = colorPalette[key];
    document.querySelector("#palette").appendChild(div);
  }

  brushColor = "#231F20";
  // updateBlobStroke(document.querySelector("#231F20"));
  document.querySelector("#eraser").style.backgroundColor = "#808080";
  document.querySelector("#pen").style.backgroundColor = "#231F20";
  document.querySelector("#trash").style.backgroundColor = "#808080";
  document.querySelector("#newRow").style.backgroundColor = "#808080";

}

function initCanvas() {

  // create columns
  var columns = [];
  for (var i = 0; i < 58; i++) {
    var div = document.createElement("div");
    div.className = "column";
    document.querySelector("#canvas").appendChild(div);
    columns.push(div);
  }

  // add rows
  var rows = [];
  for (var i = 0; i < columns.length; i++) {
    for (var j = 0; j < 25; j++) {
      var div = document.createElement("div");
      div.className = "row";
      columns[i].appendChild(div);
      rows.push(div);
    }
  }

  console.log(rows.length);
  // populate cells
  for (var i = 0; i < rows.length; i++) {
    var div = document.createElement("div");
    div.className = "cell";
    rows[i].appendChild(div);
  }

}

// check mouse state
document.querySelector("#page").addEventListener("mousedown", function(event) {
  mouseDown = true;
});
document.querySelector("#page").addEventListener("mouseup", function(event) {
  mouseDown = false;
});

// Update color selection
document.querySelector("#palette").addEventListener("click", function(event) {
  brushColor = event.target.id;
  document.querySelector("#pen").style.backgroundColor = event.target.id;

  // remove any white stroke from any color that might be selected
  var colorBlobs = document.getElementsByClassName("color-blob");
  for (var i = 0; i < colorBlobs.length; i++) {
    colorBlobs[i].style.borderColor = colorBlobs[i].id;
  }
  console.log(event.target);
  // add stroke to selected color
  if (event.target.id !== "palette") {
    updateBlobStroke(event.target);
  }
});

function updateBlobStroke(colorBlob) {
  colorBlob.style.borderStyle = "solid";
  colorBlob.style.borderColor = "#FFF";
}

document.querySelector("#canvas").addEventListener("mouseover", function(event) {
  if (mouseDown) {
    if (event.target.id !== "canvas" && event.target.className !== "row" && event.target.className !== "column") {
      if (penSelected) {
        event.target.style.backgroundColor = brushColor;
      } else {
        event.target.style.backgroundColor = "#FFF";
      }
    }
  }
});

// Update tool selection
document.querySelector("#toolPanel").addEventListener("click", function(event) {
  switch (event.target.id) {
    case "pen":
      penSelected = true;
      selectTool(event.target);
      // document.getElementById("myP").style.cursor = "pointer";
      break;
    case "eraser":
      penSelected = false;
      selectTool(event.target);
      break;
    case "trash":
      clearCanvas();
      break;
    case "newRow":

      break;
  }
});

function clearCanvas() {
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "#FFF";
  }
}

function selectTool(tool) {
  console.log(tool);
  document.querySelector("#eraser").style.borderStyle = "none";
  document.querySelector("#pen").style.borderStyle = "none";
  tool.style.borderStyle = "solid";
}
