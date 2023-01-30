/* global describe, test, expect, beforeEach */

import Gameboard from "./gameboard";

let gameboard;

beforeEach(() => {
  gameboard = Gameboard();
});

describe("Ships are placed at specific coordinates with the right length", () => {
  test("Horizontally", () => {
    gameboard.placeShip(0, 0, "horizontal");
    gameboard.placeShip(0, 2, "horizontal");
    gameboard.placeShip(0, 4, "horizontal");
    gameboard.placeShip(0, 6, "horizontal");
    gameboard.placeShip(0, 8, "horizontal");

    expect(gameboard.getBoard()[0][0].length).toBe(5);
    expect(gameboard.getBoard()[0][2].length).toBe(4);
    expect(gameboard.getBoard()[0][4].length).toBe(3);
    expect(gameboard.getBoard()[0][6].length).toBe(3);
    expect(gameboard.getBoard()[0][8].length).toBe(2);
    expect(gameboard.getShips().length).toBe(5);
  });

  test("Vertically", () => {
    gameboard.placeShip(0, 9, "vertical");
    gameboard.placeShip(2, 9, "vertical");
    gameboard.placeShip(4, 9, "vertical");
    gameboard.placeShip(6, 9, "vertical");
    gameboard.placeShip(8, 9, "vertical");

    expect(gameboard.getBoard()[0][9].length).toBe(5);
    expect(gameboard.getBoard()[2][9].length).toBe(4);
    expect(gameboard.getBoard()[4][9].length).toBe(3);
    expect(gameboard.getBoard()[6][9].length).toBe(3);
    expect(gameboard.getBoard()[8][9].length).toBe(2);
    expect(gameboard.getShips().length).toBe(5);
  });
});

describe("Ship can not be placed if it overflows a border", () => {
  test("Horizontally", () => {
    gameboard.placeShip(6, 0, "horizontal");
    expect(gameboard.getBoard()[6][0]).toBeUndefined();

    gameboard.placeShip(5, 0, "horizontal");
    expect(gameboard.getBoard()[5][0].length).toBe(5);
  });

  test("Vertically", () => {
    gameboard.placeShip(0, 3, "vertical");
    expect(gameboard.getBoard()[0][3]).toBeUndefined();

    gameboard.placeShip(0, 4, "vertical");
    expect(gameboard.getBoard()[0][4].length).toBe(5);
  });
});

describe("Adjacent cells of ships are marked unavailable", () => {
  test("Horizontally", () => {
    gameboard.placeShip(3, 3, "horizontal");

    expect(gameboard.getBoard()[2][4]).toBe("unavailable");
    expect(gameboard.getBoard()[2][3]).toBe("unavailable");
    expect(gameboard.getBoard()[2][2]).toBe("unavailable");
    expect(gameboard.getBoard()[5][4]).toBe("unavailable");
    expect(gameboard.getBoard()[5][2]).toBe("unavailable");
    expect(gameboard.getBoard()[8][4]).toBe("unavailable");
    expect(gameboard.getBoard()[8][3]).toBe("unavailable");
    expect(gameboard.getBoard()[8][2]).toBe("unavailable");

    expect(gameboard.getBoard()[5][5]).toBeUndefined();
    expect(gameboard.getBoard()[5][1]).toBeUndefined();
    expect(gameboard.getBoard()[9][3]).toBeUndefined();
    expect(gameboard.getBoard()[1][3]).toBeUndefined();

    expect(gameboard.getBoard()[3][3].length).toBe(5);
  });

  test("Vertically", () => {
    gameboard.placeShip(3, 7, "vertical");

    expect(gameboard.getBoard()[2][8]).toBe("unavailable");
    expect(gameboard.getBoard()[3][8]).toBe("unavailable");
    expect(gameboard.getBoard()[4][8]).toBe("unavailable");
    expect(gameboard.getBoard()[2][5]).toBe("unavailable");
    expect(gameboard.getBoard()[4][5]).toBe("unavailable");
    expect(gameboard.getBoard()[2][2]).toBe("unavailable");
    expect(gameboard.getBoard()[3][2]).toBe("unavailable");
    expect(gameboard.getBoard()[4][2]).toBe("unavailable");

    expect(gameboard.getBoard()[3][9]).toBeUndefined();
    expect(gameboard.getBoard()[3][1]).toBeUndefined();
    expect(gameboard.getBoard()[1][5]).toBeUndefined();
    expect(gameboard.getBoard()[5][5]).toBeUndefined();

    expect(gameboard.getBoard()[3][7].length).toBe(5);
  });
});

describe("Ship can not be placed over or adjacent to other ship", () => {
  test("Horizontally", () => {
    gameboard.placeShip(3, 3, "horizontal");
    gameboard.placeShip(0, 3, "horizontal");
    gameboard.placeShip(3, 4, "horizontal");

    expect(gameboard.getBoard()[3][3].length).toBe(5);
    expect(gameboard.getBoard()[0][3]).toBeUndefined();
    expect(gameboard.getBoard()[3][4]).toBe("unavailable");
  });

  test("Vertically", () => {
    gameboard.placeShip(0, 4, "vertical");
    gameboard.placeShip(0, 7, "vertical");
    gameboard.placeShip(1, 4, "vertical");

    expect(gameboard.getBoard()[0][4].length).toBe(5);
    expect(gameboard.getBoard()[0][7]).toBeUndefined();
    expect(gameboard.getBoard()[1][4]).toBe("unavailable");
  });
});
