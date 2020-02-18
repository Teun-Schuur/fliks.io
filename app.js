const express = require("express");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});
const Player = require("./server/Player.js");
const Constants = require("./shared/constants.js");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));

serv.listen(2000);
console.log("Server started.");


// io.on("connection", function(socket) {
//   socket.id = Math.random();
//   console.log("New connection: ", socket.id)
//   SOCKET_LIST[socket.id] = socket;
//   var player = new Player(socket.id);
//   PLAYER_LIST[socket.id] = player;
//
//   socket.on("disconnect", function() {
//     delete SOCKET_LIST[socket.id];
//     delete PLAYER_LIST[socket.id];
//   });
//
//   socket.on("keypress", function(data) {
//     if (data.inputId === "right") player.pressingRight = data.state;
//     else if (data.inputId === "down") player.pressingDown = data.state;
//     else if (data.inputId === "left") player.pressingLeft = data.state;
//     else if (data.inputId === "up") player.pressingUp = data.state;
//   });
// });

io.on("connection", function(socket) {
  console.log("New connection: ", socket.id)
  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', onDisconnect);
});


const game = new Game();

function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(dir) {
  game.handleInput(this, dir);
}

function onDisconnect() {
  game.removePlayer(this);
}


setInterval(function() {
  var pack = [];
  for (var player_id in PLAYER_LIST) {
    var player = PLAYER_LIST[player_id];
    player.updatePosition();
    pack.push({
      x: player.x,
      y: player.y,
      number: player.number,
      angle: player.angle
    });
  }
  for (var socket_id in SOCKET_LIST) {
    var socket = SOCKET_LIST[socket_id];
    socket.emit("newPositions", pack);
  }
}, 1000 / 25);
