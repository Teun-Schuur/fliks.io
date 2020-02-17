export default class Entity {
  constructor() {
    this.x = 250;
    this.y = 250;
    this.id = "";
    this.speedX = 0;
    this.speedY = 0;
  }

  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    this.updatePosition();
  }
}
