class Player {
  constructor(id) {
    this.id = id;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.number = "" + Math.floor(10 * Math.random());
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpeed = 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.angle = 0;
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
}
