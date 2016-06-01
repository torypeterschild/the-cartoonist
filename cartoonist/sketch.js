var amaticBold, amaticRegular, jinky;

function preload() {
  amaticBold = loadFont("assets/amatic/Amatic-Bold.ttf");
  amaticRegular = loadFont("assets/amatic/AmaticSC-Regular.ttf");
  jinky = loadFont("assets/Jinky/JINKY.ttf");
}

function setup() {
  createCanvas(720, 400);
  stroke(255);
  noFill();
}

function draw() {
  background(0);
  for (var i = 0; i < 200; i += 20) {
    bezier(mouseX-(i/2.0), 40+i, 410, 20, 440, 300, 240-(i/16.0), 300+(i/8.0));
  }

  s = "Imagine you're reading a really really cool and funny caption.";
  fill(255);
  textFont(amaticRegular);
  textSize(30);
  text(s, 20, 10, 150, 150); // Text wraps within text box
}