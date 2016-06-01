var amaticBold, amaticRegular, jinky, trashHand;

// Preload all fonts.
function preload() {
  amaticBold = loadFont("assets/amatic/Amatic-Bold.ttf");
  amaticRegular = loadFont("assets/amatic/AmaticSC-Regular.ttf");
  jinky = loadFont("assets/Jinky/JINKY.ttf");
  trashHand = loadFont("assets/TrashHand/TrashHand.ttf");
}

function setup() {
  createCanvas(720, 400);
  stroke(255);
  noFill();
}

/* Define parts of figure */

var head = {
  x1: 290,
  y1: 80,
  x2: 350,
  y2: 80,
  x3: 350,
  y3: 130,
  x4: 300,
  y4: 140,
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
};

/* Main draw function */
function draw() {
  background(0);
  for (var i = 0; i < 200; i += 20) {
    bezier(hairs.x1, hairs.y1, hairs.x2, hairs.y2, hairs.x3, hairs.y3, hairs.x4 + (i), hairs.y4 + (i/5));
  }

  quad(head.x1, head.y1, head.x2, head.y2, head.x3, head.y3, head.x4, head.y4);



  s = "Imagine you're reading a really really cool and funny caption.";
  fill(255);
  textFont(trashHand);
  textSize(30);
  textLeading(25);
  text(s, 20, 10, 200, 300); // Text wraps within text box
}