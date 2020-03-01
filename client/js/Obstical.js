class Obstical {
  constructor(id, x, y, r) {
    this.id = id;
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.radius = r;
    this.hp = consts.OBSTICAL_HP * r;
  }

  update() {
    this.vel.lim(12);
    this.vel.mul(0.90);
    this.pos.add(this.vel);
    if (this.pos.x + this.radius > consts.MAP_WIDTH) {
      this.pos.x = consts.MAP_WIDTH - this.radius;
    }
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
    }
    if (this.pos.y + this.radius > consts.MAP_HEIGHT) {
      this.pos.y = consts.MAP_HEIGHT - this.radius;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
    }
  }

  collision(player) {
    this.hp -= 5;

    let delta = Vector.sub(this.pos, player.pos);
    let d = delta.mag();
    var mtd = Vector.mul(delta, ((this.radius + player.size / 2) - d) / d);

    var im1 = 1 / (this.radius / 18);
    var im2 = 1 / consts.PLAYER_MASS;

    this.pos.add(Vector.mul(mtd, im1 / (im1 + im2)));
    player.pos.sub(Vector.mul(mtd, (im1 / (im1 + im2))));

    let v = Vector.sub(this.vel, player.vel);
    let vn = v.dot(mtd.normalize());

    if (vn > 0) return;

    let i = (-(1 + 0.3) * vn) / (im1 + im2);

    var impulse = Vector.mul(mtd.normalize(), i);

    this.vel.add(Vector.mul(impulse, im1));
    player.vel.sub(Vector.mul(impulse, im2));
  }


  getPackage() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      r: this.radius
    }
  }
}
