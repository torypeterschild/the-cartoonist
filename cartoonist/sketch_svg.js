var s = new Snap(800,800);

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

Snap.load("svg/svg_alphabet/a.min.svg", function(response) {
  var a = response;
  t.append(a);
});

Snap.load("svg/svg_alphabet/b.min.svg", function(response) {
  var b = response;
  t.append(b);
});
