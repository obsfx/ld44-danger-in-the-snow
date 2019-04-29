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
    this.__damage = 25 * def.playerUpgrades[def.playerUpgradeLevel];
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
                    for (let j = 0; j < _gameManager.enemies.length; j++) {
                        let enemy = _gameManager.enemies[j];
                        if (enemy.row === dirs[i].row && enemy.col === dirs[i].col) {
                            console.log(this.__damage, "AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                            enemy.damageTaken(this.__damage, j);
                        }
                    }
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

Player.prototype.damageTaken = function(takenDamage) {
    game.camera.shake(0.02, 80);
    game.camera.flash(0xf77474, 80);
    def.playerSoul -= takenDamage;
    soulLabel.text = `SOULS: ${def.playerSoul}`;

    if (def.playerSoul < 1) {
        this.kill();
        ui.bgFadeOut(function(){game.state.start("GameOver");})
    }
}

Player.prototype.soulTaken = function(soul) {
    console.log(soul);
    game.camera.flash(0x0000ff, 80);
    def.playerSoul += soul;
    soulLabel.text = `SOULS: ${def.playerSoul}`;
}