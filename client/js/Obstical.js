class Obstical {
  constructor(id, x, y, r) {
    this.id = id;
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.radius = r;
    this.hp = consts.OBSTICAL_HP * r;
  }

  update() {
    this.vel.lim(10);
    this.vel.mul(0.9);
    this.pos.add(this.vel);
  }

  collision(player) {
    this.hp -= 5;

    let delta = new Vector(this.pos.x - player.x, this.pos.y - player.y);
    let d = delta.mag();
    mtd = delta.mul(((this.radius + player.size / 2) - d) / d);

    im1 = this.radius * 0.5; // TODO:
    im2 = 1 / consts.PLAYER_MASS; // TODO:

    this.pos.add(mtd.mul(im1 / (im1 + im2)));
    player.pos.sub(mtd.mul(im1 / (im1 + im2)));

    let v = Vector.sub(this.vel, player.vel);
    let vn = v.dot(mtd.normalize());

    if (vn > 0) return;

    let i = (-(1 + 3) * vn) / (im1 + im2);

    impulse = mtd.normalize().mul(i);

    this.vel.add(impulse.mult(im1));
    player.vel.sub(impulse.mul(im2));
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
