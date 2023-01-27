export default function Ship(length) {
  let numberOfHits = 0;
  let sunk = false;

  const hit = () => {
    numberOfHits += 1;
  };

  const isSunk = () => {
    if (numberOfHits >= length) {
      sunk = true;
    }

    return sunk;
  };

  return { hit, isSunk };
}
