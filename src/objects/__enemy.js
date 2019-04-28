let Enemy = function (row, col) {
    this.type = def.unit.enemy;
    MovingUnit.call(this, row, col, "enemy1");
    this.frame = 0;
}

Enemy.prototype = Object.create(MovingUnit.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype._update = function(fn) {
    
    if (this.isAvailable) {
        let availableDirections = [];
        let attackableDirections = [];
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
            
            let checkTile = this.checkTile(r, c);

            if (checkTile.isAvailable) {
                if (checkTile.type == "free") {
                    availableDirections.push(dirs[i]);
                } else if (checkTile.type == "enemy") {
                    attackableDirections.push(dirs[i]);
                }
            }
        }

        console.log(availableDirections);

        if (availableDirections.length > 0) {
            let min = {
                index: null,
                val: null
            }

            for (let i = 0; i < availableDirections.length; i++) {
                let aDir = availableDirections[i];
                let pPos = {row: _gameManager.player.row, col: _gameManager.player.col};
                let dis = Math.abs((aDir.row + aDir.col) - (pPos.row + pPos.col));

                if (min.index == null) {
                    min.index = i;
                    min.val = dis;
                } else if (dis < min.val) {
                    min.index = i;
                    min.val = dis;
                }
            }

            let shortestWay = availableDirections[min.index];
            this.setPos(shortestWay.row, shortestWay.col, fn);
        }
    }
}

Enemy.prototype.checkTile = function(row, col) {
    let tile = roomCreator.tileMap[row][col];
    if (tile.type === roomCreator.tileTypes.floorTile) {
        if (tile.containsUnit === false) {
            return {isAvailable: true, type: "free"}
        } else if (tile.containsUnit === 0) {
            return {isAvailable: true, type: "enemy"}
        } else {
            return {isAvailable: false}
        }
    } else {
        return {isAvailable: false}
    }
}