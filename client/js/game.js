class Game {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player();
    this.foods = {};
    this.bullets = {};
    this.obsticals = {};
    this.night = consts.NIGHT;
    this.messager = new Message();
    this.viewport_x = clamp(-this.player.x + canvas.width / 2, canvas.width - consts.MAP_WIDTH, 0);
    this.viewport_y = clamp(-this.player.y + canvas.height / 2, canvas.height - consts.MAP_HEIGHT, 0);
  }

  init(id, pack) {
    this.player.id = id;
    this.update(pack)
  }


  update(data) {
    var toAdd = data.ADD; // .BULLETS [], .OBSTICAL [], .FOOD []
    var toRemove = data.REMOVE; // [] of ID's
    var players = data.PLAYERS; // [] of players

    if (this.night) {
      clearScreen(27);
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        mouseX,
        mouseY,
        this.player.score + consts.VIEW_CIRCLE_MIN > consts.VIEW_CIRCLE_MAX ? consts.VIEW_CIRCLE_MAX : this.player.score + consts.VIEW_CIRCLE_MIN,
        0, 2 * Math.PI, false
      );
      ctx.clip()
    }
    clearScreen(consts.COLORS.background);

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
      } else {
        if (rectCol(
            this.player.x,
            this.player.y,
            this.player.size,
            this.player.size,
            player.x,
            player.y,
            player.size,
            player.size)) {
          this.player.setHP(-consts.PLAYER_COLLITION_HP_LOSS);
          if (this.player.HP <= 0) {
            this.messager.addMessage("You have been killed by " + player.name + "!");
            socket.emit("ImDead", {
              name: this.player.name,
              score: this.player.score,
              to: player.id
            })
          }
          this.player.xSpeed *= 2;
          this.player.ySpeed *= 2;
          this.player.xSpeed *= -1;
          this.player.ySpeed *= -1;
        }
      }
    }

    // food
    for (let food of toAdd.FOODS) {
      this.foods[food.id] = new Food(food.id, food.x, food.y);
    }
    pacage.REMOVE = [];
    for (let f_id in this.foods) {
      let f = this.foods[f_id];
      if (rectPoint(this.player.x - this.player.size, this.player.y - this.player.size, this.player.size * 2, this.player.size * 2, f.x, f.y)) {
        this.player.score += consts.FOOD_SCORE;
        this.player.points += consts.FOOD_SCORE;
        pacage.REMOVE.push(f_id);
        this.player.setHP(1)
      }
      this.render_food(f);
    }

    // bullets
    if (this.player.shoot && this.player.score >= consts.BULLET_COST) {
      this.player.score -= consts.BULLET_COST;
      let bul = new Bullet(
        ID(),
        this.player.id,
        this.player.x,
        this.player.y,
        this.player.angle
      );
      pacage.BULLET = bul.getPackage();
    }
    for (let b of toAdd.BULLETS) {
      this.bullets[b.id] = new Bullet(b.id, b.from_id, b.x, b.y, b.angle);
    }
    for (let b in this.bullets) {
      var bul = this.bullets[b];
      if (bul.isFromId != this.player.id) {
        if (rectPoint(this.player.x - this.player.size, this.player.y - this.player.size, this.player.size * 2, this.player.size * 2, bul.x, bul.y)) {
          console.log("HP: ", this.player.HP);
          this.player.setHP(-8);
          // bul.deadFrom = this.player.id;
          if (this.player.HP <= 0) {
            this.messager.addMessage("You have been killed by " + bul.from_id + "!");
            socket.emit("ImDead", {
              name: this.player.name,
              score: this.player.score,
              to: bul.isFromId
            })
          }
          pacage.REMOVE.push(b);
          break;
        }
      }
      if (this.bullets[b].update()) {
        pacage.REMOVE.push(b);
      } else {
        this.render_bullet(this.bullets[b]);
      }
    }

    // obsticals
    for (let o of toAdd.OBSTICALS) {
      this.obsticals[o.id] = new Bullet(o.id, o.from, o.x, o.y, o.r);
    }
    for (let o in this.obsticals) {
      this.render_obstical(obs[o]);
    }

    // render player
    for (let player of players) {
      this.render_player(player);
    }
    if (this.night) {
      ctx.restore()
    }
    this.render_UI();

    this.player.updatePosition();

    pacage.PLAYER = this.player.getPackage();
    socket.emit("returnUpdate", [this.socket.id, pacage]);
  }

  render_bullet(data) {
    fill(consts.COLORS.bullet);
    circle(data.x + this.viewport_x, data.y + this.viewport_y, data.radius);
  }

  render_obstical(data) {
    fill(consts.COLORS.obstical);
    circle(data.x, data.y, data.r);
  }

  render_food(data) {
    fill(data.col);
    circle(data.x + this.viewport_x, data.y + this.viewport_y, consts.FOOD_RADIUS);
  }

  render_player(data) {
    if (data.id === this.player.id) {
      fill(consts.COLORS.player_self);
      // drawTriangle(d, HEIGHT / 2, data.size, data.angle);
    } else {
      fill(map(data.hp, 0, 100, 0, 255), 40, 255 - map(data.hp, 0, 100, 0, 255))
      // fill(consts.COLORS.player_other);
    }
    drawTriangle(data.x + this.viewport_x, data.y + this.viewport_y, data.size, data.angle);
  }

  render_UI() {
    ctx.font = "30px Calibri";
    fill(200)
    ctx.fillText("score: " + this.player.score, 10, 30);
    hp_bar(this.player.HP)
    this.messager.render();
  }

  addScore(score) {
    this.player.score += Math.round(score * consts.POINTS_GET_IF_KILED);
  }
}
