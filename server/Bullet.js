const Consts = require("../client/shared/Consts");

class Bullet {
  constructor(id, from_id, x, y, xSpeed, ySpeed) {
    this.id = id;
    this.isFromId = from_id;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = 5;
  }

  getPackage() {
    return {
      id: this.id,
      from_id: this.isFromId,
      x: this.x,
      y: this.y,
      r: this.radius
    }
  }
}


module.exports = Bullet;
