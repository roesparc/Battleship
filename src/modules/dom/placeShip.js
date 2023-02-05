import Battleship from "./battleship";

const placeShip = (() => {
  const startGame = () => {
    const playerBoard = document.querySelector(".player-board");
    playerBoard.classList.remove("player-setup");

    const botBoard = document.querySelector(".bot-board");
    botBoard.classList.remove("hide-bot-board");

    const gameSetup = document.querySelector(".game-setup");
    gameSetup.classList.add("hide-game-setup");
  };

  const validateStart = (displayPlayerDomBoard) => {
    if (Battleship.playerGameboard.getShips().length > 4) {
      displayPlayerDomBoard(true);
      startGame();
    } else {
      displayPlayerDomBoard();
    }
  };

  const updateShipToPlace = () => {
    const placingShip = document.querySelector(".place-ship");
    const currentShip = Battleship.playerGameboard.getShips().length;

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

  const place = (x, y, displayPlayerDomBoard) => {
    Battleship.player.placeShip(
      Battleship.playerGameboard,
      x,
      y,
      Battleship.shipPosition
    );

    updateShipToPlace();
    validateStart(displayPlayerDomBoard);
  };

  return place;
})();

export default placeShip;
