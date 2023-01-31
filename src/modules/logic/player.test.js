/* global describe, test, expect, beforeEach, jest */

import Gameboard from "./gameboard";
import Player from "./player";

let playerGameboard;
let botGameboard;

let player;
let bot;

beforeEach(() => {
  playerGameboard = Gameboard();
  botGameboard = Gameboard();

  player = Player("player");
  bot = Player("bot");
});

describe("Test player", () => {
  test("Attacks bot gameboard", () => {
    player.attack(botGameboard, 0, 0);
    expect(botGameboard.getBoard()[0][0]).toBe("missed");
  });
});

describe("Test bot", () => {
  test("Attacks player gameboard", () => {
    const playerReceiveAttackMock = jest.fn();
    playerGameboard.receiveAttack = playerReceiveAttackMock;

    bot.attack(playerGameboard);
    expect(playerReceiveAttackMock).toHaveBeenCalled();
  });

  test("Does not attack the same coordinate twice", () => {
    let successfulHits = 0;

    for (let i = 0; i < 100; i += 1) {
      bot.attack(playerGameboard);
    }

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (playerGameboard.getBoard()[i][j] === "missed") successfulHits += 1;
      }
    }

    expect(successfulHits).toBe(100);
  });
});
