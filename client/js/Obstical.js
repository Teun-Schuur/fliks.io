class Obstical {
  constructor(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = r;
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
