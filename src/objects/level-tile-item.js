let LevelTile = function (x, y, spriteName, level) {
    Phaser.Sprite.call(this, game, x, y, spriteName, 1);

    this.alpha = 0.6;
    this.level = level;

    game.add.existing(this);

    this.events.onInputDown.add(function() {
        def.level = this.level;
        let ui = new UI;
        ui.bgFadeOut(function(){game.state.start("MainState");})
    }, this);

    this.setDisable();
}

LevelTile.prototype = Object.create(Phaser.Sprite.prototype);
LevelTile.prototype.constructor = LevelTile;

LevelTile.prototype.update = function() {
    if (this._e) {
        if (this.input.pointerOver()) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0.6;
        }
    }
}

LevelTile.prototype.setEnable = function() {
    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.alpha = 0.6;

    this._e = true;
}

LevelTile.prototype.setDisable = function() {
    this.inputEnabled = false;
    this.alpha = 0.3;
    this._e = false;
}