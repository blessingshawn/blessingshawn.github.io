var TestGame = {};

TestGame.Boot = function (game) {

	this.game = game;

};

TestGame.Boot.prototype = {

	preload: function () {

		//	Here we load the assets required for our preloader (in this case a background and a loading bar)
		this.load.image('preloaderBackground', './assets/Gfx/preloaderbackground.png');
		this.load.image('preloaderBar', './assets/Gfx/preloaderbar.png');

	},

	create: function () {

		//	Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
		this.game.input.maxPointers = 1;

		//	Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.game.stage.disableVisibilityChange = true;

        var ratio = this.getRatio('all', 1280, 720);

	    if (navigator.isCocoonJS) {
            this.game.world._container.scale.x = ratio.x;
            this.game.world._container.scale.y = ratio.y;
            this.game.world._container.updateTransform();
        }
        else if (this.game.device.desktop)
	    {
			//	If you have any desktop specific settings, they can go in here
		    this.game.stage.scale.pageAlignHorizontally = true;
	    }
	    else
	    {
			//	Same goes for mobile settings.
			//	In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
		    this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		    this.game.stage.scale.minWidth = 1280;
		    this.game.stage.scale.minHeight = 720;
		    this.game.stage.scale.maxWidth = 1280;
		    this.game.stage.scale.maxHeight = 720;
		    this.game.stage.scale.forceLandscape = true;
		    this.game.stage.scale.pageAlignHorizontally = true;
		    this.game.stage.scale.setScreenSize(true);
	    }

	    //	By this point the preloader assets have loaded to the cache, we've set the game settings
	    //	So now let's start the real preloader going
		this.game.state.start('preloader');

	},

    getRatio: function(type, w, h) {
        var scaleX = 1280 / w,
            scaleY = 720 / h,
            result = {
                x: 1,
                y: 1
            };

        switch (type) {
        case 'all':
            result.x = scaleX > scaleY ? scaleY : scaleX;
            result.y = scaleX > scaleY ? scaleY : scaleX;
            break;
        case 'fit':
            result.x = scaleX > scaleY ? scaleX : scaleY;
            result.y = scaleX > scaleY ? scaleX : scaleY;
            break;
        case 'fill':
            result.x = scaleX;
            result.y = scaleY;
            break;
        }

        return result;
    }	

};
