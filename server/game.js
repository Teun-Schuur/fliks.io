const Consts = require("./Consts");
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

  onNewConnection(socket) {
    this.sockets.set(socket.id, socket)
  }

  onDisconnect(id) {
    this.sockets.delete(id);
    players_pack.delete(id);
  }

  onRemove(object, id) {
    if (object == "FOOD") {
      delete this.foods[id];
    } else if (object == "BULLET") {
      delete this.bullets[id];
    } else if (object == "OBSTICAL") {
      delete this.obsticals[id];
    }
  }

  onReturnUpdate(id, data) {
    players_pack.set(id, data);
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
    pack["PLAYERS"] = this.players_pack;
    pack["FOODS"] = food_pack;
    pack["bullets"] = buls_pack;
    pack["obsticals"] = obstical_pack;
    for (let [id, socket] of this.sockets) {
      socket.emit("update", pack);
    }
  }
}

module.exports = Game;
