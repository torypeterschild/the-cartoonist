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

// function raysAnimation(){
//     sunRays.stop().animate(
//       { transform: 'r90,256,256'}, // Basic rotation around a point. No frills.
//       10000, // Nice slow turning rays
//       function(){ 
//         sunRays.attr({ transform: 'rotate(0 256 256)'}); // Reset the position of the rays.
//         raysAnimation(); // Repeat this animation so it appears infinite.
//       }
//     );
  
//   }

// function frontlegAnimation(){
//   frontleg.stop()
// }



// var dog = s.select('.dog'),
//   dogStartMatrix = new Snap.Matrix(),
//   dogMidMatrix = new Snap.Matrix();

// dogStartMatrix.rotate(10);
// dogStartMatrix.translate(0,-50);
// dogMidMatrix.rotate(-15);
// dogMidMatrix.translate(300,-20);

dog.animate({
  transform: dogStartMatrix
}, 1250, mina.easeinout, function() {
  dog.animate({
    transform: dogMidMatrix
  }, 250);
});

// Snap.load("svg/dog_01.svg", function(response) {
//   var dog = response;
//   s.append(dog);
//   // s.append(g);
//   // g.drag();
//   s.drag();
// });

var hoverover = function() { dog.animate({ transform: 's2r45,150,150' }, 1000, mina.bounce ) };
var hoverout = function() { dog.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce ) };