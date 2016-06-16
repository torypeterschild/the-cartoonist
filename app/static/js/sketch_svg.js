var toadie;
var s = new Snap("#dog-container");

// $(function() {
//     $('input').click(function() {
//         var capt = $('#keyword').text();
//         console.log("the keyword is" + capt);
//         $.ajax({
//             url: '/',
//             data: $('form').serialize(),
//             type: 'GET',
//             success: function(response) {
//                 alert("success");
//                 console.log(response);
//             },
//             error: function(error) {
//                 console.log(error);
//             }
//         });
//     });
// });


// $(function() {
//     $("#searchbar").on("submit", function (e) {
//       console.log("inside ajax");
//       e.preventDefault();
//       var keyword_js = $("#keyword").val();
//         console.log("the keyword is" + keyword_js);
//         var caption = $.post(
//           "~/caption_builder.py", 
//           {
//             keyword: keyword_js
//           },
//           function(){
//             // console.log(keyword_js);
//             // console.log(caption);
//           });
//     });         
// });



function preload() {
  toadie = loadFont("../static/fonts/toadie_xy.ttf");
}

$("#caption").css({display: "block"});
$("#caption").css({"font-family": "toadie_xy"});
$("#caption").css({"font-size": "30px"});

var dog = Snap.select('#dog'),
  dogStartMatrix = new Snap.Matrix(),
  dogMidMatrix = new Snap.Matrix();
// console.log(dog);
var eye = dog.select('#eye');
var tail = dog.select('#tail');
var tailShading = dog.select('#tailShading');
var ear = dog.select('#ear');
var earShading = dog.select('#earShading');
var snoutOutline = dog.select('#snoutOutline');
var lowerSnoutShading = dog.select('#lowerSnoutShading');
var backFoot = dog.select('#backFoot');


function setup() {
  createCanvas(720,700);
  stroke(0);
}


function draw() {
  var caption = "This is the caption";
  
  // var s = "here is my little doggie\nAND a CAPTION!\n! ?? $";
  // if(typeof caption === undefined){
  //   console.log("Caption is undefined");
  //   caption = "This is the caption error)";
  // } else {
  //   console.log("Caption is defined");
  //   console.log(caption);
  // }

  // textFont(toadie);
  // textSize(20);
  // textLeading(40);
  // text(caption, 10, 10, 500, 500);
}

// tailAnimation();
// tailShadingAnimation();
// eyeAnimation();
// earAnimation()
// earShadingAnimation();
// backFootAnimation();
// snoutOutlineAnimation();


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


function tailAnimation(){
  tail.stop().animate(
    { transform: 't5,15'},
    1000,
    mina.easeinout(),
    function(){
      tail.attr({ transform: 'rotate(0 256 256'},
        1000,
        mina.easeinout());
      tailAnimation();
    }
  );
}


function backFootAnimation(){
  backFoot.stop().animate(
    { transform: 't5,0'},
    1000,
    mina.bounce,
    function(){
      backFoot.attr({ transform: 'rotate(0 256 256'});
      backFootAnimation();
    }
  );
}


function tailShadingAnimation(){
  tailShading.stop().animate(
    { transform: 't5,15'},
    1000,
    mina.bounce,
    function(){
      tailShading.attr({ transform: 'rotate(0 256 256'});
      tailShadingAnimation();
    }
  );
}


function earAnimation(){
  ear.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      ear.attr({ transform: 'rotate(0 256 256'});
      earAnimation();
    }
  );
}


function earShadingAnimation(){
  earShading.stop().animate(
    { transform: 't0,3'},
    1000,
    mina.bounce,
    function(){
      earShading.attr({ transform: 'rotate(0 256 256'});
      earShadingAnimation();
    }
  );
}


function snoutOutlineAnimation(){
  snoutOutline.stop().animate(
    { transform: 't0,3'},
    500,
    mina.bounce,
    function(){
      snoutOutline.attr({ transform: 'rotate(0 256 256'});
      snoutOutlineAnimation();
    }
  );
}

