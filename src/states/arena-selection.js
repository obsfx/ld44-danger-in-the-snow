let soulsLabel;
let currentItemLabel;
let upgradeLabel;
let damageLabel;
let nextUpgradeLabel;
let itemTile;

let press = false;

let ArenaSelection = {
    create: function() {
        
        ui.bgFadeIn(function(){});
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

        itemTile = new TileItem((TotalCOL / 2 - 1) * CellSize + CellSize / 2, 7 * CellSize, `w${def.playerUpgradeLevel + 1}`);

        soulsLabel = ui.createStageText(`SOULS: ${def.playerSoul}`, TotalCOL / 2 * CellSize, 1 * CellSize, 36);

        ui.createStageText(`YOU CAN PRESS [R]`, TotalCOL / 2 * CellSize, 2 * CellSize, 18);
        ui.createStageText(`TO PURCHASE NEXT UPGRADE`, TotalCOL / 2 * CellSize, 2 * CellSize + 18, 18);

        currentItemLabel = ui.createStageText("CURRENT ITEM", TotalCOL / 2 * CellSize, 5 * CellSize + 55, 24)
        upgradeLabel = ui.createStageText(`WEAPON UPGRADE LEVEL: ${def.playerUpgradeLevel + 1}`, TotalCOL / 2 * CellSize, 6 * CellSize + 10, 24);
        damageLabel = ui.createStageText(`DAMAGE: ${25 * def.playerUpgrades[def.playerUpgradeLevel]}`, TotalCOL / 2 * CellSize, 6 * CellSize + 30, 24);
        
        if (!def.upgradesDone) {
            nextUpgradeLabel = ui.createStageText(`NEXT UPGRADE: ${def.playerPriceList[def.playerUpgradeLevel]} SOULS`, TotalCOL / 2 * CellSize, 7 * CellSize + 70, 24);
        } else {
            nextUpgradeLabel = ui.createStageText(`ALL UPGRADES ARE PURCHASED`, TotalCOL / 2 * CellSize, 7 * CellSize + 70, 24);
        }

        for (let i = 0; i < levels.length; i++) {
            if (i == def.level) levels[i].setEnable();
            else levels[i].setDisable();
        }
    },

    update: function() {
        if (!press) {
            press = true;
            if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                console.log("aa");
                if (def.playerSoul - def.playerPriceList[def.playerUpgradeLevel] > 0 && !def.upgradesDone) {
                    def.playerSoul = def.playerSoul - def.playerPriceList[def.playerUpgradeLevel];
                    def.playerUpgradeLevel++;
                    itemTile.loadTexture(`w${def.playerUpgradeLevel + 1}`);
                    soulsLabel.text = `SOULS: ${def.playerSoul}`;
                    upgradeLabel.text = `WEAPON UPGRADE LEVEL: ${def.playerUpgradeLevel + 1}`;
                    damageLabel.text = `DAMAGE: ${25 * def.playerUpgrades[def.playerUpgradeLevel]}`;

                    if (def.playerUpgradeLevel < def.playerPriceList.length) {
                        nextUpgradeLabel.text = `NEXT UPGRADE: ${def.playerPriceList[def.playerUpgradeLevel]} SOULS`;
                    } else {
                        def.upgradesDone = true;
                        nextUpgradeLabel.text = `ALL UPGRADES ARE PURCHASED`;
                    }
                }
            }
        }

        if (!game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            press = false;
        }
    }
}