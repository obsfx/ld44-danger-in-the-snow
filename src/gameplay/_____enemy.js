/*let Enemy = function (x, y, type) {
    
    this.__type = type;
    Phaser.Sprite.call(this, game, x, y, `EnemySprite${this.__type}`, 1);

    this.acc = EnemySpecs[this.__type].acc;
    this.hp = EnemySpecs[this.__type].hp;
    this.damage = EnemySpecs[this.__type].damage;
    this.soulValue = EnemySpecs[this.__type].soulValue;

    this.bulletVel = EnemySpecs[this.__type].bulletVel;

    this.playerLastSeen = null;
    this.lookForPlayerRadius = EnemySpecs[this.__type].lookForPlayerRadius;
    this.lookForPlayerShoot = null;

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(10, `EnemyBullet${this.__type}`);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('damage', this.damage);

    this.bulletQueue = [];
    
    this.anim = this.animations.add('idle');
    this.anim.play(10, true);

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.setCircle(20, 10, 10);

    this.body.bounce.setTo(0.1);

    this.timer = game.time.events.add(Phaser.Timer.SECOND * 1, this.shoot, this);
    this.bulletTimer = null;
    game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.bulletUpdate = function(coords) {
    for (let i in this.bulletQueue) {
        game.physics.arcade.moveToXY(this.bulletQueue[i], coords.x, coords.y, this.bulletVel);
    }
}

Enemy.prototype.lookForPlayer = function(coords) {
    let d = Phaser.Math.distance(coords.x, coords.y, this.x, this.y);
    if (d < this.lookForPlayerRadius) {
        this.playerLastSeen = {x: coords.x, y: coords.y};
        game.physics.arcade.moveToXY(this, coords.x, coords.y, this.acc.a, this.acc.b, this.acc.b);  
    } else {
        if (this.playerLastSeen != null) {
            game.physics.arcade.moveToXY(this, this.playerLastSeen.x, this.playerLastSeen.y, this.acc.a, this.acc.b, this.acc.b);
        }
    } 
}

Enemy.prototype.shoot = function() {
    let bullet = this.bullets.getFirstDead();
    bullet.reset(this.x + 25, this.y + 25);
    
    this.bulletTimer = game.time.events.add(Phaser.Timer.SECOND * game.rnd.between(3, 5), function() {
        let tween = game.add.tween(bullet).to( { alpha: 0 }, 300, "Linear", true);
        bullet.enableBody = false;
        tween.onComplete.add(function() {
            bullet.alpha = 1;
            bullet.enableBody = true;
            bullet.kill();
        }, this);
    }, this);

    this.bulletQueue.push(bullet);
    this.timer = game.time.events.add(Phaser.Timer.SECOND * game.rnd.between(EnemySpecs[this.__type].bulletTimeRnd.min, EnemySpecs[this.__type].bulletTimeRnd.max), this.shoot, this);
}

Enemy.prototype.__revive = function() {
    this.alpha = 0;
    this.enableBody = false;

    let tween = game.add.tween(this).to( { alpha: 1 }, 600, "Linear", true);
    tween.onComplete.add(function() {
        this.enableBody = true;
    }, this);
}

Enemy.prototype.__kill = function() {
    game.time.events.remove(this.timer);
    let tween = game.add.tween(this).to( { alpha: 0 }, 300, "Linear", true);
    this.enableBody = false;
    tween.onComplete.add(function() {
        this.kill();
    }, this);
}*/