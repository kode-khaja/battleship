export default class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0;
        this.sunk = false
    }

    gotHit() {

        this.hit++
        this.isSunk()
    }

    isSunk() {
        if (this.hit >= this.length) {
             this.sunk = true
        } return this.sunk
    }
}


 