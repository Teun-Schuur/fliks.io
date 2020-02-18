var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const {
  resizeCanvas,
  clearScreen,
  fill,
  drawTriangle
} = require('./lib');
resizeCanvas();
var socket = io();

socket.on("newPositions", function(data) {
  clearScreen();
  fill(255, 0, 0)
  for (var j = 0; j < data.length; j++) {
    drawTriangle(data[j].x, data[j].y, 40, data[j].angle);
  }
});



document.onkeydown = function(event) {
  if (event.keyCode === 68)
    socket.emit("keypress", {
      inputId: "right",
      state: true
    });
  else if (event.keyCode === 83)
    socket.emit("keypress", {
      inputId: "down",
      state: true
    });
  else if (event.keyCode === 65)
    socket.emit("keypress", {
      inputId: "left",
      state: true
    });
  else if (event.keyCode === 87)
    socket.emit("keypress", {
      inputId: "up",
      state: true
    });
};

document.onkeyup = function(event) {
  if (event.keyCode === 68)
    socket.emit("keypress", {
      inputId: "right",
      state: false
    });
  else if (event.keyCode === 83)
    socket.emit("keypress", {
      inputId: "down",
      state: false
    });
  else if (event.keyCode === 65)
    socket.emit("keypress", {
      inputId: "left",
      state: false
    });
  else if (event.keyCode === 87)
    socket.emit("keypress", {
      inputId: "up",
      state: false
    });
};
