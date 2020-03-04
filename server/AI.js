const Consts = require("../client/shared/Consts");

class AI {
  constructor(target) {
    this.x = Consts.MAP_WIDTH * Math.random();
    this.y = Consts.MAP_HEIGHT * Math.random();
    this.xs = 0;
    this.ys = 0;
    this.radius = 30;
    this.target = target;
  }

  update(players) {
    var player = players[this.target];
    var xd = this.x - player.x;
    var yd = this.y - player.y;
    var m = Math.sqrt(xd * xd, yd * yd);
    if (m > 0) {
      xd /= m;
      yd /= m;
    }
    this.xs = xd * 10;
    this.ys = yd * 10;

    this.x += this.xs;
    this.y += this.ys;
    this.xs *= 0.95;
    this.ys *= 0.95;
  }

  getUpdate() {
    return {
      x: this.x,
      y: this.y,
      radius: this.radius,
    }
  }
}
