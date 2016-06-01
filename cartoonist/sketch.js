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
  y: eyes.y,
  radiusX: eyes.radiusX/3,
  radiusY: eyes.radiusY/3,
  draw: function() {
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
    for (var i = 0; i < 200; i += 20) {
      bezier(this.x1, this.y1, this.x2 + (i/2), this.y2 - (i/2), this.x3, this.y3, this.x4 + (mouseX/2), this.y4 - (mouseY/10));
    }
  }
};

/* Main draw function */
function draw() {
  background(0);
  // for (var i = 0; i < 200; i += 20) {
  //   bezier(hairs.x1, hairs.y1, hairs.x2 + (i/2), hairs.y2 - (i/2), hairs.x3, hairs.y3, hairs.x4 + (mouseX/2), hairs.y4 - (mouseY/10));
  // }
  // Draw each part
  eyes.draw();
  pupils.draw();
  head.draw();
  hairs.draw();

  // Render text
  s = "Imagine you're reading a really really cool and funny caption.";
  fill(255);
  textFont(amaticRegular);
  textSize(30);
  textLeading(25);
  text(s, 20, 10, 200, 300); // Text wraps within text box
}


