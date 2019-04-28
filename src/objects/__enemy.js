let Enemy = function (row, col) {
    MovingUnit.call(this, row, col, "enemy1", def.unit.enemy);
    this.frame = 0;
}

Enemy.prototype = Object.create(MovingUnit.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype._update = function(fn) {
    
    if (this.isAvailable) {
        let availableDirections = [];
        let dirs = [
            {row: this.row - 1, col: this.col},
            {row: this.row + 1, col: this.col},
            {row: this.row, col: this.col - 1},
            {row: this.row, col: this.col + 1}
        ];

        roomCreator.reCalculateAvailablePositions();

        for (let i = 0; i < dirs.length; i++) {
            let r = dirs[i].row;
            let c = dirs[i].col;
            console.log(r, c);
            if (roomCreator.tileMap[r][c].type === roomCreator.tileTypes.floorTile && roomCreator.tileMap[r][c].containsUnit === false) {
                availableDirections.push(dirs[i]);
            }
        }

        console.log(availableDirections);

        if (availableDirections.length > 0) {
            let randomDir = availableDirections[Math.floor(Math.random() * availableDirections.length)];
            this.setPos(randomDir.row, randomDir.col, fn);
        }
    }
}