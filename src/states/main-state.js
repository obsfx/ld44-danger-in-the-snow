let def = {
    unit: {
        player: 0,
        enemy: 1
    }
}

let roomCreator;
let _gameManager;

let MainState = {
    
    create: function() {
        roomCreator = new roomGenerator(TotalROW, TotalCOL);
        roomCreator.generate();

        _gameManager = new gameManager();
        _gameManager.generateEnemies(5);
    },

    update: function() {
        _gameManager.update();
        //console.log(roomCreator);

        /*game.physics.arcade.overlap(this._player.bullets, this.enemies, this.playerBullet_EnemyOverlapHandler, null, this);
        game.physics.arcade.overlap(this._player, this.souls, this.soul_PlayerOverlapHandler, null, this);

        game.physics.arcade.collide(this._player, this.enemies, this.player_EnemyOverlapHandler, null, this);
        game.physics.arcade.collide(this.enemies, this.enemies, null, null, this);

        for (let i in this.enemies) {
            //game.debug.body(this.enemies[i]);
            this.enemies[i].lookForPlayer({x: this._player.x + 25, y: this._player.y + 25});
            this.enemies[i].lookForPlayerShoot = {x: this._player.x + 25, y: this._player.y + 25};
            this.enemies[i].bulletUpdate({x: this._player.x + 25, y: this._player.y + 25});
            game.physics.arcade.overlap(this._player, this.enemies[i].bullets, this.player_EnemyBulletOverlapHandler, null, this);
        }

        for (let i in this.souls) {
            //game.debug.body(this.souls[i]);
            this.souls[i].moveToPlayer({x: this._player.x + 25, y: this._player.y + 25});
        }

        this._player.checkForCircle({x: this.stageWH / 2, y: this.stageWH / 2}, this.stageCircle, this.UI);*/

    },

    render: function() {
        
        //game.debug.body(this._player.sprite);

    }
}