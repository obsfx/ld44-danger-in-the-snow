const ContainerName = "content";
const AssetsDir = "assets";

const CellSize = 64;
const TotalCOL = 10;
const TotalROW = 10;

const outherTreeSpriteCount = 5;
const floorSpriteCount = 5;
const floorE_SpriteCount = 4;
const blockSpriteCount = 3;

const Screen = {
    Width: TotalCOL * CellSize,
    Height: TotalROW * CellSize
}

const AssetsPath = {
    Preloads: [
        {type: "spritesheet", key: "player1", path: `${AssetsDir}/units/p1.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy1", path: `${AssetsDir}/units/e1.png`, w: 64, h: 64, f: 2},
        {type: "audio", key: "enemydestroy", path: `${AssetsDir}/enemydestroy.wav`},
        {type: "audio", key: "enemytake", path: `${AssetsDir}/enemytake.wav`},
        {type: "audio", key: "fire", path: `${AssetsDir}/fire.wav`}
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

const EnemySpecs = [
    {
        acc: {a: 500, b: 800},
        bulletVel: 280,
        lookForPlayerRadius: 300,
        bulletTimeRnd: {min: 4, max: 8},
        damage: 18,
        hp: 140,
        soulValue: 35,
    },

    {
        acc: {a: 530, b: 800},
        bulletVel: 300,
        lookForPlayerRadius: 350,
        bulletTimeRnd: {min: 3, max: 7},
        damage: 40,
        hp: 450,
        soulValue: 85,
    },

    {
        acc: {a: 560, b: 800},
        bulletVel: 320,
        lookForPlayerRadius: 400,
        bulletTimeRnd: {min: 2, max: 7},
        damage: 90,
        hp: 1066,
        soulValue: 290,
    }
]

let Game = {
    souls: 400,
    baseSouls: 200,
    baseSacrifice: 100,
    sacrificedSouls: 0,
    uCount: 0,
    currentArena: 0,
    activeArena: 0,
    arenaStatus: [true, false, false, false],
    arenaReq: [0, 666, 4366, 6666],
    D: 1,
    main_music: null,
    arena_music: null,
}