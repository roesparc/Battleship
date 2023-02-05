import Battleship from "./battleship";

const cellStyle = (() => {
  const addPlayerStyle = (cell, x, y, gameStarted) => {
    if (typeof Battleship.playerGameboard.getBoard()[x][y] === "object") {
      cell.classList.add("ship");
    }

    if (Battleship.playerGameboard.getBoard()[x][y] === "missed") {
      cell.classList.add("missed");
    }

    if (Battleship.playerGameboard.getBoard()[x][y] === "hit") {
      cell.classList.add("hit");
    }

    if (!gameStarted) {
      if (Battleship.playerGameboard.getBoard()[x][y] === "unavailable") {
        cell.classList.add("unavailable");
      }
    }
  };

  const addBotStyle = (cell, x, y) => {
    const coordinate = cell;

    if (Battleship.botGameboard.getBoard()[x][y] === "missed") {
      cell.classList.add("missed");
    }

    if (Battleship.botGameboard.getBoard()[x][y] === "hit") {
      cell.classList.add("hit");
    }

    if (cell.classList.contains("hit") || cell.classList.contains("missed")) {
      coordinate.disabled = true;
    }
  };

  return { addPlayerStyle, addBotStyle };
})();

export default cellStyle;
