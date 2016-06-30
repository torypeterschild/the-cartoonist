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
  this.BBOX = null;
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
    var sx = (Math.random() * (1.5 - 0.5)) + 0.5;
    var sy = (Math.random() * (1.5 - 0.5)) + 0.5;
    console.log("sx: " + sx);
    console.log("sy: " + sy);
    this.mat.rotate(r, bdgBox.cx, bdgBox.cy); 
    this.mat.scale(sx,sy); 
    thePath.transform(this.mat);
    this.BBOX = this.surface.getBBox();
  },

  createEye: function() {
    console.log("IN CREATE EYE BBOX IS:");
    console.log(this.BBOX);
    var outline = this.surface.select("#cpath");

    /* Create leftEye and rightEye */
    var leftEye = outline.clone();
    var rightEye = outline.clone();
    var bdgBox = outline.getBBox();
    console.log("EYE");
    console.log(eye);

    console.log("BBOX OF OUTLINE");
    console.log(bdgBox);

    console.log("GLOBAL BBOX");
    console.log(this.BBOX);

    /* Create matrices */
    var lMat = new Snap.Matrix();
    var rMat = new Snap.Matrix();

    /* Define eye width and height in terms of BBOX*/
    var eyeW = this.BBOX.width/25;
    var eyeH = this.BBOX.height/25;

    /* Translate */
    lMat.translate(this.BBOX.cx-(0.15*this.BBOX.width), (this.BBOX.y+this.BBOX.cy/1.5));
    rMat.translate(this.BBOX.cx-(0.15*this.BBOX.width) + 4*eyeW, (this.BBOX.y+this.BBOX.cy/1.5));

    /* Scale sMat by eyeW, eyeH, and add noise */
    lMat.scale(eyeW, eyeH);
    rMat.scale(eyeW, eyeH);
    var sx = ((Math.random() * (1.5 - 0.5)) + 0.5)/100*(0.0025 * this.BBOX.width);
    var sy = ((Math.random() * (1.5 - 0.5)) + 0.5)/100*(0.0025 * this.BBOX.height);
    lMat.scale(sx,sy);
    lMat.translate(sx*150,sy*50);
    rMat.scale(sx,sy);
    rMat.translate(sx*150,sy*50);
    console.log("SX IS " + sx);
    console.log("SY IS " + sy);
    leftEye.transform(lMat);
    rightEye.transform(rMat);
    
    // width of eye
    console.log("EYE WIDTH " + eyeW);

    var lBB = leftEye.getBBox();
    var leftPupil = s.circle(lBB.cx-(lBB.width/5), lBB.cy, lBB.width/15);
    console.log("LEFT EYE BBOX");
    console.log(lBB);

    var rBB = rightEye.getBBox();
    var rightPupil = s.circle(rBB.cx-(rBB.width/5), rBB.cy, rBB.width/15);
    console.log("RIGHT EYE BBOX");
    console.log(rBB);

    /* Eyelashes on right eye */
    var eyelash1R = s.line((rBB.cx+rBB.x2)/2, rBB.y, rBB.x2-3, (rBB.y-15));
    var eyelash2R = s.line((rBB.cx+rBB.x2)/2+5, rBB.y, rBB.x2+15, (rBB.y-15));
    var eyelash3R = s.line((rBB.cx+rBB.x2)/2+10, rBB.y, rBB.x2+30, (rBB.y-15));

    /* Eyelashes on left eye */
    var eyelash1L = s.line((lBB.cx+lBB.x)/2, lBB.y, lBB.x+3, (lBB.y-15));
    var eyelash2L = s.line((lBB.cx+lBB.x)/2-5, lBB.y, lBB.x-15, (lBB.y-15));
    var eyelash3L = s.line((lBB.cx+lBB.x)/2-10, lBB.y, lBB.x-30, (lBB.y-15));
    var lashes = s.group(eyelash1R, eyelash3R, eyelash2R, eyelash1L, eyelash3L, eyelash2L);
    lashes.attr({
      stroke: "#000",
      strokeWidth: 2,
      strokeLinecap:"round"
    });
    console.log("EYELASH " + rBB.x, rBB.y, rBB.x+1, rBB.y-10);
    console.log(eyelash1R);
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
    if (this.lines.length == 0) {
      this.splitIntoLines();
    }
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


/*-------------------------
  GET CAPTION TEXT, RENDER
 -------------------------*/

var captionText = $("#caption").text();
console.log(captionText);

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
  origFace.createEye();
  theCaption.writeInSnapS();
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

/* Generate caption on save-cartoon.html page */
makeSavedCaption();





