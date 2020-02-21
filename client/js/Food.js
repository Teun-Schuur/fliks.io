class Food {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }


  getPackage() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    }
  }
}
