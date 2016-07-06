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


/*--------------
  RADIO BUTTONS
 --------------*/

var currentValue = 2;

function handleClick(myRadio) {
  currentValue = myRadio.value;
  localStorage.setItem('dType',currentValue);
  display();
  document.location.href="/input";
  if (currentValue == 1) {
    console.log("TRUE VAL IS 1");
  } else if (currentValue == 2) {
    console.log("ELSE");
  }
}


function display() {
  drawingType = localStorage.getItem('dType');
  if (drawingType == 1) {
    console.log("type: DOG");
    origDrawing.style.display = "none";
    dogDrawing.style.display = "block";
  } else if (drawingType == 2) {
    console.log("type: CIRCLE");
    origDrawing.style.display = "block";
    dogDrawing.style.display = "none";
  }
}


/*--------
  HELPERS
 --------*/

/* Call after POST to create new caption object */
function makeSavedCaption() {
  console.log("IN MAKE SAVED CAPTION");
  var savedCaptionText = $("#captionsave").text();
  var savedCaption = new Caption(savedCaptionText);
  console.log("saved caption after ajax: " + savedCaption.toString());
  savedCaption.writeInSnapD();
  savedCaption.writeInSnapS();
}


/*-----------------------
  NOISE-SPECIFIC HELPERS 
-------------------------*/

/* Get a random number between a certain max and min */
function randomNumberBetween(max, min) {
  var r = Math.random() * (max - min) + min;
  return r;
}

/* Helper function to alter a point */
function alterPoint(p) {
  var addOrSub = [1, -1];
  var byPercent = [0.001, 0.002, 0.003, 0.01, 0.03];
  var op = addOrSub[Math.floor(Math.random()*addOrSub.length)];
  var amt = byPercent[Math.floor(Math.random()*byPercent.length)];
  var newP = p + (p * amt * op);
  return newP;
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
    var r = randomNumberBetween(maxRotation,minRotation);
    var thePath = this.surface.select("#cpath");
    thePath.attr({
      "fill-opacity": 0.9,
    });
    var bdgBox = thePath.getBBox();
    var sx = randomNumberBetween(1.4,0.6);
    var sy = randomNumberBetween(1.4,0.6);
    this.mat.rotate(r, bdgBox.cx, bdgBox.cy); 
    this.mat.scale(sx,sy); 
    thePath.transform(this.mat);
    this.BBOX = this.surface.getBBox();
  },

  createEye: function() {
    var outline = this.surface.select("#cpath");

    /* Create leftEye and rightEye */
    var leftEye = outline.clone();
    var rightEye = outline.clone();
    var bdgBox = outline.getBBox();

    /* Create matrices */
    var lMat = new Snap.Matrix();
    var rMat = new Snap.Matrix();

    /* Define eye width and height in terms of BBOX*/
    var eyeW = bdgBox.width/20;
    var eyeH = bdgBox.height/20;

    /* Translate */
    lMat.translate(bdgBox.cx-(0.15*bdgBox.width), (bdgBox.y+bdgBox.cy/1.5));
    rMat.translate(bdgBox.cx-(0.15*bdgBox.width) + 4*eyeW, (bdgBox.y+bdgBox.cy/1.5));

    /* Scale sMat by eyeW, eyeH, and add noise */
    lMat.scale(eyeW, eyeH);
    rMat.scale(eyeW, eyeH);
    var sx = ((Math.random() * (1.5 - 0.8)) + 0.8)/100*(0.0025 * bdgBox.width);
    var sy = ((Math.random() * (1.5 - 0.8)) + 0.8)/100*(0.0025 * bdgBox.height);
    lMat.scale(sx,sy);
    lMat.translate(sx*150,sy*20);
    rMat.scale(sx,sy);
    rMat.translate(sx*150,sy*20);
    leftEye.transform(lMat);
    rightEye.transform(rMat);

    var lBB = leftEye.getBBox();
    var leftPupil = s.circle(lBB.cx-(lBB.width/5), lBB.cy, lBB.width/15);

    var rBB = rightEye.getBBox();
    var rightPupil = s.circle(rBB.cx-(rBB.width/5), rBB.cy, rBB.width/15);

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
  },

  drawHair: function() {
    var outline = this.surface.select("#cpath");
    var bdgBox = outline.getBBox();
    var hair1 = s.path("M" + bdgBox.cx.toFixed(2) + " " + bdgBox.y.toFixed(2) + "Q" + (bdgBox.cx/2).toFixed(2) + " " + (bdgBox.y-70).toFixed(2) + 
      " " + bdgBox.cx.toFixed(2) + " " + bdgBox.y.toFixed(2));
    var hair2 = s.path("M" + bdgBox.cx.toFixed(2) + " " + bdgBox.y.toFixed(2) + "Q" + (bdgBox.x2/2).toFixed(2) + " " + (bdgBox.y-40).toFixed(2) + 
      " " + (bdgBox.cx).toFixed(2) + " " + (bdgBox.y-50).toFixed(2));
    var hair3 = s.path("M" + bdgBox.cx.toFixed(2) + " " + bdgBox.y.toFixed(2) + "Q" + (bdgBox.x2/3).toFixed(2) + " " + (bdgBox.y-20).toFixed(2) + 
      " " + (bdgBox.cx/2).toFixed(2) + " " + (bdgBox.y-40).toFixed(2));
    var hair4 = s.path("M" + bdgBox.cx.toFixed(2) + " " + bdgBox.y.toFixed(2) + "Q" + (bdgBox.x2/4).toFixed(2) + " " + (bdgBox.y-10).toFixed(2) + 
      " " + (bdgBox.cx/2).toFixed(2) + " " + (bdgBox.y-30).toFixed(2));
    var hairs = s.group(hair1,hair2,hair3,hair4);
    hairs.attr({
      stroke: "#212121",
      fill: "none",
      strokeWidth: 3,
      strokeLinecap:"round"
    });
  },

  switchToRect: function() {
    var rectPath = "M269.6,787.7 C297.7,785.8 339.7,784.5 387,783.8 L435.3,783.1 L437.3,778.1 C440.6,769.7 445,751.9 448.1,734.1 C456,688.1 458.9,653.3 461.1,574.6 C461.7,553.4 463.7,503 465.6,462.6 C469.6,376.8 469.9,365.8 471.2,261.1 C471.8,217.7 472.6,175.8 473.1,168.1 C473.6,160.4 474.3,144.4 474.7,132.6 C475.3,112.4 475.3,111 473.5,108.9 C472.1,107.3 463.9,104.1 443.7,97.6 C411,86.9 390,81.4 344.1,71.6 C308.3,63.9 280,57.2 208.8,39.7 C184.2,33.6 153.2,26.3 139.8,23.5 C116,18.5 99.4,14.5 77.6,8.6 C66.1,5.4 58.7,4.6 57,6.3 C56.4,6.9 53.9,19.9 51.5,35.2 C33,151.1 30.6,195.3 27.6,486.6 C26.1,624.7 22.3,675.5 9.1,730.7 C4.3,750.6 4,757.1 7.6,761.4 C13.6,768.6 40.2,777.5 72.1,783 C87.3,785.6 116.2,788.4 134.1,789 C152.7,789.6 255.2,788.6 269.6,787.7 L269.6,787.7 Z M127.1,793.6 C76.7,791.2 32.6,782.4 10.5,770.2 C-1.5,763.6 -2.5,757.4 4.1,729.8 C17.3,674.1 21.1,623.7 22.6,485.1 C25.7,193.5 27.9,150.9 46.1,36.7 C51.3,3.7 51.9,1.9 58.1,0.3 C62,-0.7 70.5,1 90.1,6.6 C97.5,8.8 110.4,11.9 118.6,13.6 C149.9,20.1 179.9,27 220,37.1 C276.8,51.3 305.8,58.1 351.6,68 C397.4,77.9 409.1,81 442.6,91.8 C472.2,101.3 474.3,102.1 477.3,105.3 C479.5,107.7 479.6,108.2 479.5,127.9 C479.5,139 478.9,156.7 478.3,167.1 C477.6,177.6 476.7,222.3 476.2,266.6 C475,365.3 474.8,371 470.6,464.1 C468.7,505.4 466.7,555.3 466.1,575.1 C464.2,644.9 462.3,673.2 457,710.6 C452.8,740.7 448.4,761.7 443.1,777.1 C442.1,780.1 441.5,782.7 441.9,783 C442.8,783.4 450.6,782.3 458.8,780.6 C463.7,779.5 465.4,779.5 466.3,780.4 C467.3,781.4 467.2,781.9 466.1,783 C464.4,784.5 453.5,787.2 444.7,788.2 C439.8,788.8 438.3,789.4 436.3,791.8 C434.4,794 433.6,794.4 432.5,793.5 C431.7,792.9 431.1,791.4 431.1,790.3 C431.1,788.3 430.9,788.3 380.4,789 C331.2,789.7 304,790.6 270.6,792.7 C250,794 148.6,794.7 127.1,793.6 L127.1,793.6 Z";
    // var rectPath = "M270.5 6.9c28.1 1.9 70.1 3.2 117.4 3.9l48.3.7 2 5c3.3 8.4 7.7 26.2 10.8 44 7.9 46 10.8 80.8 13 159.5.6 21.2 2.6 71.6 4.5 112 4 85.8 4.3 96.8 5.6 201.5.6 43.4 1.4 85.3 1.9 93 .5 7.7 1.2 23.7 1.6 35.5.6 20.2.6 21.6-1.2 23.7-1.4 1.6-9.6 4.8-29.8 11.3-32.7 10.7-53.7 16.2-99.6 26-35.8 7.7-64.1 14.4-135.3 31.9-24.6 6.1-55.6 13.4-69 16.2-23.8 5-40.4 9-62.2 14.9-11.5 3.2-18.9 4-20.6 2.3-.6-.6-3.1-13.6-5.5-28.9C33.9 643.5 31.5 599.3 28.5 308 27 169.9 23.2 119.1 10 63.9 5.2 44 4.9 37.5 8.5 33.2c6-7.2 32.6-16.1 64.5-21.6 15.2-2.6 44.1-5.4 62-6 18.6-.6 121.1.4 135.5 1.3zM128 1C77.6 3.4 33.5 12.2 11.4 24.4-.6 31-1.6 37.2 5 64.8c13.2 55.7 17 106.1 18.5 244.7 3.1 291.6 5.3 334.2 23.5 448.4 5.2 33 5.8 34.8 12 36.4 3.9 1 12.4-.7 32-6.3 7.4-2.2 20.3-5.3 28.5-7 31.3-6.5 61.3-13.4 101.4-23.5 56.8-14.2 85.8-21 131.6-30.9 45.8-9.9 57.5-13 91-23.8 29.6-9.5 31.7-10.3 34.7-13.5 2.2-2.4 2.3-2.9 2.2-22.6 0-11.1-.6-28.8-1.2-39.2-.7-10.5-1.6-55.2-2.1-99.5-1.2-98.7-1.4-104.4-5.6-197.5-1.9-41.3-3.9-91.2-4.5-111-1.9-69.8-3.8-98.1-9.1-135.5-4.2-30.1-8.6-51.1-13.9-66.5-1-3-1.6-5.6-1.2-5.9.9-.4 8.7.7 16.9 2.4 4.9 1.1 6.6 1.1 7.5.2 1-1 .9-1.5-.2-2.6-1.7-1.5-12.6-4.2-21.4-5.2-4.9-.6-6.4-1.2-8.4-3.6-1.9-2.2-2.7-2.6-3.8-1.7-.8.6-1.4 2.1-1.4 3.2 0 2-.2 2-50.7 1.3-49.2-.7-76.4-1.6-109.8-3.7C250.9.6 149.5-.1 128 1z";
    this.path.setAttribute("d", rectPath);
    // this.alterCommands();
    // this.applyNewPath();
  }

} 
/* End Face Prototype */

/*----
  DOG
 ----*/

var Dog = function() {
  this.surface = Snap.select("#dog"); 
  this.eye = this.surface.select('#eye');
  this.tail = this.surface.select('#tail');
  this.tailShading = this.surface.select('#tailShading');
  this.ear = this.surface.select('#ear');
  this.earShading = this.surface.select('#earShading');
  this.snoutOutline = this.surface.select('#snoutOutline');
  this.lowerSnoutShading = this.surface.select('#lowerSnoutShading');
  this.backFoot = this.surface.select('#backFoot');
  var dog_bb = this.surface.getBBox();
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
  this.drawingType = localStorage.getItem('dType');
  var idString = null;
  if (this.drawingType == 1) {
    idString = "#dog";
  } else if (this.drawingType == 2) {
    idString = "#circleFace";
  }
  this.drawing = Snap.select(idString);
  this.drawing_bb = this.drawing.getBBox();
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
    console.log("Lines in writeInSnapD(): " + this.lines);
    this.snapCaptionD = d.text(this.x, this.y, this.lines);
    var tilt = tiltAmts[Math.floor(Math.random()*tiltAmts.length)];
    // this.mat.translate(this.drawing_bb.x, this.drawing_bb.y2);
    // this.mat.scale(10/this.drawing_bb.width);
    console.log("TILT IS: " + tilt);
    this.mat.rotate(tilt, this.drawing_bb.cx, this.drawing_bb.cy); 
    this.snapCaptionD.attr({"font-size":40});
    this.snapCaptionD.transform(this.mat);
    var h = this.drawing_bb.y + this.drawing_bb.height;
    this.snapCaptionD.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0 + i,y:h+45*(i+1)});
    });
  },

  writeInSnapS: function() {
    if (this.lines.length == 0) {
      this.splitIntoLines();
    }
    console.log("Lines in writeInSnapS(): " + this.lines);
    this.snapCaptionS = s.text(this.x, this.y + 20, this.lines);
    var tilt = tiltAmts[Math.floor(Math.random()*tiltAmts.length)];
    console.log("TILT IS: " + tilt);
    this.mat.rotate(tilt, this.drawing_bb.cx, this.drawing_bb.y2); 
    this.snapCaptionS.attr({"font-size":40});
    // this.mat.translate(this.drawing_bb.x, this.drawing_bb.y2);
    this.snapCaptionS.transform(this.mat);
    var h = this.drawing_bb.y + this.drawing_bb.height;
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
  origFace.drawHair();
  // origFace.switchToRect();
  // origFace.alterCommands();
  // origFace.applyNewPath();
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





