var s = new Snap(800,800);

var dog = Snap.select('#dog'),
  dogStartMatrix = new Snap.Matrix(),
  dogMidMatrix = new Snap.Matrix();
console.log(dog);
var nose = dog.select('#nose');
var ear = dog.select('#ear');
var eye = dog.select('#eye');
var frontleg = dog.select('#frontleg');
var face = dog.select('#face');
var earandtail = dog.select('#earandtail');
var faceblob = dog.select('#faceblob');
// s.attr({ viewBox: "0 0 600 600" });

// var wholeEar = s.group(ear,earandtail);
// console.log(wholeEar);

eyeAnimation();
earAnimation();
innerEarAnimation();
faceAnimation();

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
}

function innerEarAnimation(){
  ear.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      ear.attr({ transform: 'rotate(0 256 256'});
      innerEarAnimation();
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
  nose.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      nose.attr({ transform: 'rotate(0 256 256'});
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