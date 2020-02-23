class Message {
  constructor() {
    this.queue = [];
    this.current_message = "";
    this.timer = 0;
  }

  render() {
    if (this.current_message != "") {
      if (this.timer > consts.UI.MESSAGES.SPEED * 60) {
        this.timer = 0;
        this.current_message = "";
      } else {
        this.timer++;
        ctx.font = "40px Calibri";
        ctx.textAlign = "center";
        fill(255)
        ctx.fillText(this.current_message, WIDTH / 2, HEIGHT - consts.UI.MESSAGES.Y);
        ctx.textAlign = "start";
      }

    } else if (this.queue.length !== 0) {
      this.current_message = this.queue.splice(0, 1);
      this.render();
    }
  }

  addMessage(message) {
    this.queue.push(message)
  }

}
