let GameOver = {
    create: function() {

        this.UI = new UI(Screen.Width, 100);
        this.UI.bgFadeIn(function(){});
        
        this.UI.createStageText(`P U R G A T O R Y  |  L U D U M  D A R E  4 3`, Screen.Width / 2, Screen.Height / 2 - 150);
        this.UI.createStageText(`C R E A T E D  I N  4 8  H O U R S  B Y  @OBSFX`, Screen.Width / 2, Screen.Height / 2 - 125);
        
        this.UI.createStageText(`G A M E  O V E R`, Screen.Width / 2, Screen.Height / 2);
        this.UI.createStageText(`T H A N K  Y O U  F O R  P L A Y I N G  T H I S  G A M E  !`, Screen.Width / 2, Screen.Height / 2 + 25);
        this.UI.createStageText(`Y O U  C A N  P R E S S  [ R ]  T O  P L A Y  A G A I N`, Screen.Width / 2, Screen.Height / 2 + 50);

        Game.main_music.stop();
        Game.arena_music.stop();

        Game = {
            souls: 400,
            baseSouls: 200,
            baseSacrifice: 100,
            sacrificedSouls: 0,
            uCount: 0,
            currentArena: 0,
            arenaStatus: [true, false, false, false],
            arenaReq: [0, 666, 4366, 6666],
            D: 1
        };
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.UI.bgFadeOut(function(){game.state.start("Preload");})
        }
    }

}