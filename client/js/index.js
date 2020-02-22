const canvas = document.getElementById("ctx");
const ctx = canvas.getContext("2d");
const maskCanvas = document.getElementById('mask');
const maskCtx = maskCanvas.getContext('2d');
maskCanvas.width = canvas.width;
maskCanvas.height = canvas.height;
maskCtx.fillStyle = "black";
maskCtx.globalCompositeOperation = 'xor';
let WIDTH = NaN;
let HEIGHT = NaN;
resizeCanvas();
const socket = io();
const game = new Game(socket);

socket.on("init", (data) => {
  game.init(data[0], data[1]);
});

socket.on("update", function(data) {
  game.update(data);
});



document.onkeydown = function(event) {
  if (event.keyCode === 68)
    game.player.pressingRight = true;
  else if (event.keyCode === 83)
    game.player.pressingDown = true;
  else if (event.keyCode === 65)
    game.player.pressingLeft = true;
  else if (event.keyCode === 87)
    game.player.pressingUp = true;
  else if (event.keyCode === 32) {
    game.player.pressingSpace = true;
  }
};

document.onkeyup = function(event) {
  if (event.keyCode === 68)
    game.player.pressingRight = false;
  else if (event.keyCode === 83)
    game.player.pressingDown = false;
  else if (event.keyCode === 65)
    game.player.pressingLeft = false;
  else if (event.keyCode === 87)
    game.player.pressingUp = false;
  else if (event.keyCode === 32) {
    game.player.pressingSpace = false;
  }
};
