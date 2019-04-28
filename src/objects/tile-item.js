let TileItem = function (x, y, spriteName) {
    Phaser.Sprite.call(this, game, x, y, spriteName, 1);

    game.add.existing(this);
}

TileItem.prototype = Object.create(Phaser.Sprite.prototype);
TileItem.prototype.constructor = TileItem;