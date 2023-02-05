import Battleship from "./battleship";

const gameloop = (() => {
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
    if (Battleship.playerGameboard.allShipsSunk()) {
      displayWinner("bot");
      disableGame();
    }

    if (Battleship.botGameboard.allShipsSunk()) {
      displayWinner("player");
      disableGame();

      return true;
    }

    return false;
  };

  function loop(x, y, displayPlayerDomBoard, displayBotDomBoard) {
    Battleship.player.attack(Battleship.botGameboard, x, y);
    displayBotDomBoard();
    if (checkWinConditions()) return;

    Battleship.bot.attack(Battleship.playerGameboard);
    displayPlayerDomBoard(true);
    checkWinConditions();
  }

  return loop;
})();

export default gameloop;
