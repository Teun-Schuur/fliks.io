class Obstical {
  constructor(id, x, y, r) {
    this.id = id;
    this.x = Math.random() * Consts.MAP_WIDTH;
    this.y = Math.random() * Consts.MAP_HEIGHT;
    this.radius = Math.random() * 10 + 10;
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


module.exports = Obstical;
