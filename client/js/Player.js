class Player {
  constructor() {
    this.id = null;
    this.x = consts.MAP_WIDTH / 2;
    this.y = consts.MAP_HEIGHT / 2;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpeed = 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.angle = 0;
    this.size = consts.PLAYER_SIZE;
  }

  updatePosition() {
    if (this.pressingRight) this.xSpeed += this.maxSpeed;
    if (this.pressingLeft) this.xSpeed -= this.maxSpeed;
    if (this.pressingUp) this.ySpeed -= this.maxSpeed;
    if (this.pressingDown) this.ySpeed += this.maxSpeed;

    this.ySpeed *= 0.9;
    this.xSpeed *= 0.9;
    if (Math.abs(this.ySpeed) < 0.01) {
      this.ySpeed = 0;
    }
    if (Math.abs(this.xSpeed) < 0.01) {
      this.xSpeed = 0;
    }
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    if (this.x + this.size > consts.MAP_WIDTH) {
      this.x = consts.MAP_WIDTH - this.size;
    }
    if (this.x - this.size < 0) {
      this.x = this.size;
    }
    if (this.y + this.size > consts.MAP_HEIGHT) {
      this.y = consts.MAP_HEIGHT - this.size;
    }
    if (this.y - this.size < 0) {
      this.y = this.size;
    }
    if (this.ySpeed !== 0 && this.xSpeed !== 0) {
      this.angle = Math.atan(this.ySpeed / this.xSpeed);
      if (this.xSpeed < 0) {
        this.angle += Math.PI;
      }
    } else if (this.ySpeed === 0 && Math.abs(this.xSpeed) > 0.1) {
      this.angle = this.xSpeed > 0 ? 0 : (Math.PI / 180) * 180;
    } else if (this.xSpeed === 0 && Math.abs(this.ySpeed) > 0.1) {
      this.angle = this.ySpeed > 0 ? (Math.PI / 180) * 90 : (Math.PI / 180) * 270;
    }
  }

  getPackage() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      angle: this.angle,
      size: this.size
    }
  }
}
