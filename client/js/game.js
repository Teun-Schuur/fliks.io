class Game {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player();
    this.foods = {};
    this.bullets = {};
    this.obsticals = {};


    this.viewport_x = clamp(-this.player.x + canvas.width / 2, canvas.width - consts.MAP_WIDTH, 0);
    this.viewport_y = clamp(-this.player.y + canvas.height / 2, canvas.height - consts.MAP_HEIGHT, 0);
  }

  init(id, pack) {
    console.log(id, pack)
    this.player.id = id;
    this.update(pack)
  }

  update(data) {
    var toAdd = data.ADD; // .BULLET [], .OBSTICAL [], .FOOD []
    var toRemove = data.REMOVE; // [] of ID's
    var players = data.PLAYERS; // [] of players

    if (toRemove.length > 0) {
      console.log("removing: ", toRemove[0], this.foods[toRemove[0]])
    }

    clearScreen(consts.BACKGROUND);
    for (let id of toRemove) {
      delete this.foods[id];
      delete this.bullets[id];
      delete this.obsticals[id];
    }

    // create packge to send back
    var pacage = new Object();

    // player
    for (let player of players) {
      if (player.id === this.player.id) {
        this.viewport_x = -this.player.x + canvas.width / 2;
        this.viewport_y = -this.player.y + canvas.height / 2;
        this.viewport_x = clamp(this.viewport_x, canvas.width - consts.MAP_WIDTH, 0);
        this.viewport_y = clamp(this.viewport_y, canvas.height - consts.MAP_HEIGHT, 0);
      }
    }
    for (let player of players) {
      this.render_player(player);
    }

    // food
    for (let food of toAdd.FOODS) {
      this.foods[food.id] = new Food(food.id, food.x, food.y);
    }
    pacage.REMOVE = [];
    for (let f_id in this.foods) {
      let f = this.foods[f_id];
      if (rectPoint(this.player.x - this.player.size, this.player.y - this.player.size, this.player.size * 2, this.player.size * 2, f.x, f.y)) {
        pacage.REMOVE.push(f_id);
      }
      this.render_food(f);
    }

    // bullets
    if (this.player.shoot) {
      let bul = new Bullet(
        ID(),
        this.player.id,
        this.player.x,
        this.player.y,
        this.player.xSpeed,
        this.player.ySpeed
      );
      pacage.BULLET = bul.getPackage();
      this.bullets[bul.id] = bul;

    }
    for (let b of toAdd.BULLETS) {
      this.bullets[b.id] = new Bullet(b.id, b.from, b.x, b.y, b.xSpeed, b.ySpeed);
    }
    for (let b in this.bullets) {
      this.render_bullet(this.bullets[b]);
    }

    // obsticals
    for (let o of toAdd.OBSTICALS) {
      this.obsticals[o.id] = new Bullet(o.id, o.from, o.x, o.y, o.r);

    }
    for (let o in this.obsticals) {
      this.render_obstical(obs[o])
    }

    this.player.updatePosition();
    pacage.PLAYER = this.player.getPackage();
    socket.emit("returnUpdate", [this.socket.id, pacage]);
  }

  render_bullet(data) {
    console.log(consts.COLORS.bullet)
    fill(consts.COLORS.bullet);
    circle(data.x, data.y, data.r)
  }

  render_obstical(data) {
    fill(consts.COLORS.obstical);
    circle(data.x, data.y, data.r)
  }

  render_food(data) {
    fill(consts.COLORS.food);
    circle(data.x + this.viewport_x, data.y + this.viewport_y, consts.FOOD_RADIUS)
  }

  render_player(data) {
    if (data.id === this.player.id) {
      fill(consts.COLORS.player_self);
      // drawTriangle(d, HEIGHT / 2, data.size, data.angle);
    } else {
      fill(consts.COLORS.player_other);
    }
    drawTriangle(data.x + this.viewport_x, data.y + this.viewport_y, data.size, data.angle)
  }
}
