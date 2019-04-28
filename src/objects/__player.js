let Player = function (row, col) {
    this.controls = {
        up: Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left: Phaser.Keyboard.A,
        right: Phaser.Keyboard.D,
        R: Phaser.Keyboard.R
    }

    this.soul = 50;
    
    MovingUnit.call(this, row, col, "player1", def.unit.player);
    this.frame = 0;
}

Player.prototype = Object.create(MovingUnit.prototype);
Player.prototype.constructor = Player;

Player.prototype._update = function(fn) {
    if (this.isAvailable) {

        let dirs = [
            {row: this.row - 1, col: this.col, control: this.controls.up},
            {row: this.row + 1, col: this.col, control: this.controls.down},
            {row: this.row, col: this.col - 1, control: this.controls.left},
            {row: this.row, col: this.col + 1, control: this.controls.right}
        ];

        for (let i = 0; i < dirs.length; i++) {
            let checkTile = this.checkTile(dirs[i].control, dirs[i].row, dirs[i].col);
            if (checkTile.isAvailable) {
                if (checkTile.type == "free") {
                    this.setPos(dirs[i].row, dirs[i].col, fn);
                    break;
                } else if (checkTile.type == "enemy") {
                    this.attack(dirs[i], fn);
                }
            }
        }
    }
}

Player.prototype.checkTile = function(key, row, col) {
    let tile = roomCreator.tileMap[row][col];
    if (game.input.keyboard.isDown(key) && tile.type === roomCreator.tileTypes.floorTile) {
        if (tile.containsUnit === false) {
            return {isAvailable: true, type: "free"}
        } else if (tile.containsUnit !== def.unit.player) {
            return {isAvailable: true, type: "enemy"}
        } else {
            return {isAvailable: false}
        }
    } else {
        return {isAvailable: false}
    }
}