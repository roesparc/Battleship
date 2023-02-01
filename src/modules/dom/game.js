import Gameboard from "../logic/gameboard";
import Player from "../logic/player";

const playerBoard = document.querySelector(".player-board");
const botBoard = document.querySelector(".bot-board");

const player = Player("player");
const bot = Player("bot");

const playerGameboard = Gameboard();
const botGameboard = Gameboard();

player.placeShip(playerGameboard, 0, 0, "horizontal");
player.placeShip(playerGameboard, 0, 2, "horizontal");
player.placeShip(playerGameboard, 0, 4, "horizontal");
player.placeShip(playerGameboard, 0, 6, "horizontal");
player.placeShip(playerGameboard, 0, 8, "horizontal");

bot.placeShip(botGameboard);
bot.placeShip(botGameboard);
bot.placeShip(botGameboard);
bot.placeShip(botGameboard);
bot.placeShip(botGameboard);

for (let i = 9; i > -1; i -= 1) {
  for (let j = 0; j < 10; j += 1) {
    const cell = document.createElement("div");
    cell.textContent = `${j} ${i}`;

    if (typeof playerGameboard.getBoard()[j][i] === "object") {
      cell.classList.add("ship");
    }

    // if (playerGameboard.getBoard()[j][i] === "unavailable") {
    //   cell.classList.add("unavailable");
    // }

    playerBoard.appendChild(cell);
  }
}

for (let i = 9; i > -1; i -= 1) {
  for (let j = 0; j < 10; j += 1) {
    const cell = document.createElement("div");
    cell.textContent = `${j} ${i}`;

    if (typeof botGameboard.getBoard()[j][i] === "object") {
      cell.classList.add("ship");
    }

    botBoard.appendChild(cell);
  }
}
