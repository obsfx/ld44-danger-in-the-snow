function UI(stageWH, circleMargin) {
    this.colors = [
        {l: 0xC0E5C8, c: 0x694873, bg: 0x112320},
        {l: 0xAFA060, c: 0x764134, bg: 0x140C0F},
        {l: 0xBED558, c: 0x756D54, bg: 0x1E171A},
        {l: 0xE9E6FF, c: 0x73683B, bg: 0x13262F},
        {l: 0xD0E37F, c: 0xD1603D, bg: 0x221D23},
    ];

    this.stageWH = stageWH;
    this.circleMargin = circleMargin;
    this.dotAmount = Math.floor(this.stageWH / this.circleMargin);
    this.rndRange = 100;
    this.rndColors = this.colors[game.rnd.between(0, this.colors.length - 1)];

    game.stage.backgroundColor = 0xF8F8F8;

    this.bgGraphics = game.add.graphics(0, 0);
    this.arenaGraphics = game.add.graphics(0, 0);
}

UI.prototype.createFadeBG = function() {
    let stageFadeBG = game.add.graphics(0, 0);
    stageFadeBG.fixedToCamera = true;
    stageFadeBG.beginFill(0x000000, 1);
    stageFadeBG.lineStyle(0, 0x0000FF, 1);
    stageFadeBG.drawRect(0, 0, Screen.Width, Screen.Height);

    return stageFadeBG;
}

UI.prototype.bgFadeIn = function(fn) {
    let bg = this.createFadeBG();
    bg.alpha = 1;
    let tween = game.add.tween(bg).to( { alpha: 0 }, 400, "Linear", true);
    tween.onComplete.add(function() {
        fn();
    }, this);
}

UI.prototype.bgFadeOut = function(fn) {
    let bg = this.createFadeBG();
    bg.alpha = 0;
    let tween = game.add.tween(bg).to( { alpha: 1 }, 400, "Linear", true);
    tween.onComplete.add(function() {
        fn();
    }, this);
}

UI.prototype.createStateBackground = function() {
    let k = [];

    for (let i = 0; i < this.dotAmount; i++) {
        for (let j = 0; j < this.dotAmount; j++) {
            let r = {x: j * this.circleMargin - (Math.floor(Math.random() * this.rndRange)) - this.rndRange / 2, y: i * this.circleMargin + (Math.floor(Math.random() * this.rndRange * 2) - this.rndRange)}
            let a = {x: (j - 1) * this.circleMargin, y: i * this.circleMargin};
            let b = {x: (j + 1) * this.circleMargin, y: (i + 1) * this.circleMargin};
            let c = {x: (j - 1) * this.circleMargin, y: (i + 1) * this.circleMargin};

            this.bgGraphics.lineStyle(3, this.rndColors.l, Math.random() * 0.2 + 0.05);
            
            this.bgGraphics.moveTo(a.x, a.y);
            this.bgGraphics.lineTo(b.x, b.y);
            this.bgGraphics.lineStyle(0, this.rndColors.l, 1);
            this.bgGraphics.endFill();

            k.push(r);
            k.push(a);
            k.push(b);
            k.push(c);
        }
    }

    for (let i in k) {
        this.bgGraphics.beginFill(this.rndColors.c, Math.random() * 0.6 + 0.05);
        this.bgGraphics.drawCircle(k[i].x, k[i].y, (Math.floor(Math.random() * 12)));
        this.bgGraphics.endFill();
    }
}

UI.prototype.createStageText = function(text, x, y) {
    let label = game.add.text(x, y, text, { font: `18px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
    label.x = x - label.width / 2;
    label.fixedToCamera = true;
    return label;
}

UI.prototype.createArenaGraphics = function() {

    this.circleA = game.add.graphics(0, 0);
    this.circleA.inputEnabled = true;
    this.circleA.input.useHandCursor = true;

    this.circleB = game.add.graphics(0, 0);
    this.circleB.inputEnabled = true;
    this.circleB.input.useHandCursor = true;
    
    this.circleC = game.add.graphics(0, 0);
    this.circleC.inputEnabled = true;
    this.circleC.input.useHandCursor = true;

    game.stage.backgroundColor = this.rndColors.bg;

    let points = [
        
        // purgatory:
        {
            x: 150,
            y: 300,
            r: 20,
            g: this.arenaGraphics,
            o: 0.2,
            text: "P U R G A T O R Y",
            ts: 10,
            k: null
        },

        // arenaA:
        {
            x: 220,
            y: 300,
            r: 50,
            g: this.circleA,
            o: 0.4,
            text: "I",
            ts: 12,
            k: 0
        },

        // arenaB:
        {
            x: 300,
            y: 300,
            r: 50,
            g: this.circleB,
            o: 0.6,
            text: "II",
            ts: 12,
            k: 1
        },

        // arenaC: 
        {
            x: 380,
            y: 300,
            r: 50, 
            g: this.circleC,
            o: 0.8,
            text: "III",
            ts: 12,
            k: 2
        },

        // heaven:
        {
            x: 450,
            y: 300,
            r: 20,
            g: this.arenaGraphics,
            o: 1,
            text: "H E A V E N",
            ts: 10,
            k: 3
        }
    ];

    for (let i = 0; i < points.length - 1; i++) {
        this.arenaGraphics.lineStyle(3, this.rndColors.l, 0.5 + ((i + 1) / 10));
        this.arenaGraphics.moveTo(points[i].x + points[i].r / 2, 300);
        this.arenaGraphics.lineTo(points[i + 1].x - points[i + 1].r / 2, 300);
        this.arenaGraphics.lineStyle(0, this.rndColors.l, 1);
        this.arenaGraphics.endFill();
    }

    function hover(p, o, c) {
        p.g.clear();
        p.g.beginFill(c, o);
        p.g.drawCircle(p.x, p.y, p.r);
        p.g.endFill();
    }

    for (let i in points) {
        let color = this.rndColors.c;

        if (points[i].k != null) {
            if (Game.arenaStatus[points[i].k]) {
                color = this.rndColors.c;
                points[i].g.events.onInputDown.add(function() {
                    Game.activeArena = points[i].k;
                    this.bgFadeOut(function() {
                        game.state.start("MainState");
                    })
                }, this);

            } else {
                color = this.rndColors.l;
                let a = "TO UNLOCK\nTHIS ARENA";;
                if (points[i].k == 3) a = "TO REACH\nTHE HEAVEN";

                let text = "SACRIFICE\n" + Game.arenaReq[points[i].k] +" SOULS\n" + a;
                if (points[i].k > 1 && !Game.arenaStatus[points[i].k - 1]) text = "\n\nLOCKED";

                let label = game.add.text(points[i].x, points[i].y - (points[i].r + 60), text, { font: `12px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
                label.x = points[i].x - label.width / 2;
                label.lineSpacing = -5;
            }
        }
        
        points[i].g.beginFill(color, points[i].o);
        points[i].g.drawCircle(points[i].x, points[i].y, points[i].r);
        points[i].g.endFill();

        points[i].g.events.onInputOver.add(function() {
            hover(points[i], 1, color);
        }, this);
        
        points[i].g.events.onInputOut.add(function() {
            hover(points[i], points[i].o, color);
        }, this);

        let label = game.add.text(points[i].x, points[i].y + points[i].r / 1.5 + 5, points[i].text, { font: `${points[i].ts}px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
        label.x = points[i].x - label.width / 2;
    }

    
    //this.drawSacrificeMenuButton(300, 100, this.rndColors.c, this.rndColors.l);
    /****** */
}

UI.prototype.drawUpgradeMenuButton = function(x, y) {
    let r = 40;

    let points = [
        {x: x, y: y - r / 3.5, o: 0.2},
        {x: x - r / 3.5, y: y, o: 0.4},
        {x: x + r / 3.5, y: y, o: 0.6}
    ]

    this.MBgraphics = game.add.graphics(0, 0);
    this.MBgraphics.inputEnabled = true;
    this.MBgraphics.input.useHandCursor = true;

    this.draw(0, points, r);

    this.MBgraphics.events.onInputOver.add(function() {
        this.draw(0.4, points, r);
    }, this);

    this.MBgraphics.events.onInputOut.add(function() {
        this.draw(0, points, r);
    }, this);

    this.MBgraphics.events.onInputDown.add(function() {
        this.sacrifice();
        this.soulsText.text = `S O U L S : ${Game.souls}`;
        this.sacSoulsText.text = `S A C R I F I C E D  S O U L S : ${Game.sacrificedSouls}`;
    }, this);

    let label = game.add.text(x, y + 10, "S A C R I F I C E  Y O U R  S O U L S  F O R  T H E  G O D", { font: `12px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
    label.x = x - label.width / 2;
    label.inputEnabled = true;
    label.input.useHandCursor = true;

    label.events.onInputOver.add(function() {
        this.draw(0.4, points, r);
    }, this);

    label.events.onInputOut.add(function() {
        this.draw(0, points, r);
    }, this);

    label.events.onInputDown.add(function() {
        this.sacrifice();
        this.soulsText.text = `S O U L S : ${Game.souls}`;
        this.sacSoulsText.text = `S A C R I F I C E D  S O U L S : ${Game.sacrificedSouls}`;
    }, this);  
}

UI.prototype.draw = function(o, points, r) {
    this.MBgraphics.clear();
    for (let i in points) {
        this.MBgraphics.beginFill(this.rndColors.c, points[i].o + o);
        this.MBgraphics.drawCircle(points[i].x, points[i].y, r);
        this.MBgraphics.endFill();
    }
}

UI.prototype.sacrifice = function() {
    if (Game.souls > Game.baseSouls) {
        let s = Game.souls - Game.baseSacrifice > Game.baseSouls ? Game.baseSacrifice : Game.souls - Game.baseSouls;

        Game.souls -= s;
        Game.sacrificedSouls += s; 
        Game.uCount += s;
        Game.collect.restart("", 0, 0.2, false);

        if (Game.uCount >= 300) {
            Game.D += 1;
            Game.uCount -= 300;
            this.soulLevelText.text = `S O U L  L E V E L : ${Game.D}`;
            //console.log(Game.uCount);
        }

        if (Game.currentArena + 1 == Game.arenaReq.length - 1 && Game.arenaReq[Game.currentArena + 1] <= Game.sacrificedSouls) {
            this.bgFadeOut(function(){
                game.state.start("Win");
            });
        } else if (Game.arenaReq[Game.currentArena + 1] <= Game.sacrificedSouls) {
            Game.currentArena += 1;
            Game.arenaStatus[Game.currentArena] = true;
            this.bgFadeOut(function(){
                game.state.start("ArenaSelection");
            });
        }
    }
}