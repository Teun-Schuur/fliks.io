const Consts = require("../client/shared/Consts");
const Food = require("./Food")
const Obstical = require("./Obstical")
const Bullet = require("./Bullet")

class Game {
  constructor() {
    this.sockets = new Map();
    this.players_pack = new Map();
    this.bullets = {};
    this.foods = {};
    this.obsticals = {};
  }

  initNewPlayer(socket) {
    this.sockets.set(socket.id, socket);
    socket.emit("init", socket.id)
  }

  update() {
    if (Object.keys(this.foods).length < Consts.FOOD_RESPAN_RATE) {
      if (Math.random() < Consts.FOOD_RESPAN_RATE / Object.keys(this.foods).length) {
        let food = new Food(ID())
        this.foods[food.id] = food;
      }
    } else {
      for (let i = 0; i < Consts.FOOD_RESPAN_RATE; i++) {
        let food = new Food(ID())
        this.foods[food.id] = food;
      }
    }

    this.sendPackage();
  }

  onNewConnection(socket) {
    this.sockets.set(socket.id, socket)
  }

  onDisconnect(id) {
    this.sockets.delete(id);
    this.players_pack.delete(id);
  }

  onRemove(object, id) {
    console.log("remove " + object + " with id of: " + id)
    if (object == "FOOD") {
      delete this.foods[id];
    } else if (object == "BULLET") {
      delete this.bullets[id];
    } else if (object == "OBSTICAL") {
      delete this.obsticals[id];
    }
  }

  onReturnUpdate(id, data) {
    this.players_pack.set(id, data);
    // console.log(data)
  }

  sendPackage() {
    var pack = {};
    var buls_pack = [];
    for (var bul in this.bullets) {
      buls_pack.push(this.bullets[bul].getPackage());
    }
    var food_pack = []
    for (var food in this.foods) {
      food_pack.push(this.foods[food].getPackage());
    }
    var obstical_pack = []
    for (var obstical in this.obsticals) {
      obstical_pack.push(this.obsticals[obstical].getPackage());
    }
    var player_pack = [];
    for (var [id, data] of this.players_pack) {
      player_pack.push(data);
    }
    pack = {
      PLAYERS: Array.from(this.players_pack.values()),
      FOODS: food_pack,
      BULLETS: buls_pack,
      OBSITCALS: obstical_pack
    }
    for (let [id, socket] of this.sockets) {
      // console.log(pack.PLAYERS.length)
      socket.emit("update", pack);
    }
  }
}


function ID() {
  return Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 5);
}

module.exports = Game;
