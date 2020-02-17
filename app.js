const express = require("express");
const app = express();
const serv = require("http").Server(app);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id) {
  var self = {
    x: 250,
    y: 250,
    id: id,
    number: "" + Math.floor(10 * Math.random()),
    pressingRight: false,
    pressingLeft: false,
    pressingUp: false,
    pressingDown: false,
    maxSpeed: 10
  };

  self.updatePosition = function() {
    if (self.pressingRight) self.x += self.maxSpeed;
    if (self.pressingLeft) self.x -= self.maxSpeed;
    if (self.pressingUp) self.y -= self.maxSpeed;
    if (self.pressingDown) self.y += self.maxSpeed;
  };

  return self;
};

const io = require("socket.io")(serv, {});
io.on("connection", function(socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  var player = Player(socket.id);
  PLAYER_LIST[socket.id] = player;

  socket.on("disconnect", function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  });

  socket.on("keypress", function(data) {
    if (data.inputId === "right") player.pressingRight = data.state;
    else if (data.inputId === "down") player.pressingDown = data.state;
    else if (data.inputId === "left") player.pressingLeft = data.state;
    else if (data.inputId === "up") player.pressingUp = data.state;
  });
});

setInterval(function() {
  var pack = [];
  for (var player_id in PLAYER_LIST) {
    var player = PLAYER_LIST[player_id];
    player.updatePosition();
    pack.push({
      x: player.x,
      y: player.y,
      number: player.number
    });
  }
  for (var socket_id in SOCKET_LIST) {
    var socket = SOCKET_LIST[socket_id];
    socket.emit("newPositions", pack);
  }
}, 1000 / 25);
