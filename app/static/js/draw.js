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


wordCount = captionText.split(" ").length;
console.log("word count is");
console.log(wordCount);


// var headline = snap.paper.text(56,100, 
//   ['The Three Layers','of','Every Web Page']).attr({
//     fill: '#FBAF3F', fontFamily: 'Impact'});

//     headline.select('tspan:first-of-type').attr({fontSize: '2.8em'})
//     headline.select('tspan:nth-of-type(2)').attr({fill: 'none', stroke: '#FBAF3F', fontSize: '2.2em', dx: '15px', dy: '5px'});
//     headline.select('tspan:last-of-type').attr({fontSize: '3.6em', x: '56px', y: '160px'});

var phrases = [];

if (wordCount > 6) {
  console.log("Needs to be split up.");
  console.log("wordCount/6 = " + Math.round(wordCount/6));
  words = captionText.split(" ");
  phrases.push(words.slice(0,5).join(" "));
  phrases.push(words.slice(5, wordCount).join(" "));
  console.log(phrases);
}

console.log(phrases);

// var block = s.rect(dog_bb.x - 50, dog_bb.y + dog_bb.height + 30, 500, 200);

captionHeight = dog_bb.y + dog_bb.height - 20;

// block.attr({
//   fill: "rgb(236, 240, 241)",
//   stroke: "#1f2c39",
//   strokeWidth: 3
// });

var text1 = s.text(dog_bb.x, captionHeight, phrases);

var t = new Snap.Matrix() 
t.translate(0, 35); 
t.rotate(5, 0, 40); 
text1.attr({"font-size":40});
text1.transform(t);

// TODO: make different lines slant differently
text1.selectAll("tspan").forEach(function(tspan, i){
      tspan.attr({x:0,y:captionHeight+45*(i+1)});
   });

// text1.select('tspan:nth-of-type(2)').attr({transform: 'rotate(10 x y'});

// block.attr({
//   width: (text1.node.clientWidth + 50)
// });






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

