class Game {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player();
  }

  init(id) {
    this.player.id = id;
    let data = this.player.getPackage();
    console.log(data)
    socket.emit("returnUpdate", data);
  }

  update(data) {
    clearScreen()
    let players = data.PLAYERS;
    ctx.save();
    for (let player of players) {
      if (player.id === this.player.id) {
        ctx.translate(this.player.x, this.player.y);
      }
    }


    for (let player of players) {
      this.render_player(player);
    }
    let foods = data["FOODS"];
    for (let f in foods) {
      this.render_food(foods[f]);
    }
    let bullets = data["BULLETS"];
    for (let b in bullets) {
      this.render_bullet(bullets[b]);
    }
    let obs = data["OBSITCALS"];
    for (let o in obs) {
      this.render_obstical(obs[o]);
    }
    ctx.restore();
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
    circle(data.x, data.y, consts.FOOD_RADIUS)
  }

  render_player(data) {
    if (data.id === this.player.id) {
      fill(consts.COLORS.player_self);
    } else {
      fill(consts.COLORS.player_other);
    }
    drawTriangle(data.x, data.y, data.size, data.angle)
  }
}
