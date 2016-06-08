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

var t = Snap("#text-container");

var capt = "ilovemydogalot";
var chars = capt.split('');
console.log(chars);
var a;

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
    t.append(name);
  });
}


for (var i = 0; i < chars.length; i++) {
  loadAlphabetLetter(chars[i]);
}



// Snap.load("svg/svg_alphabet/a.min.svg", function(response) {
//   a = response;
//   var singleObj = {};
//   singleObj['type'] = 'letter';
//   singleObj['value'] = a;
//   this.alphabet.push(singleObj);
//   console.log(singleObj);
// });

// console.log(this.alphabet[0]);

// Snap.load("svg/svg_alphabet/b.min.svg", function(response) {
//   var b = response;
//   t.append(b);
// });

// Snap.load("svg/svg_alphabet/c.min.svg", function(response) {
//   var c = response;
//   t.append(c);
// });

// Snap.load("svg/svg_alphabet/d.min.svg", function(response) {
//   var d = response;
//   t.append(d);
// });

// Snap.load("svg/svg_alphabet/e.min.svg", function(response) {
//   var e = response;
//   t.append(e);
// });

// Snap.load("svg/svg_alphabet/f.min.svg", function(response) {
//   var f = response;
//   t.append(f);
// });

// Snap.load("svg/svg_alphabet/g.min.svg", function(response) {
//   var g = response;
//   t.append(g);
// });

// Snap.load("svg/svg_alphabet/h.min.svg", function(response) {
//   var h = response;
//   t.append(h);
// });

// Snap.load("svg/svg_alphabet/i.min.svg", function(response) {
//   var i = response;
//   t.append(i);
// });

// Snap.load("svg/svg_alphabet/j.min.svg", function(response) {
//   var j = response;
//   t.append(j);
// });

// Snap.load("svg/svg_alphabet/k.min.svg", function(response) {
//   var k = response;
//   t.append(k);
// });

// Snap.load("svg/svg_alphabet/l.min.svg", function(response) {
//   var l = response;
//   t.append(l);
// });

// Snap.load("svg/svg_alphabet/m.min.svg", function(response) {
//   var m = response;
//   t.append(m);
// });

// Snap.load("svg/svg_alphabet/n.min.svg", function(response) {
//   var n = response;
//   t.append(n);
// });

// Snap.load("svg/svg_alphabet/o.min.svg", function(response) {
//   var o = response;
//   t.append(o);
// });

// Snap.load("svg/svg_alphabet/p.min.svg", function(response) {
//   var p = response;
//   t.append(p);
// });