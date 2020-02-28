class Bullet {
  constructor(id, from_id, name, x, y, angle) {
    this.id = id;
    this.isFromId = from_id;
    this.isFromName = name;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.xSpeed = consts.BULLET_SPEED * Math.cos(angle);
    this.ySpeed = consts.BULLET_SPEED * Math.sin(angle);
    this.radius = consts.BULLET_RADIUS;
    this.deadFrom = null;
    this.lifeTime = consts.BULLET_LIFETIME;
  }

  update() {
    this.lifeTime--;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (
      this.x > consts.MAP_WIDTH ||
      this.x < 0 ||
      this.x > consts.MAP_HEIGHT ||
      this.y < 0) {
      return true;
    } else if (this.lifeTime <= 0) {
      return true;
    }
    return false;
  }

  getPackage() {
    return {
      id: this.id,
      from_id: this.isFromId,
      from_name: this.isFromName,
      x: this.x,
      y: this.y,
      r: this.radius,
      angle: this.angle
    }
  }
}
