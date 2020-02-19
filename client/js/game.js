class Game {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player("PLAYER:" + socket.id);
  }
}
