let ui = new UI();
let def;

let Preload = {
    preload : function() {
        game.stage.backgroundColor = "#F8F8F8";
        ui.createStageText(`LOADING`, TotalCOL / 2 * CellSize, TotalROW / 2 * CellSize, 36);

        for (let i in AssetsPath.Preloads) {
            if (AssetsPath.Preloads[i].type == "spritesheet") {
                game.load.spritesheet(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path, 
                    AssetsPath.Preloads[i].w, 
                    AssetsPath.Preloads[i].h,
                    AssetsPath.Preloads[i].f
                );
            } else if (AssetsPath.Preloads[i].type == "image") {
                game.load.image(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            } else {
                game.load.audio(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            }
        }
    },

    create: function() {

        def = {
            unit: {
                player: 0,
                enemy: 1
            },
            level: 0,
            playerSoul: 100,
            playerUpgradeLevel: 0,
            playerUpgrades: [1, 1.5, 2.1, 2.8, 3.8, 5],
            playerPriceList: [180, 360, 520, 750, 1000],
            enemiesInLevels: [
                [0],
                [0, 1],
                [0, 1, 2],
                [1, 2],
                [1, 2],
                [2, 3],
                [2, 3],
                [3, 4],
                [3, 4],
                [4],
                [4],
                [5]
            ],
            enemyCounts: [6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9],
            enemySpec: [
                {hp: 50, damage: 40, soul: 85},
                {hp: 75, damage: 60, soul: 115},
                {hp: 125, damage: 90, soul: 195},
                {hp: 190, damage: 140, soul: 290},
                {hp: 260, damage: 210, soul: 430},
                {hp: 360, damage: 300, soul: 600}
            ],
            upgradesDone: false
        };

        Game.main_music = game.add.audio('bgsong');
        Game.main_music.volume = 0.5;
        Game.main_music.restart("", 0, 0.5, true);
        Game.hurt = game.add.audio('hurt');
        Game.hit = game.add.audio('hit');

        

        ui.bgFadeOut(function(){game.state.start("MainMenu");})
    }
}