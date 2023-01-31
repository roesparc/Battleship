import Ship from "./ship";

const createShip = (shipsLength) => {
  const shipOrder = [5, 4, 3, 3, 2];

  const ship = Ship(shipOrder[shipsLength]);

  return ship;
};

const shipIsOverflowing = (position, shipLength, x, y) => {
  if (
    (position === "horizontal" && x + shipLength > 10) ||
    (position === "vertical" && y - shipLength < -1)
  ) {
    return true;
  }

  return false;
};

const shipOverlaps = (board, shipLength, x, y, position) => {
  if (position === "horizontal") {
    for (let i = 0; i < shipLength; i += 1) {
      if (board[x + i][y] !== undefined) return true;
    }
  } else {
    for (let i = 0; i < shipLength; i += 1) {
      if (board[x][y - i] !== undefined) return true;
    }
  }

  return false;
};

const markAdjacentCells = (board, shipLength, x, y, position) => {
  const boardCopy = [...board];

  if (position === "horizontal") {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= shipLength; j += 1) {
        if (
          x + j >= 0 &&
          x + j < 10 &&
          y + i >= 0 &&
          y + i < 10 &&
          boardCopy[x + j][y + i] === undefined
        ) {
          boardCopy[x + j][y + i] = "unavailable";
        }
      }
    }
  }

  if (position === "vertical") {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = 1; j >= -shipLength; j -= 1) {
        if (
          x + i >= 0 &&
          x + i < 10 &&
          y + j >= 0 &&
          y + j < 10 &&
          boardCopy[x + i][y + j] === undefined
        ) {
          boardCopy[x + i][y + j] = "unavailable";
        }
      }
    }
  }
};

const Gameboard = () => {
  const board = Array.from({ length: 10 }, () => []);
  const ships = [];

  const getBoard = () => board;

  const getShips = () => ships;

  const placeShip = (x, y, position) => {
    const ship = createShip(ships.length);

    if (shipIsOverflowing(position, ship.length, x, y)) return;
    if (shipOverlaps(board, ship.length, x, y, position)) return;

    if (position === "horizontal") {
      for (let i = 0; i < ship.length; i += 1) {
        board[x + i][y] = ship;
      }
    }

    if (position === "vertical") {
      for (let i = 0; i < ship.length; i += 1) {
        board[x][y - i] = ship;
      }
    }

    markAdjacentCells(board, ship.length, x, y, position);
    ships.push(ship);
  };

  const receiveAttack = (x, y) => {
    if (typeof board[x][y] === "object") {
      board[x][y].hit();
      board[x][y] = "hit";
    } else {
      board[x][y] = "missed";
    }
  };

  return { getBoard, getShips, placeShip, receiveAttack };
};

export default Gameboard;
