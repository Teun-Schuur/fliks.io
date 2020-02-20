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
  if (Array.isArray(r)) {
    ctx.fillStyle = "rgb(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
  } else {
    if (g != null && b != null) {
      ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    } else {
      ctx.fillStyle = "rgb(" + r + ", " + r + ", " + r + ")";
    }
  }
}

function drawTriangle(PosX, PosY, radius, rotate) {
  ctx.save();
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
  // ctx.setTransform(1, 0, 0, 1, 0, 0); // reset the transform
  ctx.restore()
  return true;
}

function clamp(value, min, max) {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
}

function lineWeight(width) {
  ctx.lineWidth = width;
}

function transform(x, y) {
  ctx.setTransform(1, 0, 0, 1, x, y);
}

function rectPoint(x, y, w, h, px, py) {
  return (px > x && px < x + w && py > y && py < y + h)
}
