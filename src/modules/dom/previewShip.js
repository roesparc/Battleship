import Battleship from "./battleship";

const previewShip = (() => {
  const previewHorizontal = (cell, removePreview, shipSequence) => {
    const curretShip =
      shipSequence[Battleship.playerGameboard.getShips().length];

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
    const curretShip =
      shipSequence[Battleship.playerGameboard.getShips().length];

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

  const preview = (cell, removePreview) => {
    const shipSequence = [5, 4, 3, 3, 2];

    if (Battleship.shipPosition === "horizontal") {
      previewHorizontal(cell, removePreview, shipSequence);
    } else {
      previewVertical(cell, removePreview, shipSequence);
    }
  };

  return preview;
})();

export default previewShip;
