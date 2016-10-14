"use strict";
// var palette = require("colors.js");

var colorPalette = {
  red: '#B23232',
  coral: '#FF4848',
  pink: '#FF6C6C ',
  mustard: '#E59B40',
  orange: '#FFAD48',
  tan: '#FFC57E',
  yellowish: '#E5DE40',
  yellow: '#FFF748',
  yellowPale: '#FFFA91',
  green: '#39CC4B',
  neonGreen: '#48FF5E',
  paleGreen: '#91FF9E',
  deepBlue: '#3248B2',
  blue: '#4867FF',
  perrywinkle: '#91A3FF',
  purpleNurple: '#6432B2',
  purple: '#8F48FF',
  palePurple: '#BB91FF',
  deepPurple: '#7C2B99',
  pinkishPurple: '#CF48FF',
  pink: '#E291FF',
  black: '#000000',
  darkestGray: '#323232',
  mediumGray: '#666666',
  gray: '#999999',
  lightGray: '#CCCCCC',
  white: '#FFFFFF',
  darkestBrown: '#3A2119',
  darkBrown: '#512E23',
  mediumBrown: '#754233',
  lightBrown: '#90675B',
  lightestBrown: '#AC8D84'
};


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

  brushColor = "#000000";
}

function initCanvas() {

  // create columns
  var columns = [];
  for (var i = 0; i < 40; i++) {
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
  // brushElement = event.target; b
});

// Draw pixel
document.querySelector("#canvas").addEventListener("mouseover", function(event) {
  if (event.target.className != "column" && event.target.className != "container") {
    if (mouseDown) {
      event.target.style.backgroundColor = brushColor;
    }
  }
});
