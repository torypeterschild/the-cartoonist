/* Global variables */
var toadie;
var s = new Snap("#dog");

/* Preload fonts and any other files */
function preload() {
  toadie = loadFont("../static/fonts/toadie-is.ttf");
}

/* Define caption object */
var Caption = function(captionText) {
  this.captionText = captionText;
  this.drawing = Snap.select('#dog');
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
  this.mat.translate(0, 35); 
  this.mat.rotate(4, 0, 40); 
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
console.log(dog_bb);

var captionText = $("#caption").text();
console.log(captionText);


var wordCount = captionText.split(" ").length;
console.log("word count is");
console.log(wordCount);

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



