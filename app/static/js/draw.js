/* Global variables */
var toadie;
var s = new Snap("#dog");
var tiltAmts = [5, 4, 3, 2, 355, 356, 357, 358];

var cmdRegEx = /[a-z][^a-z]*/ig;
var numRegEx = /[+-]?\d+(\.\d+)?/g;
var instrRegEx = /^[a-zA-Z]*/g;

/* Preload fonts and any other files */
function preload() {
  toadie = loadFont("../static/fonts/toadie-is.ttf");
}

/* Define face object */
var Face = function() {
  this.surface = Snap.select("#circleFace");
  this.path = document.getElementById("path");
  this.pathString = this.path.getAttribute("d");
  this.mat = new Snap.Matrix();
  console.log("path string is " + this.pathString);
  this.commands = this.pathString.match(cmdRegEx);
  this.altPath = [];
}

Face.prototype.alterCommands = function() {
  console.log("inside alterCommands");
}

/*------------
  EXPERIMENTS
 ------------*/

var sur = new Snap("#circleFace");

// var sur = Snap.select("#circleFace");
var circlePath = document.getElementById("cpath");
var leftEye = sur.clone();
var pathString = circlePath.getAttribute("d");
console.log("the path string is " + pathString);
var mat = new Snap.matrix();
// mat.scale(0.1, 0.1);
sur.transform(mat);

var cmdRegEx = /[a-z][^a-z]*/ig;
var commands = pathString.match(cmdRegEx);
console.log("COMMANDS ARE " + commands);
console.log("COMMANDS 1 is  " + commands[0]);
console.log("type of COMMANDS 1 is  " + typeof(commands[0]));
var cmd1 = commands[0];
var l = commands[0].split(",");
console.log("split on comma " + l[0] + " " +  l[1]);
var numRegEx = /[+-]?\d+(\.\d+)?/g;
var instrRegEx = /^[a-zA-Z]*/g;
console.log(l[0].match(instrRegEx));
console.log(l[0].match(numRegEx));

var alteredPath = [];
var splitOnSpaceList = [];
var splitOnCommas = [];

function alterPoint(p) {
  var addOrSub = [1, -1];
  var byPercent = [0.001, 0.002, 0.003, 0.01, 0.03];
  var op = addOrSub[Math.floor(Math.random()*addOrSub.length)];
  var amt = byPercent[Math.floor(Math.random()*byPercent.length)];
  console.log("addOrSub: " + op + "; byPercent: " + amt);
  var newP = p + (p * amt * op);
  console.log("OLD POINT IS: " + p + "\nNEW POINT IS: " + newP);
  return newP;
}

for (var i = 0; i < commands.length; i++) {
  var temp = commands[i];
  console.log("temp at iteration " + i + " is " + temp);
  var splitOnSpace = temp.split(" ");
  splitOnSpaceList.push(splitOnSpace);
}

for (var j = 0; j < splitOnSpaceList.length; j++) {
  console.log("\nsplit on space list " + j + " is " + splitOnSpaceList[j]);
}

for (var k = 0; k < splitOnSpaceList.length; k++) {
  var temp = splitOnSpaceList[k];
  console.log(temp);
  console.log(typeof(temp));
  for (var p = 0; p < temp.length; p++) {
    if (Boolean(temp[p])) {
      var splitOnComma = temp[p].split(",");
      splitOnCommas.push(splitOnComma);
    }
  }
}

for (var n = 0; n < splitOnCommas.length; n++) {
  console.log("\nsplit on commas list " + n + " is " + splitOnCommas[n]);
}

console.log("TESTTEST");
console.log(splitOnCommas[0][0]);

for (var q = 0; q < splitOnCommas.length; q++) {
  var numPairs = splitOnCommas[q].length;
  console.log("length at iter " + q + " is " + numPairs);
  if (numPairs == 2) {
    // console.log(splitOnCommas[0]);
    // console.log("type of s.o.c.[0]: " + typeof(splitOnCommas[0]));
    var instr = splitOnCommas[q][0].match(instrRegEx);
    var px = splitOnCommas[q][0].match(numRegEx);
    var py = splitOnCommas[q][1].match(numRegEx);
    var fpx = parseFloat(px);
    var fpy = parseFloat(py);
    console.log("instr: " + instr);
    console.log("PX: " + px + "; PY: " + py);
    console.log("type of px " + typeof(px));
    console.log("FPX: " + fpx);
    console.log("type of fpx " + typeof(fpx));
    var altPX = alterPoint(fpx);
    console.log("altp is: " + altPX);
    var altPY = alterPoint(fpy);
    alteredPath.push(instr + altPX + "," + altPY);
  }
}

console.log("ALTERED PATH: " + alteredPath);
console.log("ALTERED PATH[0]: " + alteredPath[0]);
var altPathString = alteredPath.join(" ");
console.log("ALT PATH STRING : \n" + altPathString);

circlePath.setAttribute("d", altPathString);

var face = sur.select('#cpath');
face_bb = face.getBBox();
console.log("FACE BBOX ");
console.log(face_bb);

var r = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

var faceMatrix = new Snap.Matrix();
// faceMatrix.translate(0,0);
faceMatrix.rotate(r, face_bb.cx, face_bb.cy);

face.transform(faceMatrix);


var eyeMatrix = new Snap.Matrix();
console.log("eyeMatrix");
console.log(eyeMatrix);
eyeMatrix.scale(.5);
// eyeMatrix.translate(face_bb.cx, face_bb.cy);
// eyeMatrix.rotate(0, face_bb.cx, face_bb.cy);
leftEye.animate({transform: eyeMatrix}, 5000);
var lEye = sur.svg(face_bb.cx, face_bb.cy);
sur.transform(eyeMatrix);
lEye.append(leftEye);

/*---------------
  END EXPERIMENTS
 ----------------*/


/* Define caption object */
var Caption = function(captionText) {
  this.captionText = captionText;
  this.drawing = Snap.select("#dog");
  // console.log("DRAWING: " + this.drawing);
  this.drawing_bb = this.drawing.getBBox();
  console.log("BOUNDING BOX: " + this.drawing_bb.height);
  this.x = 0;
  this.y = this.drawing_bb.y + this.drawing_bb.height - 20;
  this.lineMax = 6;
  this.wordCount = this.captionText.split(" ").length;
  this.words = this.captionText.split(" ");
  this.numLines = Math.round(this.wordCount/this.lineMax);
  this.lines = [];
  this.snapCaption = null;
  this.mat = new Snap.Matrix();
}

/* Split caption into lines */
Caption.prototype.splitIntoLines = function() {
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
}

/* toString for debugging purposes */
Caption.prototype.toString = function() {
  return this.captionText + " with word count of " + this.wordCount + "\n and " + this.numLines + " lines";
}

/* Create Snap text object, set line spacing and slant */
// TODO: Randomly generate rotation angle between 355 and 5 degrees
Caption.prototype.writeInSnap = function(s) {
  this.splitIntoLines();
  console.log("these are the lines: " + this.lines);
  this.snapCaption = s.text(this.x, this.y, this.lines);
  var tilt = tiltAmts[Math.floor(Math.random()*tiltAmts.length)];
  this.mat.translate(0, 35); 
  console.log("TILT IS: " + tilt);
  this.mat.rotate(tilt, 0, 40); 
  this.snapCaption.attr({"font-size":40});
  this.snapCaption.transform(this.mat);
  var height = this.y;
  this.snapCaption.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0 + i,y:height+45*(i+1)});
   });
}

/* Call after POST to create new caption object */
function makeSavedCaption() {
  console.log("IN MAKE SAVED CAPTION");
  var savedCaptionText = $("#captionsave").text();
  var savedCaption = new Caption(savedCaptionText);
  console.log("saved caption after ajax: " + savedCaption.toString());
  savedCaption.writeInSnap(s);
}


/* Select parts of dog */
/* TODO: figure out how this works when SVG isn't in html */
var dog = Snap.select('#dog'),
  dogStartMatrix = new Snap.Matrix(),
  dogMidMatrix = new Snap.Matrix();
console.log(dog);  
var eye = dog.select('#eye');
var tail = dog.select('#tail');
var tailShading = dog.select('#tailShading');
var ear = dog.select('#ear');
var earShading = dog.select('#earShading');
var snoutOutline = dog.select('#snoutOutline');
var lowerSnoutShading = dog.select('#lowerSnoutShading');
var backFoot = dog.select('#backFoot');

var dog_bb = dog.getBBox();
console.log("DOG BB ");
console.log(dog_bb);

/*-------------------------
  GET CAPTION TEXT, RENDER
 -------------------------*/

var captionText = $("#caption").text();
console.log(captionText);

var theCaption = new Caption(captionText);
console.log("hello there");
console.log(theCaption.toString());

theCaption.writeInSnap(s);


/* Call all animation functions */
tailAnimation();
tailShadingAnimation();
eyeAnimation();
earAnimation()
earShadingAnimation();
backFootAnimation();
snoutOutlineAnimation();


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

makeSavedCaption();



