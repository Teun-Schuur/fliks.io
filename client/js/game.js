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

  init(id) {
    this.player.id = id;
    let data = this.player.getPackage();
    socket.emit("returnUpdate", data);
  }

  update(data) {
    var toAdd = data.ADD; // .BULLET [], .OBSTICAL [], .FOOD []
    var toRemove = data.REMOVE; // [] of ID's
    var players = data.PLAYERS; // [] of players

    clearScreen();
    for (let id of toRemove) {
      delete this.foods[id];
      delete this.bullets[id];
      delete this.obsticals[id];
    }


    var pacage = new Object();
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
    for (let f of toAdd.FOODS) {
      Object.assign(this.foods, {
          f.id,
          new Food(f.id, f.x, f.y)
        }
      }
      for (let f_id in this.foods) {
        let f = this.foods[f_id];
        if (rectPoint(this.player.x - this.player.size, this.player.y - this.player.size, this.player.size * 2, this.player.size * 2, f.x, f.y)) {
          console.log(f.id)
          let pocket = []
          pocket.push("FOOD")
          pocket.push(f.id)
          socket.emit("RemoveId", pocket)
        }
        this.render_food(f);
      }
      for (let b of toAdd.BULLETS) {
        Object.assign(this.bullets, {
          b.id,
          new Bullet(b.id, b.from, b.x, b.y b.xSpeed, b.ySpeed)
        });
      }
      for (let b in this.bullets) {
        this.render_bullet(this.bullets[b]);
      }
      for (let o of toAdd.OBSTICALS) {
        Object.assign(this.obsticals, {
          o.id,
          new Bullet(o.id, o.from, o.x, o.y, o.r)
        });
      }
      for (let o in this.obsticals) {
        this.render_obstical(obs[o])
      }



      this.player.updatePosition();
      socket.emit("returnUpdate", this.player.getPackage());
    }

    render_bullet(data) {
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
