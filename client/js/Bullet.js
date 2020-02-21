class Bullet {
  constructor(id, from_id, x, y, angle) {
    this.id = id;
    this.isFromId = from_id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.xSpeed = consts.BULLET_SPEED * Math.cos(angle);
    this.ySpeed = consts.BULLET_SPEED * Math.sin(angle);
    this.radius = 5;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (
      this.x > consts.MAP_WIDTH ||
      this.x < 0 ||
      this.x > consts.MAP_HEIGHT ||
      this.y < 0) {
      return true;
    }
    return false;
  }

  getPackage() {
    return {
      id: this.id,
      from_id: this.isFromId,
      x: this.x,
      y: this.y,
      r: this.radius,
      angle: this.angle
    }
  }
}
