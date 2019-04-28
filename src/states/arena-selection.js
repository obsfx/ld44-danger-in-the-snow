let ArenaSelection = {
    create: function() {
        
        this.UI = new UI(Screen.Width, 100);
        this.UI.bgFadeIn(function(){});
        
        this.UI.createArenaGraphics();
        this.UI.soulsText = this.UI.createStageText(`S O U L S : ${Game.souls}`, Screen.Width / 2, 380);
        this.UI.sacSoulsText = this.UI.createStageText(`S A C R I F I C E D  S O U L S : ${Game.sacrificedSouls}`, Screen.Width / 2, 405);

        let label = game.add.text(Screen.Width / 2, 440, "Y O U R  S O U L  W I L L  R E C I V E  U P G R A D E S", { font: `14px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        label.x = label.x - label.width / 2;
        let label2 = game.add.text(Screen.Width / 2, 460, "F O R  E V E R Y  3 0 0  S A C R I F I C E D  S O U L S", { font: `14px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        label2.x = label2.x - label2.width / 2;

        this.UI.soulLevelText = this.UI.createStageText(`S O U L  L E V E L : ${Game.D}`, Screen.Width / 2, 490);

        this.UI.stageHeadText = this.UI.createStageText(`S E L E C T  A R E N A`, Screen.Width / 2, 30);
        this.UI.drawUpgradeMenuButton(Screen.Width / 2, 100);

        Game.arena_music.stop();
        if (!Game.main_music.isPlaying) Game.main_music.restart("", 0, 0.5, true);
    }
}