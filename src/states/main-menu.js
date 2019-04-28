let MainMenu = {
    create: function() {
        this.UI = new UI(Screen.Width - 100, 150);
        this.UI.bgFadeIn(function(){});

        this.UI.createStateBackground();

        game.add.text(20, 10, "P U R", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 100, "G A", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 190, "T O", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 280, "R Y", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        
        game.add.text(20, 460, "C R E A T E D  I N  4 8  H O U R S", { font: `24px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 485, "F O R  L U D U M  D A R E  4 3  B Y  @OBSFX", { font: `24px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 510, "T W I T T E R . C O M / O B S F X", { font: `12px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});

        this.UI.createStageText(`Y O U  C A N  P R E S S  [ R ]  T O  S T A R T  T H E  G A M E`, Screen.Width / 2, Screen.Height / 2 + 250);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.UI.bgFadeOut(function(){game.state.start("ArenaSelection");})
        }
    }
}