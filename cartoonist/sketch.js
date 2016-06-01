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
  width: 50,
  height: 20,
  x1: 290,
  y1: 80,
  x2: 350,
  y2: 80,
  x3: 350,
  y3: 130,
  x4: 300,
  y4: 140,
};

/* Main draw function */
function draw() {
  background(0);
  for (var i = 0; i < 200; i += 20) {
    bezier(mouseX-(i/2.0), 40+i, 410, 20, 440, 300, 240-(i/16.0), 300+(i/8.0));
  }

  quad(head.x1, head.y1, head.x2, head.y2, head.x3, head.y3, head.x4, head.y4);



  s = "Imagine you're reading a really really cool and funny caption.";
  fill(255);
  textFont(trashHand);
  textSize(30);
  textLeading(25);
  text(s, 20, 10, 200, 300); // Text wraps within text box
}