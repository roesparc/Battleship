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

  return [randomX, randomY];
};

const Player = (player) => {
  const attack = (enemyBoard, x, y) => {
    if (player === "bot") {
      const coordinates = findRandomCoordinates(enemyBoard);
      const randomX = coordinates[0];
      const randomY = coordinates[1];

      enemyBoard.receiveAttack(randomX, randomY);
    } else {
      enemyBoard.receiveAttack(x, y);
    }
  };

  return { attack };
};

export default Player;
