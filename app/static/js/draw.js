
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

// if (Boolean(paper)) {
//   var m = new Snap.Matrix();
//   paper_bb = paper.getBBox();
//   m.rotate(tilt, this.paper_bb.cx, this.paper_bb.y2);
//   var newCap = paper.text(paper_bb.x, paper_bb.y2+50, captionLines);
//   newCap.attr({"font-size":50});
//   newCap.transform(m);
//   var h = this.paper_bb.y2;
//   newCap.selectAll("tspan").forEach(function(tspan, i){
//     tspan.attr({x:0 + i,y:h+50*(i+1)});
//   });
// }  


/* This saves SVG file (without caption) */
$('#SVGsave').click(function(){
    var a      = document.createElement('a');
    a.href     = 'data:image/svg+xml;utf8,' + unescape($('#dog')[0].outerHTML);
    a.download = 'cartoon.svg';
    a.target   = '_blank';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
});

/* Renders cartoon and caption in save-cartoon template */
// $('#savecartoon').click(function(){
//   // var capt = $("#caption").text();
//   var drawing = $('#pythonSVGWRITE').html();
//   console.log("VALUE IS " + drawing);
//   $.ajax({
//     type: "POST",
//     url: "/savecartoon",
//     data: JSON.stringify(drawing),
//     success: function(msg){
//       console.log("success");
//     },
//     failure: function(msg){
//       console.log("failure");
//     }
//   });
// });

/* TODO: REFACTOR SAVE FUNCTIONALITY */
/* Generate caption on save-cartoon.html page */
// makeSavedCaption();

