import Gameboard from "../logic/gameboard";
import Player from "../logic/player";

let player;
let playerGameboard;

let bot;
let botGameboard;

let shipPosition;

const rotateShip = () => {
  if (shipPosition === "horizontal") {
    shipPosition = "vertical";
  } else {
    shipPosition = "horizontal";
  }
};

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

const startGame = () => {
  const playerBoard = document.querySelector(".player-board");
  playerBoard.classList.remove("player-setup");

  const botBoard = document.querySelector(".bot-board");
  botBoard.classList.remove("hide-bot-board");

  const gameSetup = document.querySelector(".game-setup");
  gameSetup.classList.add("hide-game-setup");
};

const validateStart = (displayPlayerDomBoard) => {
  if (playerGameboard.getShips().length > 4) {
    displayPlayerDomBoard(true);
    startGame();
  } else {
    displayPlayerDomBoard();
  }
};

const updateShipToPlace = () => {
  const placingShip = document.querySelector(".place-ship");
  const currentShip = playerGameboard.getShips().length;

  switch (currentShip) {
    case 1:
      placingShip.textContent = "Battleship";
      break;
    case 2:
      placingShip.textContent = "Cruiser";
      break;
    case 3:
      placingShip.textContent = "Submarine";
      break;
    case 4:
      placingShip.textContent = "Destroyer";
      break;
    default:
      placingShip.textContent = "Aircraft Carrier";
      break;
  }
};

const placeShip = (x, y, displayPlayerDomBoard) => {
  player.placeShip(playerGameboard, x, y, shipPosition);

  updateShipToPlace();
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
      shipCell.classList.remove("preview-ship", "invalid-placement");
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

const disableGame = () => {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const coordinate = cell;
    coordinate.disabled = true;
  });
};

const displayWinner = (winner) => {
  const gameOver = document.querySelector(".game-over");
  gameOver.classList.remove("hide-game-over");

  const announceWinner = document.querySelector(".announce-winner");

  if (winner === "player") {
    announceWinner.textContent = "Player Wins!";
    announceWinner.classList.remove("bot-wins");
    announceWinner.classList.add("player-wins");
  } else {
    announceWinner.textContent = "Bot Wins";
    announceWinner.classList.remove("player-wins");
    announceWinner.classList.add("bot-wins");
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

function gameLoop(x, y, displayPlayerDomBoard, displayBotDomBoard) {
  player.attack(botGameboard, x, y);
  displayBotDomBoard();
  if (checkWinConditions()) return;

  bot.attack(playerGameboard);
  displayPlayerDomBoard(true);
  checkWinConditions();
}

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
      cell.addEventListener("click", () =>
        gameLoop(x, y, displayPlayerDomBoard, displayBotDomBoard)
      );

      addBotStyle(cell, x, y);

      botDomBoard.appendChild(cell);
    }
  }
};

const init = () => {
  player = Player("player");
  playerGameboard = Gameboard();

  bot = Player("bot");
  botGameboard = Gameboard();

  for (let i = 0; i < 5; i += 1) {
    bot.placeShip(botGameboard);
  }

  shipPosition = "horizontal";

  displayPlayerDomBoard();
  displayBotDomBoard();
};
init();

const showGameSetup = () => {
  const gameOver = document.querySelector(".game-over");
  gameOver.classList.add("hide-game-over");

  const playerBoard = document.querySelector(".player-board");
  playerBoard.classList.add("player-setup");

  const botBoard = document.querySelector(".bot-board");
  botBoard.classList.add("hide-bot-board");

  const gameSetup = document.querySelector(".game-setup");
  gameSetup.classList.remove("hide-game-setup");
};

const restartGame = () => {
  showGameSetup();
  init();
};

const rotateBtn = document.querySelector(".rotate-button");
rotateBtn.addEventListener("click", rotateShip);

const playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", restartGame);
