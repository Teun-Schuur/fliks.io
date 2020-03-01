class Player {
  constructor(name) {
    this.id = null;
    this.x = consts.MAP_WIDTH * Math.random();
    this.y = consts.MAP_HEIGHT * Math.random();
    this.pos = new Vector(consts.MAP_WIDTH * Math.random(), consts.MAP_HEIGHT * Math.random())
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingMouse = false;
    this.vel = new Vector(0, 0)
    this.angle = 0;
    this.size = consts.PLAYER_SIZE;
    this.frame = 0;
    this.shoot = false;
    this.score = 0;
    this.points = 0;
    this.HP = consts.PLAYER_HP;
    this.name = name;
  }

  getNextScore() {
    return Math.round(this.score * ((100 - consts.FOOD_LOSES_IF_DIE) / 100));
  }

  updatePosition() {
    if (this.pressingMouse && (this.frame % (consts.PLAYER_SHOOTING_SPEED * consts.FRAME_RATE) === 0)) {
      this.shoot = true;
    } else {
      this.shoot = false;
    }
    if (
      (this.pressingRight && this.pressingUp) ||
      (this.pressingLeft && this.pressingUp) ||
      (this.pressingRight && this.pressingDown) ||
      (this.pressingLeft && this.pressingDown)) {
      if (this.pressingRight) this.vel.x += consts.SPEED * 0.75;
      if (this.pressingLeft) this.vel.x -= consts.SPEED * 0.75;
      if (this.pressingUp) this.vel.y -= consts.SPEED * 0.75;
      if (this.pressingDown) this.vel.y += consts.SPEED * 0.75;
    } else {
      if (this.pressingRight) this.vel.x += consts.SPEED;
      if (this.pressingLeft) this.vel.x -= consts.SPEED;
      if (this.pressingUp) this.vel.y -= consts.SPEED;
      if (this.pressingDown) this.vel.y += consts.SPEED;
    }
    this.frame++;
    this.vel.mul(consts.RESISTENCE)
    this.vel.trashold(0.02);
    this.pos.add(this.vel)
    if (this.x + this.size > consts.MAP_WIDTH) {
      this.pos.x = consts.MAP_WIDTH - this.size;
    }
    if (this.pos.x - this.size < 0) {
      this.pos.x = this.size;
    }
    if (this.pos.y + this.size > consts.MAP_HEIGHT) {
      this.pos.y = consts.MAP_HEIGHT - this.size;
    }
    if (this.pos.y - this.size < 0) {
      this.pos.y = this.size;
    }
    if (this.vel.y !== 0 && this.vel.x !== 0) {
      this.angle = Math.atan(this.vel.y / this.vel.x);
      if (this.vel.x < 0) {
        this.angle += Math.PI;
      }
    } else if (this.vel.y === 0 && Math.abs(this.vel.x) > 0.1) {
      this.angle = this.vel.x > 0 ? 0 : (Math.PI / 180) * 180;
    } else if (this.vel.x === 0 && Math.abs(this.vel.y) > 0.1) {
      this.angle = this.vel.y > 0 ? (Math.PI / 180) * 90 : (Math.PI / 180) * 270;
    }
  }

  setHP(val) {
    if (val < 0) {
      if (this.HP >= Math.abs(val)) {
        this.HP += val;
      } else {
        this.HP = 0;
      }
    } else {
      if (this.HP + val <= 100) {
        this.HP += val;
      } else {
        this.HP = 100;
      }
    }
  }

  getPackage() {
    return {
      id: this.id,
      x: this.pos.x,
      y: this.pos.y,
      angle: this.angle,
      size: this.size,
      hp: this.HP,
      score: this.score,
      name: this.name,
    }
  }
}
