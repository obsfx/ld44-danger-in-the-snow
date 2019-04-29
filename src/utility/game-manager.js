function gameManager() {
    this.states = {
        player: 0,
        enemy: 1
    }

    this.currentState = null

    roomCreator.reCalculateAvailablePositions();
    let rPos = roomCreator.availablePositions[Math.floor(Math.random() * roomCreator.availablePositions.length)];
    this.player = new Player(rPos.r, rPos.c);

    this.enemies = [];
    this.enemyIndex = 0;

    this.setStatePlayer();
}

gameManager.prototype.generateEnemies = function() {
    this.enemies = [];
    for (let i = 0; i < def.enemyCounts[def.level]; i++) {
        roomCreator.reCalculateAvailablePositions();
        let randomPos = roomCreator.availablePositions[Math.floor(Math.random() * roomCreator.availablePositions.length)];
        let level = def.enemiesInLevels[def.level][Math.floor(Math.random() * def.enemiesInLevels[def.level].length)];
        this.enemies.push(new Enemy(randomPos.r, randomPos.c, level));
    }
}

gameManager.prototype.update = function() {
    if (this.currentState == this.states.player) {
        this.player._update(function() {
            _gameManager.setStateEnemy();
        });
    } else if (this.currentState == this.states.enemy) {
        console.log(this.enemyIndex);
        this.enemies[this.enemyIndex]._update(function() {
            console.log(_gameManager);
            _gameManager.enemyIndex++;

            if (_gameManager.enemyIndex == _gameManager.enemies.length) {
                _gameManager.setStatePlayer();
            } else {
                _gameManager.enemies[_gameManager.enemyIndex].isAvailable = true;
            }
        });
    }
}

gameManager.prototype.setStatePlayer = function() {
    this.player.isAvailable = true;
    this.currentState = this.states.player;
    turnLabel.text = "YOUR TURN";
}

gameManager.prototype.setStateEnemy = function() {
    if (this.enemies.length > 0) {
        this.enemyIndex = 0;
        this.enemies[this.enemyIndex].isAvailable = true;
        this.currentState = this.states.enemy;
        turnLabel.text = "ENEMY TURN";
    } else {
        def.level++;
        if (def.level == 12) {
            ui.bgFadeOut(function(){game.state.start("Win");})
        } else {
            ui.bgFadeOut(function(){game.state.start("ArenaSelection");})
        }
    }
}