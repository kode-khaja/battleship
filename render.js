import Ship from './ship.js'
import Gameboard from './gameboard.js'


export function generateBoard(gameContainer, gameboard, tileClass) {
    gameContainer.innerHTML = '';


    for (let y = 0; y < gameboard.size; y++) {
        for(let x = 0; x < gameboard.size; x++) {
            const tile = document.createElement('div')
            tile.classList.add(tileClass)

            tile.dataset.x = x;
            tile.dataset.y = y;

            gameContainer.appendChild(tile)
        }
    }
}

export function clearBoards() {
    const gameContainer1 = document.querySelector('.player1board')
    const gameContainer2 = document.querySelector('.player2board')
    gameContainer1.innerHTML = ''
    gameContainer2.innerHTML = ''
}


export function tileLogic(gameboard, tileClass, playerTurns) {
    const gameContainer = document.querySelector('.game-container')
    const tiles = document.querySelectorAll(`.${tileClass}`)

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            let x = parseInt(tile.dataset.x)
            let y = parseInt(tile.dataset.y)
            playerTurns(x, y)
 })
}) 
}