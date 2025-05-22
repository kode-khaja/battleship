import Gameboard from './gameboard.js';


test ('Should place ship at coords given', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(4, 4, 3);
    expect (gameboard.shipOnBoard).toBe({x: 4, y: 4, ship: 3})
})