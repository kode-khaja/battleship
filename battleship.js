import Ship from './ship.js'
import Gameboard from './gameboard.js'
import { generateBoard, tileLogic, clearBoards } from './render.js'



document.addEventListener('DOMContentLoaded', () => {
  console.log('dom fully loaded');
  
  
  const gameContainer = document.querySelector('.game-container')
  const gameContainer1 = document.querySelector('.player1board')
  const gameContainer2 = document.querySelector('.player2board')
  const winningMsgDiv = document.createElement('div')
  winningMsgDiv.classList.add('winning-msg')
  gameContainer.appendChild(winningMsgDiv)
  let player1board;
  let player2board;
  const p1ScoreDisplay = document.querySelector('.p1-score')
  const p2ScoreDisplay = document.querySelector('.p2-score')
  const scoreDisplay = document.querySelector('.scoreboard')
  let player1Score = 0;
  let player2Score = 0;




  let currentTurn = 'player'


  driver()


   


  function driver() {
    const startBtn = document.querySelector('.start')

    startBtn.addEventListener('click', () => {

        if (startBtn.innerText === 'START!') {
        startBtn.innerText = 'END';
        gameContainer.removeAttribute('hidden') 
        scoreDisplay.removeAttribute('hidden')
        // gameContainer.style.display = 'flex'
        // scoreDisplay.style.display = 'block'
        winningMsgDiv.innerHTML = '';
        currentTurn = 'player'

        p1ScoreDisplay.innerHTML = `<span class="player-tags">PLAYER 1 - ${player1Score}</span>`;
        p2ScoreDisplay.innerHTML = `<span class="player-tags">PLAYER 2 - ${player2Score}</span>`;


        player1board = new Gameboard(8)
        player1board.randomPlaceShip(1)
        player1board.randomPlaceShip(2)
        player1board.randomPlaceShip(3)
        player1board.randomPlaceShip(5)

        player2board = new Gameboard(8)
        player2board.randomPlaceShip(1)
        player2board.randomPlaceShip(2)
        player2board.randomPlaceShip(3)
        player2board.randomPlaceShip(5)
  

  generateBoard(gameContainer1, player1board, 'item')
  generateBoard(gameContainer2, player2board, 'item2')

  
  setTimeout(() => {
    tileLogic(player2board, 'item2', (x, y) => {
      player1Turn(x, y)
  
      if (currentTurn === 'player2') {
        setTimeout(() => player2Turn(), 500)
      }
    })
  }, 0)
  
        }
        else if (startBtn.innerText === "END") {
        startBtn.innerText = 'START!';

        player1Score = 0;
        player2Score = 0;
        p1ScoreDisplay.innerHTML = `<span class="player-tags">PLAYER 1 - ${player1Score}</span>`;
        p2ScoreDisplay.innerHTML = `<span class="player-tags">PLAYER 2 - ${player2Score}</span>`;
        
        winningMsgDiv.textContent = ''

        // scoreDisplay.style.display = 'none'
        // gameContainer.style.display = 'none'
        scoreDisplay.setAttribute('hidden', '') 
        gameContainer.setAttribute('hidden', '')

        player1board = new Gameboard(8)
        player1board.randomPlaceShip(1)
        player1board.randomPlaceShip(2)
        player1board.randomPlaceShip(3)
        player1board.randomPlaceShip(5)

        player2board = new Gameboard(8)
        player2board.randomPlaceShip(1)
        player2board.randomPlaceShip(2)
        player2board.randomPlaceShip(3)
        player2board.randomPlaceShip(5)

        player1board.reset()
        player2board.reset()
        generateBoard(gameContainer1, player1board, 'item')
        generateBoard(gameContainer2, player2board, 'item2')

        setTimeout(() => {
          tileLogic(player2board, 'item2', (x, y) => {
            player1Turn(x, y)
        
            if (currentTurn === 'player2') {
              setTimeout(() => player2Turn(), 500)
            }
          })
        }, 0)
        



        }
    })

}
  



  function player1Turn(x, y) {
    if (currentTurn != 'player') return

    const tileDOM = document.querySelector(`.item2[data-x="${x}"][data-y="${y}"]`)

    const attackResult = player2board.receiveAttack(x, y)
    const { hit, ship } = attackResult

    let sunkShip 
   
     if (attackResult.hit === true) {
       tileDOM.style.backgroundColor = '#5f382e'
       player2board.shipOnBoard.forEach(tile => {
        tile.ship.isSunk()
         if (tile.ship.isSunk() === true) {
         sunkShip = tile.ship
         }
         if (tile.ship === sunkShip) {
           let sunkShipComplete = document.querySelector(`.item2[data-x="${tile.x}"][data-y="${tile.y}"]`)
           if (tile.ship.sunk === true) {
             sunkShipComplete.style.backgroundColor = 'red'
             if (tile.ship.scored === false) {
             player1Score++
             tile.ship.scored = true
            }
          }
        }
        })
           p1ScoreDisplay.innerHTML = `<span class="player-tags">PLAYER 1 - ${player1Score}</span>`
  }
   else {
       tileDOM.style.backgroundColor = 'white'
       tileDOM.innerText = 'X'
   }
   
   
        if (player2board.allShipsSunk()) {
          setTimeout(() =>
            clearBoards(), 500)

          setTimeout(() =>
          winningMsgDiv.innerHTML = '<h3>Player 1 Won!</h3>', 500)
        
         return
         }
   currentTurn = 'player2'

   setTimeout(() => player2Turn(), 500)
     
  }




  function player2Turn() {
    if (currentTurn != 'player2') return
    const result = player1board.randomAttack()
    const {x, y, hit, ship} = result

    const tileDOM = document.querySelector(`.item[data-x="${x}"][data-y="${y}"]`)
   
    let sunkShip 
   
     if (result.hit === true) {
       tileDOM.style.backgroundColor = '#5f382e'
       player1board.shipOnBoard.forEach(tile => {
        tile.ship.isSunk()
         if (tile.ship.isSunk() === true) {
         sunkShip = tile.ship
         }
         if (tile.ship === sunkShip) {
           let sunkShipComplete = document.querySelector(`.item[data-x="${tile.x}"][data-y="${tile.y}"]`)
           if (tile.ship.sunk === true) {
             sunkShipComplete.style.backgroundColor = 'red'
             if (tile.ship.scored === false) {
             player2Score++
             tile.ship.scored = true
            }
          }
        }
        })
           p2ScoreDisplay.innerHTML = `<span class="player-tags">PLAYER 2 - ${player2Score}</span>`
  }


  else {
      tileDOM.style.backgroundColor = 'white'
      tileDOM.innerText = 'X'
  }
  
    if (player1board.allShipsSunk()) {
      setTimeout(() =>
        clearBoards(), 500)

      setTimeout(() =>
      winningMsgDiv.innerHTML = '<h3>Player 2 Won!</h3>', 500
    )
     return
     }
    
    currentTurn = 'player'

  }


})

  