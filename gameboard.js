import Ship from './ship.js'


export default class Gameboard {

    constructor(size) {
        this.shipOnBoard = []
        this.missedShots = []
        this.attacks = []
        this.size = size
    }


    reset() {
        this.shipOnBoard = []
        this.missedShots = []
        this.attacks = []
    }
    placeShip(x, y, length, direction = 'horizontal') {
        const ship = new Ship(length);
        for (let i = 0; i < ship.length; i++) {
            let newX 
            let newY 
            if (direction === 'horizontal') {               
                newX = x + i
                newY = y
                
            }
             if (direction === 'vertical') {
                newY = y + i
                newX = x
             }

            if (this.hasShip(newX, newY) || newX >= this.size || newY >= this.size)
                {
                 return undefined
              
            }
             
        }

            for (let i = 0; i < ship.length; i++) {
                let newX
                let newY
                if (direction === 'horizontal') {               
                    newX = x + i
                    newY = y
                } 
                if (direction === 'vertical') {
                    newX = x
                    newY = y + i
                }
            
           this.shipOnBoard.push({x: newX, y: newY, ship})
        }
        return {alreadyPlaced: true, x, y}
    }
       

    randomPlaceShip(length) {
        let result;

        function _randomizeDirection() {
            const randomDirection = Math.round(Math.random());
     
            return randomDirection === 0 ? 'horizontal' : 'vertical';
        }


        while(true) {

            let x;
            let y;

            const direction = _randomizeDirection()
 
            if (direction === 'horizontal') {
               x = Math.floor(Math.random() * (this.size - length))
               y = Math.floor(Math.random() * (this.size))
            }
            
            if (direction === 'vertical') {
                x = Math.floor(Math.random() * (this.size))
                y = Math.floor(Math.random() * (this.size - length))
            }

            result = this.placeShip(x, y, length, direction)

            
            if (result) return { x, y, length, direction } 
                }
        
            }
        




    hasShip(x, y) {
        for (let i = 0; i < this.shipOnBoard.length; i++) {
            let tile = this.shipOnBoard[i]
        
            if (tile.x === x && tile.y === y) {
                return true
             }
        } return false
    }



    receiveAttack(x, y) {

        if (this.attacks.some(coord => coord.x === x && coord.y === y)) {
             return {alreadyAttacked: true}
         }
         this.attacks.push({ x,y })

         if (this.hasShip(x, y)) {
                const tile = this.shipOnBoard.find(tile => tile.x === x && tile.y === y) 
                    tile.ship.gotHit()
                    return { hit: true, ship: tile.ship}
                }
                 else {
                    this.missedShots.push({ x, y} ) 
                    return { hit: false}
                     
                }
    }


    randomAttack() {
       
        let result;
        
        while (true) {

           let x = Math.floor(Math.random() * this.size)
           let y = Math.floor(Math.random() * this.size)

           result = this.receiveAttack(x, y) 

        if (!result.alreadyAttacked) {
           return { ...result, x, y}
    }
}
}
    

    missedAttack(x, y) {
        if (this.hasShip(x, y) !== true) {
        this.missedShots.push({x, y})
        return {x, y}
        }
    }



    showMissedAttacks() {
        return this.missedShots
    }



    allShipsSunk() {
        let shipOnCoords;
        for (let i = 0; i < this.shipOnBoard.length; i++) {
            let tile = this.shipOnBoard[i]

                shipOnCoords = tile.ship
                if (shipOnCoords.isSunk() === false) {
                    return false
                }
            } return true
        } 
}

