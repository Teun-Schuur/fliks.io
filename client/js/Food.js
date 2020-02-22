class Food {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    var r = Math.random() * 256;
    var g = Math.random() * (256 - r)
    this.col = [r, g, 255 - r - g];
  }


  getPackage() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      col: this.col,
    }
  }
}
