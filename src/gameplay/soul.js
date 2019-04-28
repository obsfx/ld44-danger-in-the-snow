let Soul = function (x, y, val) {
    Phaser.Sprite.call(this, game, x, y, "Soul");

    this.value = val;
    this.vel = 450;

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.bounce.setTo(0.5);

    game.add.existing(this);
}

Soul.prototype = Object.create(Phaser.Sprite.prototype);
Soul.prototype.constructor = Soul;

Soul.prototype.__revive = function() {
    this.alpha = 0;
    this.enableBody = false;

    let tween = game.add.tween(this).to( { alpha: 1 }, 600, "Linear", true);
    tween.onComplete.add(function() {
        this.enableBody = true;
    }, this);
}

Soul.prototype.__collected = function() {
    this.kill();
}

Soul.prototype.moveToPlayer = function(coords) {
    game.physics.arcade.moveToXY(this, coords.x, coords.y, this.vel);
}