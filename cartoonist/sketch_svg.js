var s = Snap(800,800);
s.attr({ viewBox: "0 0 600 600" });

var dog = Snap.load("svg/dog.svg", function(f) {
  var g = f.select("g");
  s.append(g);
  g.drag();
});
