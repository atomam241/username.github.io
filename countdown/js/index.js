var last = 1;
//end date
var end = new Date(2017, 5, 2, 17)
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

  return [pad(days, 2), pad(hours, 2), pad(minutes, 2), pad(seconds, 2), pad(ms, 3)]
    //return "<span>" + pad(days, 2) + ":" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + ":" + pad(ms, 4) + "</span><br><span>TO GRADUATION</span>";
}

function pad(str, max) {
  return str.toString().length < max ? pad("0" + str, max) : str;
}

window.setInterval(function() {
  update();
}, 1);

function update() {
  var days = 99 - (Math.abs(Date.daysBetween(new Date(), end)[0]));
  if(days >= 255 || days < 0){
    days = 254;
  }
  document.getElementById("title").innerHTML = "<span>" + Date.daysBetween(new Date(), end)[0] + ":" + Date.daysBetween(new Date(), end)[1] + ":" + Date.daysBetween(new Date(), end)[2] + ":" + Date.daysBetween(new Date(), end)[3] + ":" + Date.daysBetween(new Date(), end)[4] + "</span><br><span>TO GRADUATION</span>";
  document.documentElement.style.background = "radial-gradient(circle at bottom, #" + days.toString(16) + "" + 20 + "00 " + 10 + "%, #000020 " + 100 + "%, #000000 100%)"
    //console.log(last);
}
