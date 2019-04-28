let def = {
    unit: {
        player: 0,
        enemy: 1
    }
}

let roomCreator;
let _gameManager;

let ui;
let soulLabel;
let playerDamageLabel;
let turnLabel;

let MainState = {
    
    create: function() {
        ui = new UI();
        game.stage.backgroundColor = "#F8F8F8";

        turnLabel = ui.createStageText(`Your Turn`, CellSize / 2, (TotalROW - 2) * CellSize, 36);

        roomCreator = new roomGenerator(TotalROW - 2, TotalCOL - Math.floor(Math.random() * 4));
        roomCreator.generate();

        _gameManager = new gameManager();
        _gameManager.generateEnemies(4);

        soulLabel = ui.createStageText(`Souls: ${_gameManager.player.soul}`, CellSize / 2, (TotalROW - 2) * CellSize + CellSize / 2 + 20, 24);
        playerDamageLabel = ui.createStageText(`Your Damage: ${_gameManager.player.damage}`, CellSize / 2, (TotalROW - 2) * CellSize + CellSize + 15, 24);
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