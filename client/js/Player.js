class Player {
  constructor() {
    this.id = null;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpeed = 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.angle = 0;
    this.size = 20;
  }

  updatePosition() {
    if (this.pressingRight) this.xSpeed += this.maxSpeed;
    if (this.pressingLeft) this.xSpeed -= this.maxSpeed;
    if (this.pressingUp) this.ySpeed -= this.maxSpeed;
    if (this.pressingDown) this.ySpeed += this.maxSpeed;
    this.ySpeed *= 0.9;
    this.xSpeed *= 0.9;
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.angle = Math.atan(this.ySpeed / this.xSpeed);
    if (this.xSpeed < 0) {
      this.angle += Math.PI;
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
