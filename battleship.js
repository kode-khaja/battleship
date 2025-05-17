class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0;
        this.sunk = false
    }

    gotHit() {

    }

    isSunk() {
        if (this.hit === 1) {
            this.sunk = true
        }
    }
}