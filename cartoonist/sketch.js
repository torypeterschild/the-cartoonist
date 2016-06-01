var amaticBold, amaticRegular, jinky, trashHand;
var fr = 30;

// Preload all fonts.
function preload() {
  amaticBold = loadFont("assets/amatic/Amatic-Bold.ttf");
  amaticRegular = loadFont("assets/amatic/AmaticSC-Regular.ttf");
  jinky = loadFont("assets/Jinky/JINKY.ttf");
  trashHand = loadFont("assets/TrashHand/TrashHand.ttf");
}

function setup() {
  createCanvas(720, 400);
  frameRate(fr);
  stroke(255);
  noFill();
}

/*
Define parts of figure 
*/

var head = {
  x1: 290,
  y1: 80,
  x2: 350,
  y2: 80,
  x3: 350,
  y3: 130,
  x4: 300,
  y4: 140,
  draw: function() {
    noFill();
    quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
  }
};

var eyes = {
  x: (head.x1 + head.x2)/2,
  y: head.y1 + 20,
  radiusX: (head.x2-head.x1)/6,
  radiusY: (head.y3-head.y4)*2,
  draw: function() {
    ellipse(this.x-10, this.y, this.radiusX, this.radiusY);
    ellipse(this.x+10, this.y, this.radiusX, this.radiusY);
  }
};

var pupils = {
  x: eyes.x,
  y: eyes.y+3,
  radiusX: eyes.radiusX/3,
  radiusY: eyes.radiusY/3,
  draw: function() {
    fill(255);
    ellipse(this.x-10, this.y, this.radiusX, this.radiusY);
    ellipse(this.x+10, this.y, this.radiusX, this.radiusY);
  }
};

var hairs = {
  x1: (head.x1 + head.x2)/2,
  y1: head.y1,
  x2: head.x1,
  y2: head.y1 - 20,
  x3: head.x2,
  y3: head.y1 - 25,
  x4: head.x1,
  y4: head.y1 - 20,
  draw: function() {
    noFill();
    for (var i = 0; i < 200; i += 20) {
      bezier(this.x1, this.y1, this.x2 + (i/2), this.y2 - (i/2), this.x3, this.y3, this.x4 + (mouseX/2), this.y4 - (mouseY/10));
    }
  }
};

var torso = {
  x1: (head.x3 + head.x4)/2,
  y1: head.y4,
  x2: head.x3,
  y2: head.y4 + 90,
  x3: head.x4,
  y3: head.y4 + 80,
  draw: function() {
    noFill();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
};

var legs = {
  x1: (torso.x2 + torso.x3)/2,
  y1: torso.y3,
  x2: torso.x2,
  y2: torso.y2 + 40,
  x3: (torso.x2 + torso.x3)/2 - 10,
  y3: torso.y3,
  x4: torso.x3,
  y4: torso.y2 + 40,
  draw: function() {
    noFill();
    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x3, this.y3, this.x4, this.y4);
  }
};

var feet = {
  x1: legs.x2,
  y1: legs.y2,
  x2: legs.x4,
  y2: legs.y4,
  draw: function() {
    noFill();
    quad(this.x1, this.y1, this.x1 + 5, this.y1, this.x1 + 5, this.y1 + 5, this.x1, this.y1 + 5);
    quad(this.x2, this.y2, this.x2 - 5, this.y2, this.x2 - 5, this.y2 + 5, this.x2, this.y2 + 5);
  }
};

var arms = {
  x1: torso.x1 + 10,
  y1: torso.y1 + 40,
  x2: torso.x1 + 40,
  y2: torso.y1 + 30,
  x3: torso.x1 - 10,
  y3: torso.y1 + 40,
  x4: torso.x1 - 40,
  y4: torso.y1 + 30,
  draw: function() {
    noFill();
    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x3, this.y3, this.x4, this.y4);
  }
};

var hands = {
  x1: arms.x2,
  y1: arms.y2,
  x2: arms.x4,
  y2: arms.y4,
  draw: function() {
    quad(this.x1, this.y1, this.x1 + 5, this.y1, this.x1 + 5, this.y1 + 5, this.x1, this.y1 + 5);
    quad(this.x2, this.y2, this.x2 - 5, this.y2, this.x2 - 5, this.y2 + 5, this.x2, this.y2 + 5);
  }
};

/* Main draw function */
function draw() {
  background(0);

  // Draw each part
  eyes.draw();
  pupils.draw();
  head.draw();
  hairs.draw();
  torso.draw();
  arms.draw();
  legs.draw();
  hands.draw();
  feet.draw();

  // Render text
  s = "Imagine you're reading a really really cool and funny caption.";
  fill(255);
  textFont(trashHand);
  textSize(30);
  textLeading(25);
  text(s, 20, 10, 200, 300); // Text wraps within text box
}


