var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
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

function resizeCanvas() {
  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  WIDTH = canvas.width;
  HEIGHT = canvas.height;
}

function clearScreen() {
  fill(180)
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function fill(r, g, b) {
  if (g != null && b != null) {
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
  } else {
    ctx.fillStyle = "rgb(" + r + ", " + r + ", " + r + ")";
  }
}

function drawTriangle(PosX, PosY, radius, rotate) {
  ctx.setTransform(1, 0, 0, 1, PosX, PosY); // Set position
  ctx.rotate(rotate); // set rotation in radians
  ctx.beginPath();
  var sides = 3;
  var a = (Math.PI * 2) / sides;
  ctx.moveTo(radius, 0);

  for (var i = 1; i < sides + 1; i++) {
    ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
  }

  ctx.closePath();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset the transform
  return true;
}
