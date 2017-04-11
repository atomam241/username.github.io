var last = 1;
var end = new Date(2017, 4, 26)
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

  //return "<span>" + days + " Days</span><br><span>" + hours + " Hours</span><br><span>" + minutes + " Minutes</span><br><span>" + seconds + " Seconds</span><br><span>To Graduation</span>";
  return "<span>" + pad(days, 2) + ":" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + ":" + pad(ms, 4) + "</span><br><span>TO GRADUATION</span>";
}

function pad(str, max) {
  return str.toString().length < max ? pad("0" + str, max) : str;
}

window.setInterval(function() {
  update();
}, 1);

function update() {
  document.getElementById("title").innerHTML = Date.daysBetween(new Date(), end);
  //console.log(last);
}