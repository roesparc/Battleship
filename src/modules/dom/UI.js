import Battleship from "./battleship";
import cellStyle from "./cellStyle";
import gameloop from "./gameLoop";
import placeShip from "./placeShip";
import previewShip from "./previewShip";
import restartAndRotate from "./restartAndRotate";

const userInterface = (() => {
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

        cellStyle.addPlayerStyle(cell, x, y, gameStarted);

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
          gameloop(x, y, displayPlayerDomBoard, displayBotDomBoard)
        );

        cellStyle.addBotStyle(cell, x, y);

        botDomBoard.appendChild(cell);
      }
    }
  };

  const init = () => {
    Battleship.setGame();
    displayPlayerDomBoard();
    displayBotDomBoard();
  };

  const rotateBtn = document.querySelector(".rotate-button");
  rotateBtn.addEventListener("click", restartAndRotate.rotateShip);

  const playAgain = document.querySelector(".play-again");
  playAgain.addEventListener("click", () => restartAndRotate.restartGame(init));

  return { init };
})();

export default userInterface;
