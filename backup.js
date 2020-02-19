document.onkeydown = function(event) {
  if (event.keyCode === 68)
    socket.emit("keypress", {
      inputId: "right",
      state: true
    });
  else if (event.keyCode === 83)
    socket.emit("keypress", {
      inputId: "down",
      state: true
    });
  else if (event.keyCode === 65)
    socket.emit("keypress", {
      inputId: "left",
      state: true
    });
  else if (event.keyCode === 87)
    socket.emit("keypress", {
      inputId: "up",
      state: true
    });
};

document.onkeyup = function(event) {
  if (event.keyCode === 68)
    socket.emit("keypress", {
      inputId: "right",
      state: false
    });
  else if (event.keyCode === 83)
    socket.emit("keypress", {
      inputId: "down",
      state: false
    });
  else if (event.keyCode === 65)
    socket.emit("keypress", {
      inputId: "left",
      state: false
    });
  else if (event.keyCode === 87)
    socket.emit("keypress", {
      inputId: "up",
      state: false
    });
};


socket.on("keypress", function(data) {
  if (data.inputId === "right") player.pressingRight = data.state;
  else if (data.inputId === "down") player.pressingDown = data.state;
  else if (data.inputId === "left") player.pressingLeft = data.state;
  else if (data.inputId === "up") player.pressingUp = data.state;
});


socket.emit("newPositions", pack);
socket.on('disconnect', callBack);

module.exports = Player;
const Player = require("./Player")




class Player extends Entity {
  constructor(id) {
    super(id, 250, 250)
    this.number = "" + Math.floor(10 * Math.random());
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.maxSpeed = 2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.angle = 0;
  }

  updatePosition() {
    if (this.pressingRight) this.xSpeed += this.maxSpeed;
    if (this.pressingLeft) this.xSpeed -= this.maxSpeed;
    if (this.pressingUp) this.ySpeed -= this.maxSpeed;
    if (this.pressingDown) this.ySpeed += this.maxSpeed;
    this.ySpeed *= 0.9;
    this.xSpeed *= 0.9;
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.angle = Math.atan(this.ySpeed / this.xSpeed);
    if (this.xSpeed < 0) {
      this.angle += Math.PI;
    }
  }
}
