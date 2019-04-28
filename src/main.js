/// <reference path="../defs/phaser.d.ts" />

var game = new Phaser.Game(config);
function run() {
    game.state.add("Preload", Preload);
    game.state.add("MainMenu", MainMenu);
    game.state.add("MainState", MainState);
    game.state.add("ArenaSelection", ArenaSelection);
    game.state.add("GameOver", GameOver);
    game.state.add("Win", Win);

    game.state.start("Preload");
}