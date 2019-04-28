let Preload = {
    preload : function() {
        for (let i in AssetsPath.Preloads) {
            if (AssetsPath.Preloads[i].type == "spritesheet") {
                game.load.spritesheet(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path, 
                    AssetsPath.Preloads[i].w, 
                    AssetsPath.Preloads[i].h,
                    AssetsPath.Preloads[i].f
                );
            } else if (AssetsPath.Preloads[i].type == "image") {
                game.load.image(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            } else {
                game.load.audio(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            }
        }
    },

    create: function() {

        /*Game.main_music = game.add.audio('main');
        Game.arena_music = game.add.audio('arena');

        Game.main_music.volume = 0.5;
        Game.arena_music.volume = 0.1;

        Game.main_music.restart("", 0, 0.5, true);

        Game.collect = game.add.audio('collect');
        Game.takedmg = game.add.audio('takedmg');
        Game.enemydestroy = game.add.audio('enemydestroy');
        Game.enemytake = game.add.audio('enemytake');
        Game.fire = game.add.audio('fire');**/

        this.UI = new UI(Screen.Width, 100);
        this.UI.createStageText(`L O A D I N G`, Screen.Width / 2, Screen.Height / 2);

        this.UI.bgFadeOut(function(){game.state.start("MainState");})
    }
}