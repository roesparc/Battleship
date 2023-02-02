import Gameboard from "../logic/gameboard";
import Player from "../logic/player";

const playerDomBoard = document.querySelector(".player-board");
const botDomBoard = document.querySelector(".bot-board");

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

const displayPlayerDomBoard = () => {
  playerDomBoard.textContent = "";

  for (let i = 9; i > -1; i -= 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("button");
      cell.classList.add("cell");

      if (typeof playerGameboard.getBoard()[j][i] === "object") {
        cell.classList.add("ship");
      }

      if (playerGameboard.getBoard()[j][i] === "missed") {
        cell.classList.add("missed");
      }

      if (playerGameboard.getBoard()[j][i] === "hit") {
        cell.classList.add("hit");
      }

      // if (playerGameboard.getBoard()[j][i] === "unavailable") {
      //   cell.classList.add("unavailable");
      // }

      playerDomBoard.appendChild(cell);
    }
  }
};

const displayBotDomBoard = () => {
  botDomBoard.textContent = "";

  for (let i = 9; i > -1; i -= 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.addEventListener("click", () => gameLoop(j, i));

      if (botGameboard.getBoard()[j][i] === "missed") {
        cell.classList.add("missed");
      }

      if (botGameboard.getBoard()[j][i] === "hit") {
        cell.classList.add("hit");
      }

      if (cell.classList.contains("hit") || cell.classList.contains("missed")) {
        cell.disabled = true;
      }

      botDomBoard.appendChild(cell);
    }
  }
};

const disableGame = () => {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const coordinate = cell;
    coordinate.disabled = true;
  });
};

const displayWinner = (winner) => {
  const playerWinContainer = document.querySelector(".player-wins");
  const botWinContainer = document.querySelector(".bot-wins");

  if (winner === "player") {
    playerWinContainer.classList.add("reveal-winner");
  } else {
    botWinContainer.classList.add("reveal-winner");
  }
};

const checkWinConditions = () => {
  if (playerGameboard.allShipsSunk()) {
    displayWinner("bot");
    disableGame();
  }

  if (botGameboard.allShipsSunk()) {
    displayWinner("player");
    disableGame();

    return true;
  }

  return false;
};

function gameLoop(x, y) {
  player.attack(botGameboard, x, y);
  displayBotDomBoard();
  if (checkWinConditions()) return;

  bot.attack(playerGameboard);
  displayPlayerDomBoard();
  checkWinConditions();
}

displayPlayerDomBoard();
displayBotDomBoard();
