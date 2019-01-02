var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var stars = {};
var adjustmentPoint = [0, 0];

var mousecoords = [];

var DENSITY = 5; // "per square inch" or something maybe
makeStars(DENSITY);

$("#starfield").mousemove(function(evt) {
  mousecoords = [evt.clientX, evt.clientY];
  adjustmentPoint = [
    (mousecoords[0] - canvas.width / 2) / 100,
    (mousecoords[1] - canvas.height / 2) / 100
  ];
});

function makeStars(DENSITY) {
  var totalStars =
    Math.floor(canvas.width / 72) * Math.floor(canvas.height / 72) * DENSITY;

  var randomX, randomY, randomZ;
  var sortable = [];
  for (var i = 0; i < totalStars; i++) {
    randomX = Math.random() * (canvas.width - 1) + 1;
    randomY = Math.random() * (canvas.height - 1) + 1;
    randomZ = Math.random() * 5;
    stars[i] = [randomX, randomY, randomZ];
    sortable.push(randomZ);
  }
  sortable.sort();

  for (var i in stars) {
    stars[i][2] = sortable[i];
  }
}

requestAnimationFrame(drawStars);
function drawStars() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#FF0000";
  for (var i in stars) {
    context.fillStyle = randColor();
    context.fillRect(stars[i][0], stars[i][1], stars[i][2], stars[i][2]);
  }
  updateStars();
  requestAnimationFrame(drawStars);
}
function updateStars() {
  for (var i in stars) {
    stars[i][0] += adjustmentPoint[0] * stars[i][2] / 10;
    stars[i][1] += adjustmentPoint[1] * stars[i][2] / 10;
    if (stars[i][0] >= canvas.width) {
      stars[i][0] = -5;
    }
    if (stars[i][1] >= canvas.height) {
      stars[i][1] = -5;
    }
    if (stars[i][0] < -6) {
      stars[i][0] = canvas.width;
    }
    if (stars[i][1] < -6) {
      stars[i][1] = canvas.height;
    }
  }
}

function randColor() {
  var colors = ["#FF0021", "#FF7630", "#FFFA51", "#00B951", "#0075F7"];
  var i = Math.floor(Math.random() * 5);
  return colors[i];
}