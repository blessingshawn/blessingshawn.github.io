var pacman;
var pacBig = false;
var pacAnimPrefix = 'pac';
var pacAnimPlay;
var pacVelocity = 100;
var pacDirectionCurrent = 0;
var pacDirectionLast = 0;
var pacChangeDirection = false;

var pacCanMoveUp = false;
var pacCanMoveDown = false;
var pacCanMoveLeft = false;
var pacCanMoveRight = false;
var pacDoMove = false;
var pacMoveWhenX = 0;
var pacMoveWhenY = 0;
var pacSpeed = 2.0;
var pacMoveX = 0;
var pacMoveY = 0;
var pacTileHit = false;
var DirectionEnum = Object.freeze({"LEFT":1, "RIGHT":2, "UP":3, "DOWN":4});
var bGhost;
var oGhost;
var pGhost;
var rGhost;
var scaredGhost;
var eyesGhost;
var map;

var t;
var titlemusic; 
var startlevelsound;
var arPreventedKeys = [
            Phaser.Keyboard.SPACEBAR,
            ,Phaser.Keyboard.UP
            ,Phaser.Keyboard.DOWN
            ,Phaser.Keyboard.LEFT
            ,Phaser.Keyboard.RIGHT
        ];
var oneimage;
var twoimage;
var threeimage;
var player1image;
var scoretext;
var scoretextbackground;
var score = 0;
var cursors;

var starscount = 2000;
var starPosX = 0;
var starPosY = 0;
var starsWidth = 1280;
var starsHeight = 720;
var starAcceleration = 0.25;
var starArrayX = new Array(starscount);
var starArrayY = new Array(starscount);
var starSpeedX = 1.0;
var starSpeedY = 0.0;
var starPoint = new Array(starscount);

var rocketStarShip;

var pacLivesCount = 5;
var pacLivesImages = new Array(pacLivesCount);
var audioDotEater;

var ball;
var texture;

TestGame.Preloader = function (game) {

	this.game = game;
    
    this.background = null;
    this.preloadBar = null;
    this.ready = false;

};

TestGame.Preloader.prototype = {

	preload: function () {
        
        //	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(488, 350, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite, basically
		//	what that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

        this.game.load.atlas('pacman', './bin/Gfx/MyPacmen.png', './bin/Gfx/MyPacmen.json');
		this.game.load.atlasJSONHash('ghosts', './bin/Gfx/MyPacGhostAnim.png', './bin/Gfx/MyPacGhostAnim.json');

        this.game.load.tilemap('level1', './bin/maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset('tiles', './bin/Gfx/MyPacTiles.png', 32, 32);
    
        this.game.load.audio('titlemusic', ['./bin/Audio/Music/Title.mp3', './bin/Audio/Music/Title.ogg']);
        titlemusic = this.game.add.audio('titlemusic');
        titlemusic.volume = 1.0;

        this.game.load.audio('startlevelsound', ['./bin/Audio/Sounds/startlevel.mp3', './bin/Audio/Sounds/startlevel.ogg']);
        startlevelsound = this.game.add.audio('startlevelsound');
        startlevelsound.volume = 1.0;
        
        this.game.load.audio('audioDotEater', ['./bin/Audio/Sounds/Waka.mp3', './bin/Audio/Sounds/Waka.ogg']);
        audioDotEater = this.game.add.audio('audioDotEater');
        audioDotEater.volume = 1.0;

        this.game.load.image('one', './bin/Gfx/1.png');
        this.game.load.image('two', './bin/Gfx/2.png');
        this.game.load.image('three', './bin/Gfx/3.png');
        
        this.game.load.image('player1', './bin/Gfx/Player1.png');
        
        this.game.load.bitmapFont('pinballgray', './bin/Fonts/pinball_gray.png', './bin/Fonts/pinball_gray.xml');
        this.game.load.bitmapFont('pinballgold', './bin/Fonts/pinball_goldtrans.png', './bin/Fonts/pinball_goldtrans.xml');
        
        this.game.load.spritesheet('rocketstarship', './bin/Gfx/RocketStarshipAnim.png', 512,128, 3);
        
        this.game.load.image('ball', './bin/Gfx/pangball.png');

        this.game.input.keyboard.addKeyCapture(arPreventedKeys);
	},

	create: function () {
        
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while
		this.preloadBar.cropEnabled = false;

	},
    
    update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titlemusic') && (this.cache.isSoundDecoded('startlevelsound')) && this.ready == false)
		{
			this.ready = false;
            
            console.log('Preloade finished, lets go to the main menu automatically');
			
            this.game.state.start('mainmenu');
		}

	}

}
