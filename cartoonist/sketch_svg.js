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
s.attr({ viewBox: "0 0 600 600" });

eyeAnimation();

function eyeAnimation(){
  eye.stop().animate(
    { transform: 'r90,256,256'},
    1000,
    function(){
      eye.attr({ transform: 'rotate(256,256,256'});
      eyeAnimation();
    });
}


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