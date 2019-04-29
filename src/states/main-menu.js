let MainMenu = {
    create: function() {
        ui.bgFadeIn(function(){});
        let tiles = [];

        for (let i = 0; i < TotalROW; i++) {
            tiles.push([]);
            for (let j = 0; j < TotalCOL; j++) {
                tiles[i].push(new TileItem(j * CellSize, i * CellSize, `f${Math.floor(Math.random() * floorSpriteCount) + 1}`));
            }
        }

        ui.createStageText(`DANGER IN THE SNOW`, TotalCOL / 2 * CellSize, 1 * CellSize - 24, 24);

        ui.createStageText(`LUDUM DARE 44 | @OBSFX | APRIL 2019`, TotalCOL / 2 * CellSize, 1 * CellSize, 24);
        ui.createStageText(`CREATED IN 48 HOURS`, TotalCOL / 2 * CellSize, 1 * CellSize + 24, 24);

        ui.createStageText(`YOU CAN PRESS [R]`, TotalCOL / 2 * CellSize, 6 * CellSize, 36);
        ui.createStageText(`TO START THE GAME !`, TotalCOL / 2 * CellSize, 6 * CellSize + 36, 36);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            ui.bgFadeOut(function(){game.state.start("ArenaSelection");})
        }
    }
}