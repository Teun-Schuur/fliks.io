class Game {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player();
    this.xOfset = clamp(-this.player.x + canvas.width / 2, 0, consts.MAP_WIDTH - canvas.width);
    this.yOfset = clamp(-this.player.y + canvas.height / 2, 0, consts.MAP_HEIGHT - canvas.height);
  }

  init(id) {
    this.player.id = id;
    let data = this.player.getPackage();
    // console.log(data)
    socket.emit("returnUpdate", data);
  }

  update(data) {
    clearScreen();
    let players = data.PLAYERS;
    for (let player of players) {
      if (player.id === this.player.id) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        var camX = clamp(-player.x + canvas.width / 2, 0, consts.MAP_WIDTH);
        var camY = clamp(-player.y + canvas.height / 2, 0, consts.MAP_HEIGHT);
        this.xOfset = -player.x + canvas.width / 2;
        this.yOfset = -player.y + canvas.height / 2;
        console.log(Math.round(this.xOfset))
        ctx.translate(camX, camY);
      }
    }

    for (let player of players) {
      this.render_player(player);
    }
    let foods = data.FOODS;
    for (let f of foods) {
      if (rectPoint(this.player.x - this.player.size, this.player.y - this.player.size, this.player.size * 2, this.player.size * 2, f.x, f.y)) {
        console.log(f.id)
        let pocket = []
        pocket.push("FOOD")
        pocket.push(f.id)
        socket.emit("RemoveId", pocket)
      }
      this.render_food(f);
    }
    let bullets = data["BULLETS"];
    for (let b in bullets) {
      this.render_bullet(bullets[b]);
    }
    let obs = data["OBSITCALS"];
    for (let o in obs) {
      this.render_obstical(obs[o]);
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
    circle(data.x + this.xOfset, data.y + this.yOfset, consts.FOOD_RADIUS)
  }

  render_player(data) {
    if (data.id === this.player.id) {
      fill(consts.COLORS.player_self);
      drawTriangle(WIDTH / 2, HEIGHT / 2, data.size, data.angle);
    } else {
      fill(consts.COLORS.player_other);
      drawTriangle(data.x + this.xOfset, data.y + this.yOfset, data.size, data.angle)
    }
  }
}
