const Consts = require("../client/shared/Consts");

class Game {
  constructor() {
    this.sockets = new Map();
    this.players = new Map();
    this.bullets = {};
    this.obsticals = {};
    this.foods = {};

    this.pack = new Object();
    this.pack.REMOVE = []; // id's
    this.pack.ADD = new Object(); // bullets, obsticals, food
    this.pack.ADD.BULLETS = [];
    this.pack.ADD.FOODS = [];
    this.pack.ADD.OBSTICALS = [];
    this.pack.PLAYERS = []; // all the players info

    this.frameCount = 0;
  }

  // onely the first time send all the objects and the socket id to the client
  // for a proper init.
  initNewPlayer(socket) {
    console.log("init player: ",
      Object.keys(this.bullets).length)
    this.sockets.set(socket.id, socket);
    let pack = new Object();
    pack.ADD = {
      BULLETS: [],
      FOODS: Object.values(this.foods),
      OBSTICALS: Object.values(this.obsticals)
    }
    pack.PLAYERS = Object.values(this.players);
    pack.REMOVE = [];
    socket.emit("init", [socket.id, pack])
  }

  // a call back that is called 60 times a second,
  // it will send all the clients the data from all the other clients
  update() {
    this.frameCount++;
    if (Object.keys(this.foods).length > Consts.FOOD_RESPAN_RATE * this.players.size) {
      if (Math.random() < (Consts.FOOD_RESPAN_RATE * this.players.size) / (Object.keys(this.foods).length / 4)) {
        let food = {
          id: ID(),
          x: Math.random() * Consts.MAP_WIDTH,
          y: Math.random() * Consts.MAP_HEIGHT
        }
        this.pack.ADD.FOODS.push(food);
        this.foods[food.id] = food;
      }
    } else {
      for (let i = 0; i < Math.round(Consts.FOOD_RESPAN_RATE * this.players.size); i++) {
        let food = {
          id: ID(),
          x: Math.random() * Consts.MAP_WIDTH,
          y: Math.random() * Consts.MAP_HEIGHT
        }
        this.pack.ADD.FOODS.push(food);
        this.foods[food.id] = food;
      }
    }
    this.sendPackage();
  }

  onDisconnect(id) {
    this.sockets.delete(id);
    this.players.delete(id);
  }

  onReturnUpdate(id, data) {
    let toRemove = data.REMOVE;
    if (toRemove.length > 0) {
      // console.log("removed object with id: ", toRemove[0])
    }
    for (let id of toRemove) {
      this.pack.REMOVE.push(id);
      delete this.foods[id];
      delete this.bullets[id];
      delete this.obsticals[id];
    }
    this.players.set(id, data.PLAYER);

    if (data.BULLET != null || data.BULLET != undefined) {
      this.bullets[data.BULLET.id] = data.BULLET;
      this.pack.ADD.BULLETS.push(data.BULLET);
    }
  }

  sendPackage() {
    this.pack.PLAYERS = Array.from(this.players.values());
    for (let [id, socket] of this.sockets) {
      socket.emit("update", this.pack);
    }

    // reset the package
    this.pack.REMOVE = []; // id's
    this.pack.ADD = new Object(); // bullets, obsticals, food
    this.pack.ADD.BULLETS = [];
    this.pack.ADD.FOODS = [];
    this.pack.ADD.OBSTICALS = [];
    this.pack.PLAYERS = []; // all the players info
  }
}


function ID() {
  return Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 5);
}


module.exports = Game;
