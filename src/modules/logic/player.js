const findRandomCoordinates = (enemyBoard) => {
  let searchLegalMove = true;
  let randomX;
  let randomY;

  while (searchLegalMove) {
    randomX = Math.floor(Math.random() * 10);
    randomY = Math.floor(Math.random() * 10);

    if (
      enemyBoard.getBoard()[randomX][randomY] !== "missed" &&
      enemyBoard.getBoard()[randomX][randomY] !== "hit"
    ) {
      searchLegalMove = false;
    }
  }

  return { randomX, randomY };
};

const Player = (player) => {
  const attack = (enemyBoard, x, y) => {
    if (player === "bot") {
      const coordinates = findRandomCoordinates(enemyBoard);
      const { randomX, randomY } = coordinates;

      enemyBoard.receiveAttack(randomX, randomY);
    } else {
      enemyBoard.receiveAttack(x, y);
    }
  };

  const placeShip = (board, x, y, position) => {
    if (player === "bot") {
      const initialNumberOfShips = board.getShips().length;
      let searchShipPosition = true;

      while (searchShipPosition) {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        const shipPosition =
          Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";

        board.placeShip(randomX, randomY, shipPosition);

        if (board.getShips().length > initialNumberOfShips) {
          searchShipPosition = false;
        }
      }
    } else {
      board.placeShip(x, y, position);
    }
  };

  return { attack, placeShip };
};

export default Player;
