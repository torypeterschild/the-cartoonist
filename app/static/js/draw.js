var toadie;
var s = new Snap("#dog");
// var paper = Snap(500,500);

/* Preload fonts and any other files */
function preload() {
  toadie = loadFont("../static/fonts/toadie-is.ttf");
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


var phrases = [];

var lineMax = 6;

if (wordCount > lineMax) {
  console.log("Needs to be split up.");
  var numLines = Math.round(wordCount/6);
  console.log("wordCount/6 = " + numLines);
  var words = captionText.split(" ");
  var lineEnding = 0;
  for (var i = 0; i < numLines - 1; i++) {
    var line = words.slice(lineEnding, lineEnding + lineMax).join(" ");
    lineEnding = lineEnding + lineMax;
    console.log("i is " + i + "line: " + line);
    phrases.push(line);
  }
  var lastLine = words.slice(lineEnding, wordCount).join(" ");
  console.log("last line is " + lastLine);
  phrases.push(lastLine);
  console.log(phrases);
} else {
  phrases.push(captionText);
}

console.log(phrases);


captionHeight = dog_bb.y + dog_bb.height - 20;


var text1 = s.text(dog_bb.x, captionHeight, phrases);

var t = new Snap.Matrix() 
t.translate(0, 35); 
t.rotate(4, 0, 40); 
text1.attr({"font-size":40});
text1.transform(t);

// TODO: make different lines slant differently
text1.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0 + i,y:captionHeight+45*(i+1)});
   });

// text1.select('tspan:nth-of-type(2)').attr({transform: 'rotate(10 x y'});



/* Call all animation functions */
tailAnimation();
tailShadingAnimation();
eyeAnimation();
earAnimation()
earShadingAnimation();
backFootAnimation();
snoutOutlineAnimation();


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


$('#SVGsave').click(function(){
    var a      = document.createElement('a');
    a.href     = 'data:image/svg+xml;utf8,' + unescape($('#dog')[0].outerHTML);
    a.download = 'cartoon.svg';
    a.target   = '_blank';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
});

