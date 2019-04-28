let MovingUnit = function (row, col, sprite, type) {
    this.row = row;
    this.col = col;
    this.type = type;

    this.isAvailable = false;
    
    console.log(roomCreator);
    roomCreator.tileMap[this.row][this.col].containsUnit = this.type;
    
    Phaser.Sprite.call(this, game, this.col * CellSize, this.row * CellSize, sprite);
    
    this.frame = 0;
    game.add.existing(this);
}

MovingUnit.prototype = Object.create(Phaser.Sprite.prototype);
MovingUnit.prototype.constructor = MovingUnit;

MovingUnit.prototype.setPos = function(row, col, fn) {

    if ((col < this.col && this.frame == 0) || (col > this.col && this.frame == 1)) {
        this.frame = (this.frame == 0) ? 1 : 0;
    }
    roomCreator.tileMap[this.row][this.col].containsUnit = false;

    this.row = row;
    this.col = col;

    roomCreator.tileMap[this.row][this.col].containsUnit = this.type;

    let x = this.col * CellSize;
    let y = this.row * CellSize;

    this.isAvailable = false;

    game.add.tween(this)
        .to({x: x, y: y}, 500, Phaser.Easing.Sinusoidal.InOut, true)
        .onComplete.add(fn, this)
}