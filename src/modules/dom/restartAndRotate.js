import Battleship from "./battleship";

const restartAndRotate = (() => {
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

  const restartGame = (init) => {
    showGameSetup();
    init();
  };

  const rotateShip = () => {
    if (Battleship.shipPosition === "horizontal") {
      Battleship.shipPosition = "vertical";
    } else {
      Battleship.shipPosition = "horizontal";
    }
  };

  return { restartGame, rotateShip };
})();

export default restartAndRotate;
