let MovingUnit = function (row, col, sprite, __type) {
    this.row = row;
    this.col = col;
    this.__type = __type;
    console.log(this.__type);

    this.isAvailable = false;
    
    Phaser.Sprite.call(this, game, this.col * CellSize + roomCreator.offsetX, this.row * CellSize, sprite);
    
    this.frame = 0;
    game.add.existing(this);
    roomCreator.tileMap[this.row][this.col].containsUnit = this.__type;
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

    roomCreator.tileMap[this.row][this.col].containsUnit = this.__type;

    let x = this.col * CellSize + roomCreator.offsetX;
    let y = this.row * CellSize;

    this.isAvailable = false;

    game.add.tween(this)
        .to({x: x, y: y}, 120, Phaser.Easing.Sinusoidal.InOut, true)
        .onComplete.add(fn, this)
}

MovingUnit.prototype.attack = function(dir, fn) {
    this.isAvailable = false;
    console.log("attacked", this.__type);

    if ((dir.col < this.col && this.frame == 0) || (dir.col > this.col && this.frame == 1)) {
        this.frame = (this.frame == 0) ? 1 : 0;
    }

    let animT = {
        x: this.col * CellSize + roomCreator.offsetX,
        y: this.row * CellSize
    };

    let gap = CellSize / 3;

    if (this.col - dir.col < 0) animT.x += gap;
    else if (this.col - dir.col > 0) animT.x -= gap; 

    if (this.row - dir.row < 0) animT.y += gap;
    else if ((this.row - dir.row > 0)) animT.y -= gap;

    game.add.tween(this)
        .to({x: animT.x, y: animT.y}, 50, Phaser.Easing.Sinusoidal.InOut, true)
        .onComplete.add(function() {
            game.add.tween(this)
                .to({x: this.col * CellSize + roomCreator.offsetX, y: this.row * CellSize}, 50, Phaser.Easing.Sinusoidal.InOut, true)
                .onComplete.add(fn, this)
        }, this);
}