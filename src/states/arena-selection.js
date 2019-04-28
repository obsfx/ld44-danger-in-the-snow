let ASTiles = null;
let levelTiles = null;

let def = {
    unit: {
        player: 0,
        enemy: 1
    },
    level: 0,
    player: {
        upgradeLevel: 0
    },
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
        [3, 4, 5],
        [4, 5],
        [4, 5]
    ],
    enemyCounts: [4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7],
    enemySpec: [
        {hp: 50, damage: 40, soul: 85},
        {hp: 75, damage: 60, soul: 115},
        {hp: 125, damage: 90, soul: 175},
        {hp: 190, damage: 140, soul: 290},
        {hp: 260, damage: 210, soul: 420},
        {hp: 360, damage: 300, soul: 605}
    ]
}

let ArenaSelection = {
    create: function() {
        
        ui.bgFadeIn(function(){});

        if (ASTiles == null) {
            let tiles = [];

            for (let i = 0; i < TotalROW; i++) {
                tiles.push([]);
                for (let j = 0; j < TotalCOL; j++) {
                    tiles[i].push(new TileItem(j * CellSize, i * CellSize, `f${Math.floor(Math.random() * floorSpriteCount) + 1}`));
                }
            }

            let levels = [];

            for (let i = 1; i < 7; i++) {
                levels.push(new LevelTile(i * CellSize + CellSize, 3 * CellSize, `s${i}`, i - 1));
            }

            for (let i = 7; i < 13; i++) {
                levels.push(new LevelTile((13 - i) * CellSize + CellSize, 4 * CellSize, `s${i}`, i - 1));
            }

            ASTiles = tiles;
            levelTiles = levels;

            levelTiles[0].setEnable();
        }
    }
}