const canvas = document.getElementById("ctx");
const ctx = canvas.getContext("2d");
let WIDTH = NaN;
let HEIGHT = NaN;
resizeCanvas();
const socket = io();
console.log(socket, socket.id)
const game = new Game(socket);

// socket.on("newLocations", function(data) {
//
// });
