/*---------------------------
TO CHANGE THE DATE YOU ONLY NEED TO CHANGE THIS
LOOK UP JS DATE CONSTRUCTOR
----------------------------*/
var end = new Date(2019, 4, 31, 17, 30); //  <---SIMPLE EDIT HERE BOIS

//difference in ms
var difference = 0;

//calculate the time between 2 dates
Date.daysBetween = function(date1, date2) {
  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  difference = difference_ms;
  //take out milliseconds
  var ms = difference_ms % 1000;
  difference_ms = difference_ms / 1000;
  //seconds
  var seconds = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  //minutes
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  //hours
  var hours = Math.floor(difference_ms % 24);
  //dayys
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

//add leading zeros so it prints well
function pad(str, max) {
  return str.toString().length < max ? pad("0" + str, max) : str;
}

//run this finction every 10ms
window.setInterval(function() {
  update();
}, 10);

//re-range given two ranges
function convertRange(value, r1, r2) {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
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

//use the date now and end to find tim left
function update() {
  var show = Date.daysBetween(new Date(), end);
  if (show[0] < 0) {
    show = show.map(x => x * -1);
    show[0] = -1 * show[0];
  }
  show = show.map(x => pad(x, 2));
  //write it out
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
  var min = difference / (1000 * 60)
  var hour = min / 60
  var deg = show[3]
  //days = b;
  var colorScale = [0, 255];
  var dayScale = [0, 380];
  //so i dont have to compute the trig functions every time
  currMin = -1;
  if (currMin != min){
    console.log("trig");
    greenVal = Math.sin((days / 1800) * min);
    blueVal = Math.cos((days / 200) * hour);
    currMin = min;
  }
  //control the bachground in a very complicated manner <<-- DONT BE AFRAID TO PULL REQUEST IF YOU CAN DO SOMETHING BETTER
  var bg = "radial-gradient(circle at bottom, rgba(" +

    Math.abs(255 -
      convertRange(days, dayScale, colorScale)
    ) + "," +

    convertRange(greenVal, [-1, 1], colorScale) + "," +

    Math.abs(255 -
      convertRange(blueVal, [-1, 1], colorScale)
    ) + ",1)" + " " +

    (days + 1) + "%, #000020 " + 100 + "%, #000000 100%)";

  document.documentElement.style.background = bg;
  //console.log(bg);
}
