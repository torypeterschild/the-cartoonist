/* Global variables */
var toadie;
var tiltAmts = [5, 4, 3, 2, 355, 356, 357, 358];
var drawingType;

var cmdRegEx = /[a-z][^a-z]*/ig;
var numRegEx = /[+-]?\d+(\.\d+)?/g;
var instrRegEx = /^[a-zA-Z]*/g;

var minRotation = 0;
var maxRotation = 360;

var dogDrawing = document.querySelector("#drawing");
var origDrawing = document.querySelector("#facedrawing");

var s = new Snap("#circleFace");
var d = new Snap("#dog");

/* Preload fonts and any other files */
function preload() {
  toadie = loadFont("../static/fonts/toadie-is.ttf");
}

/*--------------
  RADIO BUTTONS
 --------------*/

var currentValue = 2;

function handleClick(myRadio) {
  console.log('Old value: ' + currentValue);
  console.log('New value: ' + myRadio.value);
  currentValue = myRadio.value;
  localStorage.setItem('dType',currentValue);
  display();
  if (currentValue == 1) {
    console.log("TRUE VAL IS 1");
  } else if (currentValue == 2) {
    console.log("ELSE");
  }
}


function display() {
  drawingType = localStorage.getItem('dType');
  if (drawingType == 1) {
    console.log("type DOG");
    origDrawing.style.display = "none";
    dogDrawing.style.display = "block";
  } else if (drawingType == 2) {
    console.log("type CIRCLE");
    origDrawing.style.display = "block";
    dogDrawing.style.display = "none";
  }
}

console.log("s is ");
console.log(s);

console.log("d is ");
console.log(d);


/*--------
  HELPERS
 --------*/

/* Helper function to alter a point */
function alterPoint(p) {
  var addOrSub = [1, -1];
  var byPercent = [0.001, 0.002, 0.003, 0.01, 0.03];
  var op = addOrSub[Math.floor(Math.random()*addOrSub.length)];
  var amt = byPercent[Math.floor(Math.random()*byPercent.length)];
  var newP = p + (p * amt * op);
  return newP;
}

/* Call after POST to create new caption object */
function makeSavedCaption() {
  console.log("IN MAKE SAVED CAPTION");
  var savedCaptionText = $("#captionsave").text();
  var savedCaption = new Caption(savedCaptionText);
  console.log("saved caption after ajax: " + savedCaption.toString());
  savedCaption.writeInSnapD();
  savedCaption.writeInSnapS();
}

/*-----
  FACE
 -----*/

var Face = function() {
  this.surface = Snap.select("#circleFace");
  this.path = document.getElementById("cpath");
  this.pathString = this.path.getAttribute("d");
  this.mat = new Snap.Matrix();
  this.commands = this.pathString.match(cmdRegEx);
  this.splitOnSpaceList = [];
  this.splitOnCommasList = [];
  this.altPath = [];
  this.mat = new Snap.Matrix();
}

Face.prototype = {

  splitOnSpaces: function() {
    for (var i = 0; i < this.commands.length; i++) {
      var temp = this.commands[i];
      var splitOnSpace = temp.split(" ");
      this.splitOnSpaceList.push(splitOnSpace);
    }
  },

  splitOnCommas: function() {
    for (var k = 0; k < this.splitOnSpaceList.length; k++) {
      var temp = this.splitOnSpaceList[k];
      for (var j = 0; j < temp.length; j++) {
        if (Boolean(temp[j])) {
          var splitOnComma = temp[j].split(",");
          this.splitOnCommasList.push(splitOnComma);
        }
      }
    }
  },

  alterCommands: function() {
    for (var q = 0; q < this.splitOnCommasList.length; q++) {
      var numPairs = this.splitOnCommasList[q].length;
      if (numPairs == 2) {
        var instr = this.splitOnCommasList[q][0].match(instrRegEx);
        var px = this.splitOnCommasList[q][0].match(numRegEx);
        var py = this.splitOnCommasList[q][1].match(numRegEx);
        var fpx = parseFloat(px);
        var fpy = parseFloat(py);
        var altPX = alterPoint(fpx);
        var altPY = alterPoint(fpy);
        this.altPath.push(instr + altPX + "," + altPY);
      }
    }
  },

  applyNewPath: function() {
    var altPathString = this.altPath.join(" ");
    this.path.setAttribute("d", altPathString);
  },

  applyMatrix: function() {
    var r = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    var thePath = this.surface.select("#cpath");
    var bdgBox = thePath.getBBox();
    this.mat.rotate(r, bdgBox.cx, bdgBox.cy); 
    thePath.transform(this.mat);
  }

} 
/* End Face Prototype */

/*----
  DOG
 ----*/

var Dog = function() {
  this.surface = Snap.select("#dog");
  console.log(this.surface);  

  this.eye = this.surface.select('#eye');
  this.tail = this.surface.select('#tail');
  this.tailShading = this.surface.select('#tailShading');
  this.ear = this.surface.select('#ear');
  this.earShading = this.surface.select('#earShading');
  this.snoutOutline = this.surface.select('#snoutOutline');
  this.lowerSnoutShading = this.surface.select('#lowerSnoutShading');
  this.backFoot = this.surface.select('#backFoot');

  var dog_bb = this.surface.getBBox();
  console.log("DOG BB ");
  console.log(dog_bb);
}

Dog.prototype = {

  eyeAnimation: function() {
    this.eye.stop().animate(
      { transform: 'r45,210,80'},
        1000,
        mina.bounce
    );
  },

  tailAnimation: function() {
    this.tail.stop().animate(
      { transform: 't5,15'},
        1000,
        mina.easeinout
    );
  }, 

  backFootAnimation: function() {
    this.backFoot.stop().animate(
    { transform: 't5,0'},
      1000,
      mina.bounce
    );
  },

  tailShadingAnimation: function() {
    this.tailShading.stop().animate(
    { transform: 't5,15'},
      1000,
      mina.bounce
    );
  },
  
  earAnimation: function() {
    this.ear.stop().animate(
    { transform: 't0,3'},
      1000,
      mina.bounce
    );
  },

  earShadingAnimation: function() {
    this.earShading.stop().animate(
    { transform: 't0,3'},
      1000,
      mina.bounce
    );
  },

  snoutOutlineAnimation: function() {
    this.snoutOutline.stop().animate(
    { transform: 't0,3'},
      500,
      mina.bounce
    );
  }
}

/*------------
  EXPERIMENTS
 ------------*/

// var face = sur.select('#cpath');
// face_bb = face.getBBox();
// console.log("FACE BBOX ");
// console.log(face_bb);

// var r = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

// var faceMatrix = new Snap.Matrix();
// // faceMatrix.translate(0,0);
// faceMatrix.rotate(r, face_bb.cx, face_bb.cy);

// face.transform(faceMatrix);


// var eyeMatrix = new Snap.Matrix();
// console.log("eyeMatrix");
// console.log(eyeMatrix);
// eyeMatrix.scale(.5);
// // eyeMatrix.translate(face_bb.cx, face_bb.cy);
// // eyeMatrix.rotate(0, face_bb.cx, face_bb.cy);
// leftEye.animate({transform: eyeMatrix}, 5000);
// var lEye = sur.svg(face_bb.cx, face_bb.cy);
// sur.transform(eyeMatrix);
// lEye.append(leftEye);

/*---------------
  END EXPERIMENTS
 ----------------*/

 /*--------------
  CAPTION OBJECT
 ---------------*/

/* Define caption object */
var Caption = function(captionText) {
  this.captionText = captionText;
  // this.drawing = Snap.select("#circleFace");
  this.drawingType = localStorage.getItem('dType');
  console.log("drawing type inside caption");
  console.log(this.drawingType);
  var idString = null;
  if (this.drawingType == 1) {
    console.log("this drawing type is 1");
    idString = "#dog";
  } else if (this.drawingType == 2) {
    console.log("this drawing type is 2");
    idString = "#circleFace";
  }
  this.drawing = Snap.select(idString);
  this.drawing_bb = this.drawing.getBBox();
  console.log("BOUNDING BOX: ");
  console.log(this.drawing_bb);
  this.x = this.drawing_bb.x;
  this.y = this.drawing_bb.y2;
  this.lineMax = 6;
  this.wordCount = this.captionText.split(" ").length;
  this.words = this.captionText.split(" ");
  this.numLines = Math.round(this.wordCount/this.lineMax);
  this.lines = [];
  this.snapCaptionS = null;
  this.snapCaptionD = null;
  this.mat = new Snap.Matrix();
  this.height = null;
}

Caption.prototype = {

  splitIntoLines: function() {
    if (this.numLines > 1) {
      var lineEnding = 0;
      for (var i = 0; i < this.numLines; i++) {
        var line = this.words.slice(lineEnding, lineEnding + this.lineMax).join(" ");
        lineEnding = lineEnding + this.lineMax;
        this.lines.push(line);
      }
      var lastLine = this.words.slice(lineEnding, this.wordCount).join(" ");
      this.lines.push(lastLine);
    } else {
      this.lines.push(this.captionText);
    }
  }, 

  toString: function() {
    return this.captionText + " with word count of " + this.wordCount + "\n and " + this.numLines + " lines";
  },

  writeInSnapD: function() {
    this.splitIntoLines();
    console.log("these are the lines: " + this.lines);
    this.snapCaptionD = d.text(this.x, this.y, this.lines);
    var tilt = tiltAmts[Math.floor(Math.random()*tiltAmts.length)];
    // this.mat.translate(this.drawing_bb.x, this.drawing_bb.y2);
    // this.mat.scale(10/this.drawing_bb.width);
    console.log("this width is " + this.drawing_bb.width);
    console.log("TILT IS: " + tilt);
    this.mat.rotate(tilt, this.drawing_bb.cx, this.drawing_bb.cy); 
    this.snapCaptionD.attr({"font-size":40});
    this.snapCaptionD.transform(this.mat);
    var h = this.drawing_bb.y + this.drawing_bb.height;
    console.log("Y OF CAPTION: " + this.y + 20);
    this.snapCaptionD.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0 + i,y:h+45*(i+1)});
   });
  },

  writeInSnapS: function() {
    // this.splitIntoLines();
    console.log("these are the lines: " + this.lines);
    this.snapCaptionS = s.text(this.x, this.y + 20, this.lines);
    var tilt = tiltAmts[Math.floor(Math.random()*tiltAmts.length)];
    // this.mat.translate(this.drawing_bb.x, this.drawing_bb.y2);
    // this.mat.scale(10/this.drawing_bb.width);
    console.log("this width is " + this.drawing_bb.width);
    console.log("TILT IS: " + tilt);
    this.mat.rotate(tilt, this.drawing_bb.cx, this.drawing_bb.y2); 
    this.snapCaptionS.attr({"font-size":40});
    // this.mat.translate(this.drawing_bb.x, this.drawing_bb.y2);
    this.snapCaptionS.transform(this.mat);
    var h = this.drawing_bb.y + this.drawing_bb.height;
    console.log("Y OF CAPTION: " + this.y + 20);
    this.snapCaptionS.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0 + i,y:h+45*(i+1)});
   });
  }

}
/* End Caption Prototype */


/* Select parts of dog */
/* TODO: figure out how this works when SVG isn't in html */
// var dog = Snap.select('#dog'),
//   dogStartMatrix = new Snap.Matrix(),
//   dogMidMatrix = new Snap.Matrix();
// console.log(dog);  

// if (Boolean(dog)) {
//   var eye = dog.select('#eye');
//   var tail = dog.select('#tail');
//   var tailShading = dog.select('#tailShading');
//   var ear = dog.select('#ear');
//   var earShading = dog.select('#earShading');
//   var snoutOutline = dog.select('#snoutOutline');
//   var lowerSnoutShading = dog.select('#lowerSnoutShading');
//   var backFoot = dog.select('#backFoot');

//   var dog_bb = dog.getBBox();
//   console.log("DOG BB ");
//   console.log(dog_bb);
// }

/*-------------------------
  GET CAPTION TEXT, RENDER
 -------------------------*/

var captionText = $("#caption").text();
console.log(captionText);


// theCaption.writeInSnap();

var drawingType = localStorage.getItem('dType');
display();
if (drawingType == 1) {
  var theCaption = new Caption(captionText);
  console.log("hello there");
  console.log(theCaption.toString());
  var doggy = new Dog();
  theCaption.writeInSnapD();
  doggy.eyeAnimation();
  doggy.tailAnimation();
  doggy.tailShadingAnimation();
  doggy.eyeAnimation();
  doggy.earAnimation()
  doggy.earShadingAnimation();
  doggy.backFootAnimation();
  doggy.snoutOutlineAnimation();
} else if (drawingType == 2) {
  var theCaption = new Caption(captionText);
  console.log("hello there");
  console.log(theCaption.toString());
  var origFace = new Face();
  console.log("face as object");
  console.log(origFace);
  origFace.splitOnSpaces();
  origFace.splitOnCommas();
  origFace.alterCommands();
  origFace.applyNewPath();
  origFace.applyMatrix();
  theCaption.writeInSnapS();
}


/* Select parts of dog */
/* TODO: figure out how this works when SVG isn't in html */
 


/* Call all animation functions */
// if (Boolean(dog)) {
//   tailAnimation();
//   tailShadingAnimation();
//   eyeAnimation();
//   earAnimation()
//   earShadingAnimation();
//   backFootAnimation();
//   snoutOutlineAnimation();
// }

/*------------------
  DEFINE ANIMATIONS 
 -------------------*/

function eyeAnimation(){
  eye.stop().animate(
    { transform: 'r45,210,80'},
    1000,
    mina.bounce,
    function(){
      eye.attr({ transform: 'rotate(0 256 256'});
      eyeAnimation();
    }
  );
}


function tailAnimation(){
  tail.stop().animate(
    { transform: 't5,15'},
    1000,
    mina.easeinout(),
    function(){
      tail.attr({ transform: 'rotate(0 256 256'},
        1000,
        mina.easeinout());
      tailAnimation();
    }
  );
}


function backFootAnimation(){
  backFoot.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      backFoot.attr({ transform: 'rotate(0 256 256'});
      backFootAnimation();
    }
  );
}


function tailShadingAnimation(){
  tailShading.stop().animate(
    { transform: 't5,15'},
    1000,
    mina.bounce,
    function(){
      tailShading.attr({ transform: 'rotate(0 256 256'});
      tailShadingAnimation();
    }
  );
}


function earAnimation(){
  ear.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      ear.attr({ transform: 'rotate(0 256 256'});
      earAnimation();
    }
  );
}


function earShadingAnimation(){
  earShading.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      earShading.attr({ transform: 'rotate(0 256 256'});
      earShadingAnimation();
    }
  );
}


function snoutOutlineAnimation(){
  snoutOutline.stop().animate(
    { transform: 't0,3'},
    500,
    mina.bounce,
    function(){
      snoutOutline.attr({ transform: 'rotate(0 256 256'});
      snoutOutlineAnimation();
    }
  );
}

/* This saves SVG file (without caption) */
$('#SVGsave').click(function(){
    var a      = document.createElement('a');
    a.href     = 'data:image/svg+xml;utf8,' + unescape($('#dog')[0].outerHTML);
    a.download = 'cartoon.svg';
    a.target   = '_blank';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
});

/*
 TODO: buttons should appear below caption 
*/

/* Renders cartoon and caption in save-cartoon template */
$('#savecartoon').click(function(){
  var value = $("#caption").text()
  console.log("VALUE IS " + value);
  $.ajax({
    type: "POST",
    url: "/save-cartoon",
    data: JSON.stringify(value),
    success: function(msg){
      console.log("success");
    },
    failure: function(msg){
      console.log("failure");
    }
  });
});

// makeSavedCaption("#circleFace");
makeSavedCaption();





