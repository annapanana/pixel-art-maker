"use strict";

initPalette();
initCanvas();
var brushColor; //a reference to an entry in palette
var mouseDown = false;
// var brushElement;

function initPalette() {
  for (var key in colorPalette) {
    // console.log(colorPalette[key]);
    var div = document.createElement("div");
    div.className = "color-blob";
    div.id = colorPalette[key];
    div.style.backgroundColor = colorPalette[key];
    document.querySelector("#palette").appendChild(div);
  }

  brushColor = "#000";
  document.querySelector("#eraser").style.backgroundColor = "#FFF";
  document.querySelector("#pen").style.backgroundColor = "#000";
  document.querySelector("#trash").style.backgroundColor = "#808080";
  document.querySelector("#newRow").style.backgroundColor = "#FFF";
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
  // brushElement = event.target; b
});

document.querySelector("#canvas").addEventListener("mouseover", function(event) {
  if (mouseDown) {
    if (event.target.id !== "canvas" && event.target.className !== "row" && event.target.className !== "column") {
      event.target.style.backgroundColor = brushColor;
    }
  }
});

// // Update tool selection
// document.querySelector("#toolPanel").addEventListener("click", function(event) {
//   switch (event.target.id) {
//     case "pen":
//
//       break;
//     case "eraser":
//
//       break;
//     case "trash":
//
//       break;
//   }
// });
