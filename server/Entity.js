class Entity {
  constructor(id, x, y) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  update() {
    this.updatePosition();
  }
}


module.exports = Entity;
