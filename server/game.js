const Consts = require("../client/shared/Consts");

class Game {
  constructor() {
    this.sockets = new Map();
    // this.sockets_not_used = new Map();
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

    this.litleCounter = 0;

    this.night = Consts.NIGHT;


    for (let i = 0; i < 100; i++) {
      let food = {
        id: ID(),
        x: Math.random() * Consts.MAP_WIDTH,
        y: Math.random() * Consts.MAP_HEIGHT
      }
      this.pack.ADD.FOODS.push(food);
      this.foods[food.id] = food;
    }
  }

  // onely the first time send all the objects and the socket id to the client
  // for a proper init.
  initNewPlayer(socket) {
    this.sockets.set(socket.id, socket);
    socket.emit("init")
  }

  // a call back that is called 60 times a second,
  // it will send all the clients the data from all the other clients
  update() {
    this.frameCount++;
    if (this.frameCount % (60 * Consts.DAY_NIGHT_TIME) === 0) {
      this.night = !this.night;
      for (let [id, player] of this.players) {
        this.sockets.get(id).emit("night", this.night);
      }
    }
    if (this.frameCount % 300 === 0) {
      let obstical = {
        id: ID(),
        x: Math.random() * Consts.MAP_WIDTH,
        y: Math.random() * Consts.MAP_HEIGHT,
        r: Math.random() * 75 + 50
      }
      this.pack.ADD.OBSTICALS.push(obstical);
      this.obsticals[obstical.id] = obstical;
      // console.log(obstical.id)
    }

    // food
    if (Object.keys(this.foods).length < Consts.MAX_FOOD_SPAN_PER_PLAYER * this.players.size && Object.keys(this.foods).length < Consts.MAX_FOOD_TOTAL) {
      if (Math.random() < (Consts.FOOD_SPAN_RATE_PER_PLAYER * this.players.size)) {
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

  playerOutGame(id) {
    console.log("out: " + this.sockets.get(id).id)
    // this.sockets.delete(id);
    this.players.delete(id);
    this.litleCounter = 0;
    // console.log("player is out!, " + id, this.sockets.size, this.sockets_not_used.size);
  }

  playerInGame(id, data) {
    console.log("player is in!, " + id)
    let pack = new Object();
    pack.ADD = {
      BULLETS: [],
      FOODS: Object.values(this.foods),
      OBSTICALS: Object.values(this.obsticals)
    }
    pack.PLAYERS = Object.values(this.players);
    pack.REMOVE = [];
    this.sockets.get(id).emit("initPlayer", pack)
    this.sockets.get(id).emit("night", this.night);
    this.players.set(id, data);
  }

  // will be caled if a client disconnect
  onDisconnect(id) {
    // this.sockets_not_used.delete(id);
    this.sockets.delete(id);
    this.players.delete(id);
  }

  giveScore(data) {
    try {
      this.sockets.get(data.to).emit("ImDead", [data.score, data.name])
    } catch (e) {
      console.log(e + " ... " + data)
    }
  }

  // client will send a mesage back with the objects that need to be added or removed.
  onReturnUpdate(id, data) {
    // console.log(data)
    let toRemove = data.REMOVE;
    for (let id of toRemove) {
      this.pack.REMOVE.push(id);
      delete this.foods[id];
      delete this.bullets[id];
      delete this.obsticals[id];
    }
    if (this.players.has(id)) {
      this.players.set(id, data.PLAYER);
    }

    if (data.BULLET != null || data.BULLET != undefined) {
      this.bullets[data.BULLET.id] = data.BULLET;
      this.pack.ADD.BULLETS.push(data.BULLET);
    }
  }

  sendPackage() {
    this.pack.PLAYERS = Array.from(this.players.values());
    for (let [id, socket] of this.players) {
      this.sockets.get(id).emit("update", this.pack);
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

// genarates a random id
function ID() {
  return Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 5);
}


module.exports = Game;
