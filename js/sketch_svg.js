var s = new Snap("#dog-container");
var alphabet = [];

var dog = Snap.select('#dog'),
  dogStartMatrix = new Snap.Matrix(),
  dogMidMatrix = new Snap.Matrix();
console.log(dog);
var topOfNose = dog.select('#topOfNose');
var ear = dog.select('#ear');
var eye = dog.select('#eye');
var frontleg = dog.select('#frontleg');
var hindleg = dog.select('#hindleg');
var face = dog.select('#face');
var earandtail = dog.select('#earandtail');
var faceblob = dog.select('#faceblob');
var frontface = dog.select('#frontface');
var bodyandchin = dog.select('#bodyandchin');
var stomach = dog.select('#stomach');
var crookOfLeg = dog.select('#crookOfLeg');
var drumstick = dog.select('#drumstick');
var thigh = dog.select('#thigh');
var bottomline = dog.select('#bottomline');
var butt = dog.select('#butt');
var partOfEar = dog.select('#partOfEar');
// s.attr({ viewBox: "0 0 600 600" });

// var wholeEar = s.group(ear,earandtail);
// console.log(wholeEar);

eyeAnimation();
earAnimation();
bodyandchinAnimation();
faceAnimation();
frontlegAnimation();
hindlegAnimation();
thighAnimation();
stomachAnimation();
bottomlineAnimation();
buttAnimation();

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

function frontlegAnimation(){
  frontleg.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      frontleg.attr({ transform: 'rotate(0 256 256'});
      frontlegAnimation();
    }
  );
}

function hindlegAnimation(){
  hindleg.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      hindleg.attr({ transform: 'rotate(0 256 256'});
      hindlegAnimation();
    }
  );
}

function bottomlineAnimation(){
  bottomline.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      bottomline.attr({ transform: 'rotate(0 256 256'});
      bottomlineAnimation();
    }
  );
}

function buttAnimation(){
  butt.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      butt.attr({ transform: 'rotate(0 256 256'});
      buttAnimation();
    }
  );
}

function thighAnimation(){
  thigh.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      thigh.attr({ transform: 'rotate(0 256 256'});
      thighAnimation();
    }
  );
}

function stomachAnimation(){
  stomach.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      stomach.attr({ transform: 'rotate(0 256 256'});
      stomachAnimation();
    }
  );
}

function bodyandchinAnimation(){
  bodyandchin.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      bodyandchin.attr({ transform: 'rotate(0 256 256'});
      bodyandchinAnimation();
    }
  );
}

function earAnimation(){
  earandtail.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      earandtail.attr({ transform: 'rotate(0 256 256'});
      earAnimation();
    }
  );
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

function faceAnimation(){
  face.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      face.attr({ transform: 'rotate(0 256 256'});
      faceAnimation();
    }
  );
  faceblob.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      faceblob.attr({ transform: 'rotate(0 256 256'});
      faceAnimation();
    }
  );
  frontface.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      frontface.attr({ transform: 'rotate(0 256 256'});
      faceAnimation();
    }
  );
  topOfNose.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      topOfNose.attr({ transform: 'rotate(0 256 256'});
      faceAnimation();
    }
  );
}



var capt = "ilovemydogalot";
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

for (var i = 0; i < chars.length; i++) {
  loadAlphabetLetter(chars[i]);
}

for (var j = 0; j < listOfLetters.length; j++) {
  console.log("inside append loop");
  console.log(listOfLetters[j]);
  t.append(listOfLetters[j]);
}

// loadCaption(capt);



// Snap.load("svg/svg_alphabet/a.min.svg", function(response) {
//   a = response;
//   var singleObj = {};
//   singleObj['type'] = 'letter';
//   singleObj['value'] = a;
//   this.alphabet.push(singleObj);
//   console.log(singleObj);
// });

// console.log(this.alphabet[0]);
