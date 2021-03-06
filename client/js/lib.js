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

function getColor(r, g, b) {
  if (Array.isArray(r)) {
    ctx.fillStyle = "rgb(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
  } else {
    if (g != null && b != null) {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    } else {
      return "rgb(" + r + ", " + r + ", " + r + ")";
    }
  }
}

function drawTriangle(PosX, PosY, radius, rotate, col) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, PosX, PosY); // Set position
  ctx.rotate(rotate); // set rotation in radians
  ctx.shadowBlur = 22;
  ctx.shadowColor = col;
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

function rect(x, y, w, h, fill = true) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  if (fill)
    ctx.fill();
}

function clamp(value, min, max) {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

function circle(x, y, r, fill = true) {
  ctx.beginPath();
  if (!fill) {
    ctx.save();
    ctx.lineWidth = "3";
    ctx.strokeStyle = getColor(255, 255, 255);
  }
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  if (fill)
    ctx.fill();
  else {
    ctx.stroke();
    ctx.restore();
  }
}

function getAngle(xSpeed, ySpeed) {
  // return Math.atan(ys / xs)
  let angle = 0;
  if (ySpeed !== 0 && xSpeed !== 0) {
    angle = Math.atan(ySpeed / xSpeed);
    if (xSpeed < 0) {
      angle += Math.PI;
    }
  } else if (ySpeed === 0 && Math.abs(xSpeed) > 0.1) {
    angle = xSpeed > 0 ? 0 : (Math.PI / 180) * 180;
  } else if (xSpeed === 0 && Math.abs(ySpeed) > 0.1) {
    angle = ySpeed > 0 ? (Math.PI / 180) * 90 : (Math.PI / 180) * 270;
  }
  return angle;
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

function ID(length = 10) {
  return Math.random().toString(36).substr(2, length)
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function hp_bar(hp) {
  var x = WIDTH / 8;
  var w = WIDTH - WIDTH / 5;
  var y = HEIGHT - 40;
  var h = 25;
  var length = map(hp, 0, 100, 0, w - 10);
  fill(100, 100, 100);
  rect(x, y, w, h);
  fill(255, 0, 0)
  rect(x + 5, y + 5, length, h - 10);
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

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} heights The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  } else {
    var defaultRadius = {
      tl: 0,
      tr: 0,
      br: 0,
      bl: 0
    };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function circlePoint(cx, cy, cr, px, py) {
  return ((px - cx) ** 2) + (py - cy) ** 2 <= cr * cr
}

function circleRect(cx, cy, radius, rx, ry, rw, rh) {
  var testX = cx;
  var testY = cy;
  if (cx < rx) testX = rx; // test left edge
  else if (cx > rx + rw) testX = rx + rw; // right edge
  if (cy < ry) testY = ry; // top edge
  else if (cy > ry + rh) testY = ry + rh; // bottom edge
  var distX = cx - testX;
  var distY = cy - testY;
  return (distX * distX) + (distY * distY) <= radius * radius;
}

function circleCircle(p1x, p1y, r1, p2x, p2y, r2) {
  return ((r1 + r2) * (r1 + r2) > ((p1x - p2x) * (p1x - p2x)) + ((p1y - p2y) * (p1y - p2y)))
}


class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  lim(limit) {
    if (this.x > limit) {
      this.x = limit;
    } else if (this.x < -limit) {
      this.x = -limit;
    }
    if (this.y > limit) {
      this.y = limit;
    } else if (this.y < -limit) {
      this.y = -limit;
    }
  }

  trashold(tr) {
    if (Math.abs(this.x) < tr) {
      this.x = 0;
    }
    if (Math.abs(this.y) < tr) {
      this.y = 0;
    }
  }


  static add(vec1, vec2) {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  static sub(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  static mul(vec, val) {
    return new Vector(vec.x * val, vec.y * val);
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  mul(val) {
    this.x *= val;
    this.y *= val;
    return this;
  }

  div(val) {
    this.x /= val;
    this.y /= val;
    return this;
  }

  abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  sum() {
    return this.x + this.y;
  }

  oneDiv() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    return this;
  }

  normalize() {
    var m = this.mag();
    if (m > 0) {
      this.div(m)
    }
    return this.copy()
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  random(range) {
    this.x = (Math.random() - 0.5) * range * 2
    this.y = (Math.random() - 0.5) * range * 2
  }

  reset() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  static vectorOutAngle(angle) {
    return new Vector(0, 0);
  }

  static angleOutVector(vec) {
    return 0;
  }

  randomWalk(off) {
    this.x += (Math.random() - 0.5) * off * 2;
    this.y += (Math.random() - 0.5) * off * 2;
    return this;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Particle {
  constructor(pos, power) {
    this.pos = pos;
    this.vel = new Vector();
    this.vel.random(power);
    this.radius = Math.random() * power;
    var r = Math.random() * 256;
    var g = Math.random() * (256 - r);
    this.col = [r, g, 255 - r - g];
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mul(0.99);
    this.radius *= 0.95
  }

  render(viewport_x, viewport_y) {
    fill(this.col)
    circle(this.pos.x + viewport_x, this.pos.y + viewport_y, this.radius);
  }
}
