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

gameManager.prototype.generateEnemies = function(enemyCount) {
    this.enemies = [];
    for (let i = 0; i < enemyCount; i++) {
        roomCreator.reCalculateAvailablePositions();
        let randomPos = roomCreator.availablePositions[Math.floor(Math.random() * roomCreator.availablePositions.length)];
        this.enemies.push(new Enemy(randomPos.r, randomPos.c));
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
    turnLabel.text = "Your Turn";
}

gameManager.prototype.setStateEnemy = function() {
    if (this.enemies.length > 0) {
        this.enemyIndex = 0;
        this.enemies[this.enemyIndex].isAvailable = true;
        this.currentState = this.states.enemy;
        turnLabel.text = "Enemy Turn";
    } else {
        turnLabel.text = "You Cleared The Stage!";
    }
}