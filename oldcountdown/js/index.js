var last = 1;
var end = new Date(2019, 4, 31, 17, 30);
Date.daysBetween = function(date1, date2) {
  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  //take out milliseconds
  var ms = difference_ms % 1000;
  difference_ms = difference_ms / 1000;
  var seconds = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var hours = Math.floor(difference_ms % 24);
  var days = Math.floor(difference_ms / 24);

  return [
    pad(days, 2),
    pad(hours, 2),
    pad(minutes, 2),
    pad(seconds, 2),
    pad(ms, 3)
  ];
  //just a test
  //return "<span>" + pad(days, 2) + ":" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + ":" + pad(ms, 4) + "</span><br><span>TO GRADUATION</span>";
};

function pad(str, max) {
  return str.toString().length < max ? pad("0" + str, max) : str;
}

window.setInterval(function() {
  update();
}, 1);

function convertRange( value, r1, r2 ) {
    return ( value - r1[0] ) * ( r2[1] - r2[0] ) / ( r1[1] - r1[0] ) + r2[0];
}

// window.setInterval(function() {
//   test();
// }, 100);
// var b = 0;
// function test(){
//   if(b < 0){
//     b = 380;
//   }else{
//     b -= 1;
//   }
// }

function update() {
  var show = Date.daysBetween(new Date(), end);
  if (show[0] < 0) {
    show = show.map(x => x * -1);
    show[0] = -1 * show[0];
  }
  show = show.map(x => pad(x, 2));
  document.getElementById("content").innerHTML =
    "<h1>" +
    show[0] +
    ":" +
    show[1] +
    ":" +
    show[2] +
    ":" +
    show[3] +
    ":" +
    pad(show[4], 4) +
    "</h1><h3>TO GRADUATION</h3>";
    var days = Math.abs(show[0]);
    //days = b;
    var colorScale = [0, 255];
    var dayScale = [0, 380];
    var bg = "radial-gradient(circle at bottom, rgba(" + Math.abs(255 - convertRange(days, dayScale, colorScale)) + "," + Math.abs(convertRange(Math.sin(.01 * Math.pow(days, 2)), [-1,1], colorScale)) + "," + convertRange(days, dayScale, colorScale) + ",1)" + " " + days + "%, #000020 " + 100 + "%, #000000 100%)";
  document.documentElement.style.background = bg;
  console.log(bg);
}
