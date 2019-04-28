/*let Player = function () {
    Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, "PlayerSprite", 1);

    this.vel = 250;
    this.tailVel = 160;
    this.fireRate = 110;
    this.nextFire = 0;
    this.damage = 10;

    this.controls = {
        up: Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left: Phaser.Keyboard.A,
        right: Phaser.Keyboard.D,
        R: Phaser.Keyboard.R
    }

    this.tail = game.add.sprite(game.world.centerX, game.world.centerY, 'PlayerTail');
    this.ghost = game.add.sprite(game.world.centerX, game.world.centerY, 'PlayerTail');

    this.ghost.alpha = 0;
    
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(60, "PlayerBullet")
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    
    this.anim = this.animations.add('idle');
    this.anim.play(10, true);

    game.physics.arcade.enable(this);
    game.physics.arcade.enable(this.tail);
    game.physics.arcade.enable(this.ghost);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.setCircle(20, 10, 10);
    this.body.bounce.setTo(0.5);

    this.tail.body.checkCollision.up = false;
    this.tail.body.checkCollision.down = false;

    this.ghost.body.collideWorldBounds = true;
    this.ghost.body.checkCollision.up = false;
    this.ghost.body.checkCollision.down = false;

    game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

    this.ghost.body.velocity.x = 0;
    this.ghost.body.velocity.y = 0;

    if (game.input.keyboard.isDown(this.controls.up)) {
        this.ghost.body.velocity.y = -this.vel;
    }

    if (game.input.keyboard.isDown(this.controls.down)) {
        this.ghost.body.velocity.y = this.vel;
    }
    
    if (game.input.keyboard.isDown(this.controls.left)) {
        this.ghost.body.velocity.x = -this.vel;
    }
    if (game.input.keyboard.isDown(this.controls.right)) {
        this.ghost.body.velocity.x = this.vel;
    }

    if (game.input.activePointer.isDown){
        this.fire();
    }

    game.physics.arcade.moveToObject(this, this.ghost, this.vel, this.vel * 1.2, this.vel * 1.2);
    game.physics.arcade.moveToObject(this.tail, this, this.tailVel, this.tailVel * 1.2, this.tailVel * 1.2);
}

Player.prototype.fire = function() {
    if (game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        this.nextFire = game.time.now + this.fireRate;
        let bullet = this.bullets.getFirstDead();
        bullet.reset(this.tail.x + 3, this.tail.y + 3);
        game.physics.arcade.moveToPointer(bullet, this.vel * 2);
        Game.fire.restart("", 0, 0.1, false);
        //game.camera.shake(0.015, 40);
    }
}

Player.prototype.checkForCircle = function(circleCoords, g, ui) {
    let d = Phaser.Math.distance(circleCoords.x, circleCoords.y, this.x + 25, this.y + 25) - g.width / 2;
    if (d < 0) {
        g.alpha = 0.6;
        if (game.input.keyboard.isDown(this.controls.R)) {
            this.body.enable = false;

            ui.bgFadeOut(function() {
                game.state.start("ArenaSelection")
            });
        }
    } else {
        g.alpha = 0.2;
    }
}*/