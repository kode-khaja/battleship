import Ship from './battleship.js';

test ('Should increment by 1 upon call', () => {
      const newShip = new Ship(1);
      newShip.gotHit();
      expect (newShip.hit).toBe(1);
})

test('gotHit() does not sink ship before reaching length', () => {
    const newShip = new Ship(3);
    newShip.gotHit();
    newShip.gotHit();
    expect(newShip.isSunk()).toBe(false);
  });

test ('Should return sunk = true upon hit', () => {
    const newShip = new Ship(1);
    newShip.gotHit();
    expect (newShip.isSunk()).toBe(true);
})

