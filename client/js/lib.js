module.resizeCanvas = function(canvas) {
  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
}

module.clearScreen = function(ctx) {
  fill(180)
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

module.fill = function(ctx, r, g, b) {
  if (g != null && b != null) {
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
  } else {
    ctx.fillStyle = "rgb(" + r + ", " + r + ", " + r + ")";
  }
}

module.drawTriangle = function(ctx, PosX, PosY, radius, rotate) {
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
