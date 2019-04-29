let LevelTile = function (x, y, spriteName, level) {
    Phaser.Sprite.call(this, game, x, y, spriteName, 1);

    this.alpha = 0.75;
    this.level = level;

    game.add.existing(this);

    this.inputEnabled = true;

    this.events.onInputDown.add(function() {
        if (this._e) {
            def.level = this.level;
            ui.bgFadeOut(function(){game.state.start("MainState");})
        }
    }, this);
}

LevelTile.prototype = Object.create(Phaser.Sprite.prototype);
LevelTile.prototype.constructor = LevelTile;

LevelTile.prototype.update = function() {
    if (this._e) {
        if (this.input.pointerOver()) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0.75;
        }
    }
}

LevelTile.prototype.setEnable = function() {
    this.alpha = 0.75;
    this._e = true;
    this.input.useHandCursor = true;
}

LevelTile.prototype.setDisable = function() {
    this.alpha = 0.3;
    this._e = false;
    this.input.useHandCursor = false;
}