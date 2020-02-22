const express = require("express");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});
const Consts = require("./client/shared/consts.js");
const Game = require("./server/game.js");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));

serv.listen(2000);
console.log("Server started.");


io.on("connection", function(socket) {
  console.log("New connection: ", socket.id)
  addNewUser(socket)
  socket.on('disconnect', function() {
    console.log(socket.id + ' has disconnected from the chat.');
    onDisconnect(socket)
  });
  socket.on("returnUpdate", (data) => {
    returnUpdate(data);
  });
  socket.on("inGame", (socket) => {
    addNewUser(socket);
  });
  socket.on("outGame", (id) => {
    playerOutGame(id);
  });
});


const game = new Game();

function addNewUser(socket) {
  game.initNewPlayer(socket)
}

function playerOutGame(id) {
  // TODO
}

function returnUpdate(data) {
  game.onReturnUpdate(data[0], data[1]);
}

function onDisconnect(socket) {
  game.onDisconnect(socket.id);
}


setInterval(function() {
  game.update();
}, 1000 / Consts.FRAME_RATE);
