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

describe("Test attack method", () => {
  test("Player attacks successfully bot gameboard", () => {
    player.attack(botGameboard, 0, 0);
    expect(botGameboard.getBoard()[0][0]).toBe("missed");
  });

  test("Bot attacks successfully player gameboard", () => {
    const playerReceiveAttackMock = jest.fn();
    playerGameboard.receiveAttack = playerReceiveAttackMock;

    bot.attack(playerGameboard);
    expect(playerReceiveAttackMock).toHaveBeenCalled();
  });

  test("Bot does not attack the same coordinate twice", () => {
    let successfulAttacks = 0;

    for (let i = 0; i < 100; i += 1) {
      bot.attack(playerGameboard);
    }

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (playerGameboard.getBoard()[i][j] === "missed")
          successfulAttacks += 1;
      }
    }

    expect(successfulAttacks).toBe(100);
  });
});

describe("Test placeShip method", () => {
  test("Player is able to place a ship in a certain coordenate", () => {
    player.placeShip(playerGameboard, 4, 4, "vertical");
    expect(playerGameboard.getBoard()[4][4].length).toBe(5);
  });

  test("Bot is able to place ships in random coordenates", () => {
    bot.placeShip(botGameboard);
    bot.placeShip(botGameboard);
    bot.placeShip(botGameboard);
    bot.placeShip(botGameboard);
    bot.placeShip(botGameboard);

    expect(botGameboard.getShips().length).toBe(5);
  });
});
