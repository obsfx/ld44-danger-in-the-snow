const ContainerName = "content";
const AssetsDir = "assets";

const CellSize = 64;
const TotalCOL = 10;
const TotalROW = 10;

const roadTileCount = 12;
const outherTreeSpriteCount = 5;
const floorSpriteCount = 5;
const floorE_SpriteCount = 4;
const blockSpriteCount = 3;
const weaponSpriteCount = 6;

const Screen = {
    Width: TotalCOL * CellSize,
    Height: TotalROW * CellSize
}

const AssetsPath = {
    Preloads: [
        {type: "spritesheet", key: "player1", path: `${AssetsDir}/units/p1.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy0", path: `${AssetsDir}/units/e0.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy1", path: `${AssetsDir}/units/e1.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy2", path: `${AssetsDir}/units/e2.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy3", path: `${AssetsDir}/units/e3.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy4", path: `${AssetsDir}/units/e4.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy5", path: `${AssetsDir}/units/e5.png`, w: 64, h: 64, f: 2},
        {type: "audio", key: "bgsong", path: `${AssetsDir}/sound/bgsong.mp3`},
        {type: "audio", key: "hurt", path: `${AssetsDir}/sound/hurt.wav`},
        {type: "audio", key: "hit", path: `${AssetsDir}/sound/damage.wav`}
    ]
}

for (let i = 1; i < outherTreeSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `t${i}`,
        path: `${AssetsDir}/outherTrees/t${i}.png`
    });
}

for (let i = 1; i < floorSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `f${i}`,
        path: `${AssetsDir}/floors/f${i}.png`
    });
}

for (let i = 1; i < floorE_SpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `e${i}`,
        path: `${AssetsDir}/floorsDec/e${i}.png`
    });
}

for (let i = 1; i < blockSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `b${i}`,
        path: `${AssetsDir}/blocks/b${i}.png`
    });
}

for (let i = 1; i < roadTileCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `s${i}`,
        path: `${AssetsDir}/levels/s${i}.png`
    });
}

for (let i = 1; i < weaponSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `w${i}`,
        path: `${AssetsDir}/upgrades/u${i}.png`
    });
}

const config = {
    width: Screen.Width,
    height: Screen.Height,
    type: Phaser.AUTO,
    parent: ContainerName,
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    pixelArt: true,
    antialias: true
};

let Game = {
    main_music: null,
    hit: null,
    hurt: null
}