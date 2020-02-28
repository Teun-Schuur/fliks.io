const canvas = document.getElementById("ctx");
const ctx = canvas.getContext("2d");
socket = io();
socket.on("init", () => {
  console.log("connection made!")
});
socket.prefScore = 0;

let WIDTH = NaN;
let HEIGHT = NaN;
var mouseX = 0;
var mouseY = 0;
var play = false; // working on TODO::::
resizeCanvas();

var socket;
var game = null;

var playMenu;
var playButton;
var usernameInput;

window.addEventListener('resize', resizeCanvas);

socket.on("initPlayer", (data) => {
  // console.log(data)
  if (game != null) {
    game.init(data);
  }
});

socket.on("update", function(data) {
  if (game != null) {
    game.update(data);
  }
});

socket.on("ImDead", (score) => {
  if (game != null) {
    game.addScore(Math.max(Math.round(score[0]), 30))
    game.messager.addMessage("You killed " + score[1] + "!\n" + Math.round(score[0]) + " added to your score!");
  }
});

socket.on("night", (night) => {
  if (game != null) {
    game.night = night;
    game.messager.addMessage(night ? "it's night!" : "it's day!");
  }
});

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
  document.onkeydown = event => {
    if (event.keyCode === 13)
      startGame();
  };
});


function startGame() {
  playMenu.classList.add('hidden');
  canvas.classList.remove("hidden")
  var name = usernameInput.value;
  game = new Game(socket, name == "" ? "player_" + ID(4) : name, socket.prefScore);
  play = true;
  socket.emit("inGame", [socket.id, game.player.getPackage()]);


  document.onkeydown = function(event) {
    if (event.keyCode === 68)
      game.player.pressingRight = true;
    else if (event.keyCode === 83)
      game.player.pressingDown = true;
    else if (event.keyCode === 65)
      game.player.pressingLeft = true;
    else if (event.keyCode === 87)
      game.player.pressingUp = true;
    // else if (event.keyCode === 32)
    //   game.player.pressingSpace = true;
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
    // else if (event.keyCode === 32) {
    // game.player.pressingSpace = false;
    // }
  };

  document.onmousedown = function() {
    game.player.pressingMouse = true;
  }

  document.onmouseup = function() {
    game.player.pressingMouse = false;
  }

  canvas.onmousemove = (mouseEvent) => {
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;
  }
}

function stopGame() {
  document.onkeydown = null;
  document.onkeyup = null;
  canvas.onmousemove = null;
  window.removeEventListener('resize', resizeCanvas, false);
  playMenu.classList.remove('hidden');
  canvas.classList.add("hidden")
  socket.emit("outGame", socket.id);
  socket.prefScore = game.player.getNextScore();
  game = null;
  document.onkeydown = event => {
    if (event.keyCode === 13)
      startGame();
  };
  playButton.addEventListener("click", function() {
    startGame();
  });
}
