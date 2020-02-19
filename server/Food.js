const Consts = require("./Consts");


class Food {
  constructor(id) {
    this.id = id;
    this.x = Math.random() * Consts.MAP_WIDTH;
    this.y = Math.random() * Consts.MAP_HEIGHT;
  }


  getPackage() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    }
  }
}


module.exports = Food;
