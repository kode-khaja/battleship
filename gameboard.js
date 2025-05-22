export default class Gameboard {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.shipOnBoard = []
        this.missedShots = []
    }



    placeShip(x, y, length) {
        const ship = new Ship(length);
        if (this.hasShip === false) {
        return this.shipOnBoard.push({x, y, ship})
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
         let coordHit;
         let shipOnCoords;

         if (this.hasShip(x, y) === true) {

            // i need to access gotHit() fuction here on the ship at these coords
            // do i look for these co-ords in the shipOnBoard array thru a loop and retrieve the ship from it

            // implementation:
            for (let i = 0; i < this.shipOnBoard.length; i++) {
                let tile = this.shipOnBoard[i]

                if (tile.x === x && tile.y === y) {
                    shipOnCoords = tile.ship
                }
            }
            shipOnCoords.gotHit()
            return shipOnCoords
           
         } else {
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
    


