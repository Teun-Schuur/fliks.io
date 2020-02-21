class Food {
  constructor(id, x, y) {
    this.id = id;
    this.x = Math.random() * consts.MAP_WIDTH;
    this.y = Math.random() * consts.MAP_HEIGHT;
  }


  getPackage() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    }
  }
}
