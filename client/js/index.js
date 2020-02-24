const canvas = document.getElementById("ctx");
const ctx = canvas.getContext("2d");
socket = io();
socket.on("init", () => {
  console.log("connection made!")
});

let WIDTH = NaN;
let HEIGHT = NaN;
var mouseX = 0;
var mouseY = 0;
var play = false; // working on TODO::::

resizeCanvas();
var socket;
var game;

var playMenu;
var playButton;
var usernameInput;

document.addEventListener("DOMContentLoaded", function(event) {
  playMenu = document.getElementById('play-menu');
  playButton = document.getElementById('play-button');
  usernameInput = document.getElementById('username-input');
  // console.log(document.getElementById('play-menu'))
  playMenu.classList.remove('hidden');
  canvas.classList.add("hidden")

  playButton.addEventListener("click", function() {
    startGame();
  });
});


function startGame() {
  playMenu.classList.add('hidden');
  canvas.classList.remove("hidden")
  game = new Game(socket, usernameInput.value);
  play = true;
  socket.emit("inGame", [socket.id, game.player.getPackage()]);

  window.addEventListener('resize', resizeCanvas);

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

  socket.on("initPlayer", (data) => {
    // console.log(data)
    game.init(data);
  });

  socket.on("update", function(data) {
    console.log(data);
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
}

function stopGame() {
  document.onkeydown = null;
  document.onkeydown = null;
  document.onkeyup = null;
  canvas.onmousemove = null;
  window.removeEventListener('resize', resizeCanvas, false);
  playMenu.classList.remove('hidden');
  canvas.classList.add("hidden")
  socket.emit("outGame", socket.id);
  game = null;
  playButton.addEventListener("click", function() {
    startGame();
  });
}
