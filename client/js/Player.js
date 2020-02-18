const Entity = require("./Entity.js");

class Player extends Entity {
  constructor(id) {
    super(id, 250, 250)
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

module.exports = Player;
