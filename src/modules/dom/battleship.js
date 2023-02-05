import Gameboard from "../logic/gameboard";
import Player from "../logic/player";

class Battleship {
  static player;

  static playerGameboard;

  static bot;

  static botGameboard;

  static shipPosition;

  static setGame() {
    this.player = Player("player");
    this.playerGameboard = Gameboard();

    this.bot = Player("bot");
    this.botGameboard = Gameboard();

    for (let i = 0; i < 5; i += 1) {
      this.bot.placeShip(this.botGameboard);
    }

    this.shipPosition = "horizontal";
  }
}

export default Battleship;
