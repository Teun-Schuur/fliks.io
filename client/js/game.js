class Game {
  constructor(socket, name, prfScore) {
    this.socket = socket;
    this.player = new Player(name);
    this.player.id = socket.id;
    this.player.score = prfScore;
    this.foods = {};
    this.bullets = {};
    this.obsticals = {};
    this.night = consts.NIGHT;
    this.messager = new Message();
    this.viewport_x = clamp(-this.player.pos.x + canvas.width / 2, canvas.width - consts.MAP_WIDTH, 0);
    this.viewport_y = clamp(-this.player.pos.y + canvas.height / 2, canvas.height - consts.MAP_HEIGHT, 0);
    this.shakeDelta = new Vector(0, 0);
    this.explotion = [];
  }

  init(pack) {
    this.update(pack)
  }


  update(data) {
    var toAdd = data.ADD; // .BULLETS [], .OBSTICAL [], .FOOD []
    var toRemove = data.REMOVE; // [] of ID's
    var players = data.PLAYERS; // [] of players
    // console.log(toAdd, toRemove, players)

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

    // obstical set
    for (let obstical of data.OBSTICALS) {
      this.obsticals[obstical.id].set(obstical);
    }

    // player
    for (let player of players) {
      if (player.id === this.player.id) {
        this.viewport_x = -this.player.pos.x + canvas.width / 2;
        this.viewport_y = -this.player.pos.y + canvas.height / 2;
        this.viewport_x = clamp(this.viewport_x, canvas.width - consts.MAP_WIDTH, 0);
        this.viewport_y = clamp(this.viewport_y, canvas.height - consts.MAP_HEIGHT, 0);
        this.viewport_x += this.shakeDelta.x;
        this.viewport_y += this.shakeDelta.y;
      } else {
        if (rectCol(
            this.player.pos.x,
            this.player.pos.y,
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
              to: player.id,
              x: this.player.pos.x,
              y: this.player.pos.y,
            })

            stopGame()
            break;
          }
          this.player.vel.mul(-2);
        }
      }
    }

    for (let par of this.explotion) {
      par.update();
      par.render(this.viewport_x, this.viewport_y);
    }

    // food
    for (let food of toAdd.FOODS) {
      this.foods[food.id] = new Food(food.id, food.x, food.y);
    }
    pacage.REMOVE = [];
    for (let f_id in this.foods) {
      let f = this.foods[f_id];
      if (rectPoint(this.player.pos.x - this.player.size, this.player.pos.y - this.player.size, this.player.size * 2, this.player.size * 2, f.x, f.y)) {
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
        this.player.name,
        this.player.pos.x,
        this.player.pos.y,
        getAngle(mouseX - (this.player.pos.x + this.viewport_x), mouseY - (this.player.pos.y + this.viewport_y))
      );
      pacage.BULLET = bul.getPackage();
    }
    for (let b of toAdd.BULLETS) {
      this.bullets[b.id] = new Bullet(b.id, b.from_id, this.player.name, b.x, b.y, b.angle);
    }
    var gameOver = false;
    for (let b in this.bullets) {
      var bul = this.bullets[b];
      if (bul.isFromId != this.player.id) {
        if (rectPoint(this.player.pos.x - this.player.size, this.player.pos.y - this.player.size, this.player.size * 2, this.player.size * 2, bul.x, bul.y)) {
          this.player.setHP(-8);
          // bul.deadFrom = this.player.id;
          if (this.player.HP <= 0) {
            socket.emit("ImDead", {
              name: this.player.name,
              score: this.player.score,
              to: bul.isFromId,
              x: this.player.pos.x,
              y: this.player.pos.y,
            })
            stopGame()
          }
          pacage.REMOVE.push(b);
          gameOver = true;
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
      this.obsticals[o.id] = new Obstical(o.id, o.x, o.y, o.r);
      // this.obsticals[o.id].vel.add(new Vector((0.5 - Math.random()) * 5, (0.5 - Math.random()) * 5));
    }
    for (let o_id in this.obsticals) {
      let o = this.obsticals[o_id];
      if (circleCircle(o.pos.x, o.pos.y, o.radius, this.player.pos.x, this.player.pos.y, this.player.size / 2)) {
        o.collision(this.player)
        pacage.OBSTICAL = {
          id: o.id,
          hp: o.hp,
          x: o.pos.x,
          y: o.pos.y,
          xs: o.vel.x,
          ys: o.vel.y,
        }
      }
      for (let b in this.bullets) {
        var bul = this.bullets[b];
        if (circlePoint(o.pos.x, o.pos.y, o.radius, bul.x, bul.y)) {
          o.hp -= 8;
          pacage.REMOVE.push(b);
        }
      }
      o.update();
      if (o.hp <= 0) {
        var delta = Vector.sub(o.pos, this.player.pos).abs();
        if (delta.mag() < WIDTH + HEIGHT) {
          this.explotions(o.pos, o.radius)
          var strength = delta.normalize().oneDiv().mul(o.radius / 3).mag();
          this.screenShake(strength);
        }
        pacage.REMOVE.push(o_id);
        this.player.score += Math.round(o.radius)
      }
      this.render_obstical(o);
    }

    // render player
    for (let player of players) {
      this.render_player(player);
    }
    if (this.night) {
      ctx.restore()
    }

    // aiming thing
    fill(255)
    circle(mouseX, mouseY, 4)
    circle(mouseX, mouseY, 20, false)
    rect(mouseX - 30, mouseY, 20, 2)
    rect(mouseX + 30, mouseY, -20, 2)
    rect(mouseX, mouseY + 30, 2, -20)
    rect(mouseX, mouseY - 30, 2, 20)

    this.render_UI(players);

    this.player.updatePosition();

    pacage.PLAYER = this.player.getPackage();
    socket.emit("returnUpdate", [this.player.id, pacage]);
  }

  render_bullet(data) {
    fill(consts.COLORS.bullet);
    circle(data.x + this.viewport_x, data.y + this.viewport_y, data.radius);
  }

  render_obstical(data) {
    ctx.save();
    fill(consts.COLORS.obstical);
    ctx.shadowBlur = 14;
    ctx.shadowColor = getColor(
      consts.COLORS.obstical[0] * 1.3,
      consts.COLORS.obstical[1] * 1.3,
      consts.COLORS.obstical[2] * 1.3,
    );
    circle(data.pos.x + this.viewport_x, data.pos.y + this.viewport_y, data.radius);
    ctx.restore();
  }

  render_food(data) {
    ctx.save();
    fill(data.col);
    ctx.shadowBlur = 5;
    ctx.shadowColor = getColor(
      data.col[0] * 1.3,
      data.col[1] * 1.3,
      data.col[2] * 1.3,
    );
    circle(data.x + this.viewport_x, data.y + this.viewport_y, consts.FOOD_RADIUS);
    ctx.restore();

  }

  render_player(data) {
    let col;
    ctx.save()
    if (data.id === this.player.id) {
      col = consts.COLORS.player_self
      fill(col);
      // drawTriangle(d, HEIGHT / 2, data.size, data.angle);
    } else {
      col = [map(data.hp, 0, 100, 0, 255), 40, 255 - map(data.hp, 0, 100, 0, 255)]
      fill(col)
      // fill(consts.COLORS.player_other);
    }
    drawTriangle(data.x + this.viewport_x, data.y + this.viewport_y, data.size, data.angle, getColor(
      col[0] * 1.3,
      col[1] * 1.3,
      col[2] * 1.3,
    ));
    ctx.restore();
  }

  render_UI(players) {
    //leaderboard
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    roundRect(WIDTH - 210, 0, 210, 290, {
      tl: 0,
      tr: 0,
      br: 0,
      bl: 40
    }, true, false);
    players.sort((a, b) => b.score - a.score);
    ctx.font = "30px Calibri";
    fill(200, 200, 200);
    for (let i = 0; i < 7 && players[i] != undefined; i++) {
      ctx.fillText((i + 1) + ": " + players[i].name, WIDTH - 200, i * 40 + 30);
    }

    //score
    ctx.font = "30px Calibri";
    fill(200)
    ctx.fillText("score: " + this.player.score, 10, 30);

    //hp bar
    hp_bar(this.player.HP)

    //messages
    this.messager.render();
  }

  addScore(score) {
    this.player.score += Math.round(score * consts.POINTS_GET_IF_KILED);
  }

  async screenShake(size) {
    for (var i = 0; i < 100; i++) {
      await this.delay(size / 10);
      this.shakeDelta.random((1 / i) * size);
    }
    this.shakeDelta.reset();
  }

  async explotions(pos, size) {
    for (var i = 0; i < Math.round(size * 1.9); i++) {
      this.explotion.push(new Particle(pos.copy().randomWalk(size), size / 7))
    }
    console.log(this.explotion.length)
    await this.delay(1500);
    for (var i = 0; i < size; i++) {
      this.explotion.pop(0);
    }
  }

  async delay(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("done")
      }, time);
    })
  }
}
