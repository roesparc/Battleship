/* global beforeEach, test, expect */

import Ship from "./ship";

let ship;

beforeEach(() => {
  ship = Ship(3);
});

test("Ship is created with the correct length", () => {
  expect(ship.length).toBe(3);
});

test("Ship number of hits and sunk status update correctly", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
