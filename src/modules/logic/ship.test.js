import Ship from "./ship";

/* global test, expect */

test("Ship number of hits and sunk status update correctly", () => {
  const ship = Ship(3);

  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
