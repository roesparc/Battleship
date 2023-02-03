import Gameboard from "../logic/gameboard";
import Player from "../logic/player";

const player = Player("player");
const playerGameboard = Gameboard();

const bot = Player("bot");
const botGameboard = Gameboard();

let shipPosition = "horizontal";

const rotateBtn = document.querySelector(".rotate-button");
rotateBtn.addEventListener("click", () => {
  if (shipPosition === "horizontal") {
    shipPosition = "vertical";
  } else {
    shipPosition = "horizontal";
  }
});

bot.placeShip(botGameboard);
bot.placeShip(botGameboard);
bot.placeShip(botGameboard);
bot.placeShip(botGameboard);
bot.placeShip(botGameboard);

const addPlayerStyle = (cell, x, y, gameStarted) => {
  if (typeof playerGameboard.getBoard()[x][y] === "object") {
    cell.classList.add("ship");
  }

  if (playerGameboard.getBoard()[x][y] === "missed") {
    cell.classList.add("missed");
  }

  if (playerGameboard.getBoard()[x][y] === "hit") {
    cell.classList.add("hit");
  }

  if (!gameStarted) {
    if (playerGameboard.getBoard()[x][y] === "unavailable") {
      cell.classList.add("unavailable");
    }
  }
};

const addBotStyle = (cell, x, y) => {
  const coordinate = cell;

  if (botGameboard.getBoard()[x][y] === "missed") {
    cell.classList.add("missed");
  }

  if (botGameboard.getBoard()[x][y] === "hit") {
    cell.classList.add("hit");
  }

  if (cell.classList.contains("hit") || cell.classList.contains("missed")) {
    coordinate.disabled = true;
  }
};

const validateStart = (displayPlayerDomBoard) => {
  if (playerGameboard.getShips().length > 4) {
    displayPlayerDomBoard(true);
  } else {
    displayPlayerDomBoard();
  }
};

const placeShip = (x, y, displayPlayerDomBoard) => {
  player.placeShip(playerGameboard, x, y, shipPosition);

  validateStart(displayPlayerDomBoard);
};

const previewHorizontal = (cell, removePreview, shipSequence) => {
  const curretShip = shipSequence[playerGameboard.getShips().length];

  const playerDomBoard = document.querySelector(".player-board");
  const coordinate = [...playerDomBoard.children].indexOf(cell);

  const horizontalFloor = Math.floor(coordinate / 10);
  const extendedFloor = Math.floor((coordinate + (curretShip - 1)) / 10);

  for (let i = 0; i < curretShip; i += 1) {
    const currentFloor = Math.floor((coordinate + i) / 10);

    if (horizontalFloor !== currentFloor) return;

    const shipCell = playerDomBoard.children[coordinate + i];

    if (removePreview) {
      shipCell.classList.remove("preview-ship");
      shipCell.classList.remove("invalid-placement");
    } else {
      const isValidPlacement = horizontalFloor === extendedFloor;

      if (isValidPlacement) {
        shipCell.classList.add("preview-ship");
      } else {
        shipCell.classList.add("invalid-placement");
      }
    }
  }
};

const previewVertical = (cell, removePreview, shipSequence) => {
  const curretShip = shipSequence[playerGameboard.getShips().length];

  const playerDomBoard = document.querySelector(".player-board");
  const coordinate = [...playerDomBoard.children].indexOf(cell);

  const extendedFloor = coordinate + curretShip * 10 - 10;

  for (let i = 0; i < curretShip * 10; i += 10) {
    if (coordinate + i > 99) return;

    const shipCell = playerDomBoard.children[coordinate + i];

    if (removePreview) {
      shipCell.classList.remove("preview-ship");
      shipCell.classList.remove("invalid-placement");
    } else {
      if (extendedFloor > 99) {
        shipCell.classList.add("invalid-placement");
      }
      shipCell.classList.add("preview-ship");
    }
  }
};

const previewShip = (cell, removePreview) => {
  const shipSequence = [5, 4, 3, 3, 2];

  if (shipPosition === "horizontal") {
    previewHorizontal(cell, removePreview, shipSequence);
  } else {
    previewVertical(cell, removePreview, shipSequence);
  }
};

const displayPlayerDomBoard = (gameStarted) => {
  const playerDomBoard = document.querySelector(".player-board");
  playerDomBoard.textContent = "";

  for (let y = 9; y > -1; y -= 1) {
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement("button");
      cell.classList.add("cell");

      if (!gameStarted) {
        cell.addEventListener("mouseover", () => previewShip(cell));

        cell.addEventListener("mouseout", () => previewShip(cell, true));

        cell.addEventListener("click", () =>
          placeShip(x, y, displayPlayerDomBoard)
        );
      }

      addPlayerStyle(cell, x, y, gameStarted);

      playerDomBoard.appendChild(cell);
    }
  }
};

const displayBotDomBoard = () => {
  const botDomBoard = document.querySelector(".bot-board");
  botDomBoard.textContent = "";

  for (let y = 9; y > -1; y -= 1) {
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.addEventListener("click", () => gameLoop(x, y));

      addBotStyle(cell, x, y);

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
  displayPlayerDomBoard(true);
  checkWinConditions();
}

displayPlayerDomBoard();
displayBotDomBoard();
