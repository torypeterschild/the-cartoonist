var toadie;
var s = new Snap("#dog");

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
  var numLines = Math.round(wordCount/6);
  var words = captionText.split(" ");
  var lineEnding = 0;
  for (var i = 0; i < numLines - 1; i++) {
    var line = words.slice(lineEnding, lineEnding + lineMax).join(" ");
    lineEnding = lineEnding + lineMax;
    phrases.push(line);
  }
  var lastLine = words.slice(lineEnding, wordCount).join(" ");
  phrases.push(lastLine);
} else {
  phrases.push(captionText);
}

console.log(phrases);

captionHeight = dog_bb.y + dog_bb.height - 20;

var caption = s.text(dog_bb.x, captionHeight, phrases);

// TODO: Randomly generate rotation angle between 355 and 5 degrees
var t = new Snap.Matrix() 
t.translate(0, 35); 
t.rotate(4, 0, 40); 
caption.attr({"font-size":40});
caption.transform(t);

caption.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0 + i,y:captionHeight+45*(i+1)});
   });

dog.animate({x: 100}, 1000);

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

/*
 TODO: 
 - fix all button names and styling 
 - buttons should appear below caption 
 - save caption template should be rendered in the same style as cartoon.html
 - remove menu from save template 
*/
$('#savetest').click(function(){
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




