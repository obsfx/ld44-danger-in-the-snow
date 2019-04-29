let Enemy = function (row, col, level) {
    this.__damage = def.enemySpec[level].damage;
    this.maxhp = def.enemySpec[level].hp;
    this.hp = def.enemySpec[level].hp;
    this.soul = def.enemySpec[level].soul;

    MovingUnit.call(this, row, col, `enemy${level}`, def.unit.enemy);
    this.frame = 0;
    this.hpbar = new Phaser.Rectangle(this.x + 5, this.y, CellSize - 10, 10);
}

Enemy.prototype = Object.create(MovingUnit.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    if (this.hp > 0) {
        this.hpbar.x = this.x;
        this.hpbar.y = this.y;
    } else {
        this.hpbar.width = 0;
    }

    game.debug.geom(this.hpbar,'#b4202a');
}

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

        if (attackableDirections.length > 0 && availableDirections.length > 0) {
            //console.log(attackableDirections.length, attackableDirections);
            let shortestWay = this.findShortestWay(availableDirections);
            let attackDir = attackableDirections[Math.floor(Math.random() * attackableDirections.length)];

            let choice = (Math.random() > 0.2) ? "attack" : "move";
            
            if (choice == "move") this.setPos(shortestWay.row, shortestWay.col, fn);
            else {
                _gameManager.player.damageTaken(this.__damage);
                this.attack(attackDir, fn);
            }

        } else if (availableDirections.length > 0) {
            let shortestWay = this.findShortestWay(availableDirections);
            this.setPos(shortestWay.row, shortestWay.col, fn);
        } else {
            this.isAvailable = false;
            fn();
        }

    }
}

Enemy.prototype.findShortestWay = function(availableDirections) {
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

    return availableDirections[min.index];
}

Enemy.prototype.checkTile = function(row, col) {
    let tile = roomCreator.tileMap[row][col];
    if (tile.type === roomCreator.tileTypes.floorTile) {
        if (tile.containsUnit === false) {
            return {isAvailable: true, type: "free"}
        } else if (tile.containsUnit === def.unit.player) {
            console.log(tile.containsUnit, def.unit.player);
            return {isAvailable: true, type: "enemy"}
        } else {
            return {isAvailable: false}
        }
    } else {
        return {isAvailable: false}
    }
}

Enemy.prototype.damageTaken = function(takenDamage, index) {
    game.camera.shake(0.02, 80);
    game.camera.flash(0xffffff, 80);
    this.hp -= takenDamage;
    this.hpbar.width = ((CellSize - 10) / this.maxhp) * this.hp;
    if (this.hp < 1) {
        roomCreator.tileMap[this.row][this.col].containsUnit = false;
        console.log(this.soul, "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
        _gameManager.player.soulTaken(this.soul);
        this.kill();
        _gameManager.enemies.splice(index, 1);
    }
}