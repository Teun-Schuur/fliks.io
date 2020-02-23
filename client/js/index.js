const canvas = document.getElementById("ctx");
const ctx = canvas.getContext("2d");

let WIDTH = NaN;
let HEIGHT = NaN;
var mouseX = 0;
var mouseY = 0;
var play = false; // working on

resizeCanvas();
const socket = io();
const game = new Game(socket);

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

console.log(playMenu)
playMenu.classList.remove('hidden');
startEventListeners()
stopEventListeners()


socket.on("init", (data) => {
  game.init(data[0], data[1]);
});

socket.on("update", function(data) {
  game.update(data);
});

socket.on("ImDead", (score) => {
  game.addScore(Math.round(score[0]))
  game.messager.addMessage("You killed " + score[1] + "!\n" + Math.round(score[0]) + " added to your score!");
});

socket.on("night", (night) => {
  game.night = night;
  game.messager.addMessage(night ? "it's night!" : "it's day!");
});


function startEventListeners() {
  window.addEventListener('resize', resizeCanvas, false);

  document.onkeydown = function(event) {
    if (event.keyCode === 68)
      game.player.pressingRight = true;
    else if (event.keyCode === 83)
      game.player.pressingDown = true;
    else if (event.keyCode === 65)
      game.player.pressingLeft = true;
    else if (event.keyCode === 87)
      game.player.pressingUp = true;
    else if (event.keyCode === 32)
      game.player.pressingSpace = true;
    // else if (event.keyCode === 77)
    //   game.night = !game.night;
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

  canvas.onmousemove = (mouseEvent) => {
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;
  }
}

function stopEventListeners() {
  document.onkeydown = null;

  document.onkeydown = null;
  document.onkeyup = null;
  canvas.onmousemove = null;
  window.removeEventListener('resize', resizeCanvas, false);
}
