
/* Global variables */
var svgDiv = document.querySelector("#pythonSVG");
var paper = new Snap("#drawn");
console.log("Paper");
console.log(paper);


/*--------------
  RADIO BUTTONS
 --------------*/

// var currentValue = 2;

// function handleClick(myRadio) {
//   currentValue = myRadio.value;
//   localStorage.setItem('dType',currentValue);
//   display();
//   document.location.href="/input";
//   if (currentValue == 1) {
//     console.log("TRUE VAL IS 1");
//   } else if (currentValue == 2) {
//     console.log("ELSE");
//   }
// }


// function display() {
//   drawingType = localStorage.getItem('dType');
//   if (drawingType == 1) {
//     console.log("type: DOG");
//     origDrawing.style.display = "none";
//     dogDrawing.style.display = "block";
//   } else if (drawingType == 2) {
//     console.log("type: CIRCLE");
//     origDrawing.style.display = "block";
//     dogDrawing.style.display = "none";
//   }
// }


/*--------
  HELPERS
 --------*/

/* Call after POST to create new caption object */
// function makeSavedCaption() {
//   console.log("IN MAKE SAVED CAPTION");
//   var savedCaptionText = $("#captionsave").text();
//   var savedCaption = new Caption(savedCaptionText);
//   console.log("saved caption after ajax: " + savedCaption.toString());
//   // savedCaption.writeInSnapD();
//   // savedCaption.writeInSnapS();
//   savedCaption.writeInSnapP();
// }


/*-------------------------
  RENDER CAPTION
 -------------------------*/

console.log("CAPTIONLINES LEN: " + captionLines.length);

if (Boolean(paper)) {
  var m = new Snap.Matrix();
  paper_bb = paper.getBBox();
  m.rotate(tilt, this.paper_bb.cx, this.paper_bb.y2);
  var newCap = paper.text(paper_bb.x, paper_bb.y2+50, captionLines);
  newCap.attr({"font-size":50});
  newCap.transform(m);
  var h = this.paper_bb.y2;
  newCap.selectAll("tspan").forEach(function(tspan, i){
    tspan.attr({x:0 + i,y:h+50*(i+1)});
  });
}  


/* This saves SVG file (without caption) */
$('#SVGsave').click(function(){
    var a      = document.createElement('a');
    a.href     = 'data:image/svg+xml;utf8,' + unescape($('#dog')[0].outerHTML);
    a.download = 'cartoon.svg';
    a.target   = '_blank';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
});

/*
 TODO: buttons should appear below caption 
*/

/* Renders cartoon and caption in save-cartoon template */
$('#savecartoon').click(function(){
  var value = $("#caption").text()
  console.log("VALUE IS " + value);
  $.ajax({
    type: "POST",
    url: "/save-cartoon",
    data: JSON.stringify(value),
    success: function(msg){
      console.log("success");
    },
    failure: function(msg){
      console.log("failure");
    }
  });
});

/* Generate caption on save-cartoon.html page */
// makeSavedCaption();





