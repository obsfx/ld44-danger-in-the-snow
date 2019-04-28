function UI() {
    this.colors = [
        {l: 0xC0E5C8, c: 0x694873, bg: 0x112320},
        {l: 0xAFA060, c: 0x764134, bg: 0x140C0F},
        {l: 0xBED558, c: 0x756D54, bg: 0x1E171A},
        {l: 0xE9E6FF, c: 0x73683B, bg: 0x13262F},
        {l: 0xD0E37F, c: 0xD1603D, bg: 0x221D23},
    ];
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

UI.prototype.createStageText = function(text, x, y, size) {
    let label = game.add.text(x, y, text, { font: `${size}px Indie Flower`, fill: `#252525`});
    return label;
}