function roomGenerator(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.tileMap = [];

    this.tileTypes = {
        floorTile: 0,
        outherTile: 1
    }

    this.offsetX = 0;

    if (this.cols != TotalCOL) {
        this.offsetX = (TotalCOL - this.cols) * 0.5 * CellSize;
    }

    this.outherTiles = [];
    for (let i = 1; i < outherTreeSpriteCount + 1; i++) {
        this.outherTiles.push(`t${i}`);
    }

    this.floorTiles = [];
    for (let i = 1; i < floorSpriteCount + 1; i++) {
        this.floorTiles.push(`f${i}`);
    }
    
    this.floorDecTiles = [];
    for (let i = 1; i < floorE_SpriteCount + 1; i++) {
        this.floorDecTiles.push(`e${i}`);
    }

    this.blockTiles = [];
    for (let i = 1; i < blockSpriteCount + 1; i++) {
        this.blockTiles.push(`b${i}`);
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

            let x = j * CellSize + this.offsetX;
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

    this.decorate();
    this.initBlocks();
}

roomGenerator.prototype.decorate = function() {
    this.reCalculateAvailablePositions();
    let randomFloorDecCount = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < randomFloorDecCount; i++) {
        let random = this.availablePositions.splice(Math.floor(Math.random() * this.availablePositions.length), 1)[0];
        this.tileMap[random.r][random.c].item.loadTexture(this.floorDecTiles[Math.floor(Math.random() * this.floorDecTiles.length)]);
    }
    this.reCalculateAvailablePositions();
}

roomGenerator.prototype.initBlocks = function() {
    this.reCalculateAvailablePositions();
    let randomBlockCount = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < randomBlockCount; i++) {
        let random = this.availablePositions.splice(Math.floor(Math.random() * this.availablePositions.length), 1)[0];
        console.log(this.tileMap[random.r][random.c]);
        this.tileMap[random.r][random.c].item.loadTexture(this.blockTiles[Math.floor(Math.random() * this.blockTiles.length)]);
        this.tileMap[random.r][random.c].type = this.tileTypes.outherTile;
    }
    this.reCalculateAvailablePositions();
}

roomGenerator.prototype.reCalculateAvailablePositions = function() {
    this.availablePositions = [];

    for (let i = 0; i < this.tileMap.length; i++) {
        for (let j = 0; j < this.tileMap[i].length; j++) {
            if (this.tileMap[i][j].type == this.tileTypes.floorTile && this.tileMap[i][j].containsUnit === false) {
                this.availablePositions.push({r: i, c: j});
            }
        }
    }
}