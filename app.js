const express = require("express");
const app = express();
const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});
const Constants = require("./shared/constants.js");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));

serv.listen(2000);
console.log("Server started.");


io.on("connection", function(socket) {
  console.log("New connection: ", socket.id)
  socket.on('disconnect', function() {
    console.log(socket.id + ' has disconnected from the chat.');
  });
  socket.on('join', function(name) {
    socket.name = name;
    console.log(socket.name + ' joined the chat.');
  });
});


// const game = new Game();

// function joinGame(username) {
//   game.addPlayer(this, username);
// }
//
// function handleInput(dir) {
//   game.handleInput(this, dir);
// }
//
// function onDisconnect() {
//   game.removePlayer(this);
// }

//
// setInterval(function() {
//   game.update();
// }, 1000 / 25);
