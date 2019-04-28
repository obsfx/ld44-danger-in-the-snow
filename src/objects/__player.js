let Player = function (row, col) {
    this.controls = {
        up: Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left: Phaser.Keyboard.A,
        right: Phaser.Keyboard.D,
        R: Phaser.Keyboard.R
    }
    
    MovingUnit.call(this, row, col, "player1", def.unit.player);
    this.frame = 0;
}

Player.prototype = Object.create(MovingUnit.prototype);
Player.prototype.constructor = Player;

Player.prototype._update = function(fn) {
    if (this.isAvailable) {
        if (game.input.keyboard.isDown(this.controls.up) 
        && roomCreator.tileMap[this.row - 1][this.col].type === roomCreator.tileTypes.floorTile
        && roomCreator.tileMap[this.row - 1][this.col].containsUnit === false) {
            this.setPos(this.row - 1, this.col, fn);
        } else if (game.input.keyboard.isDown(this.controls.down) 
        && roomCreator.tileMap[this.row + 1][this.col].type === roomCreator.tileTypes.floorTile
        && roomCreator.tileMap[this.row + 1][this.col].containsUnit === false) {
            this.setPos(this.row + 1, this.col, fn);
        } else if (game.input.keyboard.isDown(this.controls.left) 
        && roomCreator.tileMap[this.row][this.col - 1].type === roomCreator.tileTypes.floorTile
        && roomCreator.tileMap[this.row][this.col - 1].containsUnit === false) {
            this.setPos(this.row, this.col - 1, fn);
        } else if (game.input.keyboard.isDown(this.controls.right) 
        && roomCreator.tileMap[this.row][this.col + 1].type === roomCreator.tileTypes.floorTile
        && roomCreator.tileMap[this.row][this.col + 1].containsUnit === false) {
            this.setPos(this.row, this.col + 1, fn);
        }
    }
}