export default class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0;
        this.sunk = false
        this.scored = false
    }

    gotHit() {

        this.hit++
        // this.isSunk() removed this

    }

    isSunk() {
        if (this.hit >= this.length) {
             this.sunk = true
        } return this.sunk
    }
}


 