import Entity from "/server/Entity.js";

export default class Player extends Entity {
  constructor(id) {
    this.x = 250;
    this.y = 250;
    this.id = id;
    this.number = "" + Math.floor(10 * Math.random());
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpeed = 10;
  }

  updatePosition() {
    if (this.pressingRight) this.x += this.maxSpeed;
    if (this.pressingLeft) this.x -= this.maxSpeed;
    if (this.pressingUp) this.y -= this.maxSpeed;
    if (this.pressingDown) this.y += this.maxSpeed;
  }
}
