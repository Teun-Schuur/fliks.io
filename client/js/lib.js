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

function clearScreen(backround = 180) {
  // ctx.clearRect(0, 0, WIDTH, HEIGHT);
  fill(backround)
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

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

function clamp(value, min, max) {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.closePath();
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

function ID() {
  return Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 5);
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function hp_bar(hp) {
  var x = WIDTH / 8;
  var w = WIDTH - WIDTH / 4;
  var y = HEIGHT - 60;
  var h = 40;
  var length = map(hp, 0, 100, 0, w - 20);
  fill(100, 100, 100);
  rect(x, y, w, h);
  fill(255, 0, 0)
  rect(x + 10, y + 10, length, h - 20);
}

function rectCol(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 + w1 >= x2 &&
    x1 <= x2 + w2 &&
    y1 + h1 >= y2 &&
    y1 <= y2 + h2) {
    return true;
  } else {
    return false;
  }
}
