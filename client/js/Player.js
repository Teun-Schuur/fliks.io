class Player {
  constructor(name) {
    this.id = null;
    this.x = consts.MAP_WIDTH * Math.random();
    this.y = consts.MAP_HEIGHT * Math.random();
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingSpace = false;
    this.xSpeed = 0;
    this.ySpeed = 0;
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
    if (this.pressingSpace && (this.frame % (consts.PLAYER_SHOOTING_SPEED * consts.FRAME_RATE) === 0)) {
      this.shoot = true;
    } else {
      this.shoot = false;
    }
    if (
      (this.pressingRight && this.pressingUp) ||
      (this.pressingLeft && this.pressingUp) ||
      (this.pressingRight && this.pressingDown) ||
      (this.pressingLeft && this.pressingDown)) {
      if (this.pressingRight) this.xSpeed += consts.SPEED * 0.75;
      if (this.pressingLeft) this.xSpeed -= consts.SPEED * 0.75;
      if (this.pressingUp) this.ySpeed -= consts.SPEED * 0.75;
      if (this.pressingDown) this.ySpeed += consts.SPEED * 0.75;
    } else {
      if (this.pressingRight) this.xSpeed += consts.SPEED;
      if (this.pressingLeft) this.xSpeed -= consts.SPEED;
      if (this.pressingUp) this.ySpeed -= consts.SPEED;
      if (this.pressingDown) this.ySpeed += consts.SPEED;
    }
    this.frame++;
    this.ySpeed *= consts.RESISTENCE;
    this.xSpeed *= consts.RESISTENCE;
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
      x: this.x,
      y: this.y,
      angle: this.angle,
      size: this.size,
      hp: this.HP,
      score: this.score,
      name: this.name,
    }
  }
}
