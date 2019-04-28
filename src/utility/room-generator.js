function roomGenerator(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.tileMap = [];
    this.tileTypes = {
        floorTile: 0,
        outherTile: 1
    }

    this.outherTiles = [];
    for (let i = 1; i < outherTreeSpriteCount + 1; i++) {
        this.outherTiles.push(`t${i}`);
    }

    this.floorTiles = [];
    for (let i = 1; i < floorSpriteCount + 1; i++) {
        this.floorTiles.push(`f${i}`);
    }

    this.availablePositions = [];
}

roomGenerator.prototype.generate = function() {
    for (let i = 0; i < this.rows; i++) {
        this.tileMap.push([]);
        for (let j = 0; j < this.cols; j++) {

            let tile = {
                item: null,
                type: null,
                containsUnit: false
            };

            let x = j * CellSize;
            let y = i * CellSize;

            if (i == 0 || i == this.rows - 1 || j == 0 || j == this.cols - 1) {
                tile.item = new TileItem(x, y, this.outherTiles[game.rnd.integerInRange(0, this.outherTiles.length - 1)]);
                tile.type = this.tileTypes.outherTile;
            } else {
                tile.item = new TileItem(x, y, this.floorTiles[game.rnd.integerInRange(0, this.floorTiles.length - 1)]);
                tile.type = this.tileTypes.floorTile;
            }

            this.tileMap[i].push(tile);
        }
    }
}

roomGenerator.prototype.reCalculateAvailablePositions = function() {
    this.availablePositions = [];

    for (let i = 0; i < this.tileMap.length; i++) {
        for (let j = 0; j < this.tileMap[i].length; j++) {
            if (this.tileMap[i][j].type == this.tileTypes.floorTile && !this.tileMap[i][j].containsUnit) {
                this.availablePositions.push({r: i, c: j});
            }
        }
    }
}