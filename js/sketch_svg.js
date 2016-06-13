
var toadie;
var s = new Snap("#dog-container");

function preload() {
  toadie = loadFont("css/fonts/toadie_xyy.ttf");
}

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

// s.attr({ viewBox: "0 0 600 600" });

function setup() {
  createCanvas(720,700);
  stroke(0);
}

function draw() {
  var s = "here is #* & ß my --little doggie\nHERE IS MY DOG\n! ?? $";
  textFont(toadie);
  textSize(20);
  textLeading(40);
  text(s, 10, 10, 500, 500);
}

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

var capt = "caption time";
var chars = capt.split('');
var t = Snap('#text-container');
console.log(chars);
var a;
var listOfLetters = [];

function loadAlphabetLetter(letter) {
  var path;
  if (letter === " ") {
    path = "svg/svg_alphabet/blank.svg";
  } else {
    path = "svg/svg_alphabet/" + letter + ".min.svg";
  }
  var name = letter;
  Snap.load(path, function(response) {
    name = response;
    listOfLetters.push(name);
    console.log(listOfLetters);
    t.append(name);
  });
}

// function loadCaption(caption) {
//   var listOfLetters = [];
//   chars = caption.split('');
//   console.log(chars);

//   function loadAlphabetLetter(letter) {
//     var path;
//     console.log("Inside load alph letter");
//     console.log(letter);
//     if (letter === " ") {
//       path = "svg/svg_alphabet/blank.svg";
//     } else {
//       console.log("inside else");
//       path = "svg/svg_alphabet/" + letter + ".min.svg";
//     }
//     console.log("path");
//     console.log(path);
//     var name = letter;
//     Snap.load(path, function(response) {
//       name = response;
//       listOfLetters.push(name);
//       console.log(listOfLetters);
//     });
//   }

//   function appendLetters(list) {
//     for (var j = 0; j < list.length; j++) {
//       t.append(listOfLetters[j]);
//       console.log(t);
//     }
//   }

//   for (var i = 0; i < chars.length; i++) {
//     loadAlphabetLetter(chars[i]);
//   }

//   var t = Snap("#text-container");
//   t.appendLetters(listOfLetters);

// }



// for (var i = 0; i < chars.length; i++) {
//   loadAlphabetLetter(chars[i]);
// }

// for (var j = 0; j < listOfLetters.length; j++) {
//   console.log("inside append loop");
//   console.log(listOfLetters[j]);
//   t.append(listOfLetters[j]);
// }

