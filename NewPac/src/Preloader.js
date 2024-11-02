var pacman;
var pacStartTileX = 20;
var pacStartTileY = 9;
var pacBig = false;
var pacAnimPrefix = 'pac';
var pacAnimPlay;
var pacVelocity = 100;
var pacDirection = 0;
var pacDoMove = false;
var pacChangeDirection = false;
var pacMoveX = 0;
var pacMoveY = 0;
var pacLivesCount = 5;
var pacLivesImages = new Array(pacLivesCount);

var DirectionEnum = Object.freeze({"LEFT":1, "RIGHT":2, "UP":3, "DOWN":4});
var pacMoves = new Array(10);
var tileMovesX = new Array(10);
var tileMovesY = new Array(10);

var ghostStartTileX = 18;
var ghostStartTileY = 7;
var bGhost;
var bGhostVelocity = 30;
var bGhostMoveDone = true;
var bGhostMoves;
var bGhostAnimPlay;
var bGhostMoveX = 0;
var bGhostMoveY = 0;
var bGhostDoMove = false;

var oGhost;
var oGhostVelocity = 30;
var oGhostMoveDone = true;
var oGhostMoves;
var oGhostAnimPlay;
var oGhostMoveX = 0;
var oGhostMoveY = 0;
var oGhostDoMove = false;

var pGhost;
var pGhostVelocity = 30;
var pGhostMoveDone = true;
var pGhostMoves;
var pGhostAnimPlay;
var pGhostMoveX = 0;
var pGhostMoveY = 0;
var pGhostDoMove = false;

var rGhost;
var rGhostVelocity = 30;
var rGhostMoveDone = true;
var rGhostMoves;
var rGhostAnimPlay;
var rGhostMoveX = 0;
var rGhostMoveY = 0;
var rGhostDoMove = false;

var scaredGhost;
var eyesGhost;

var bGhostMoveIndex = 0;
var currentGhostMoveX = 0;
var currentGhostMoveY = 0;

var oGhostMoveIndex = 0;
var ocurrentGhostMoveX = 0;
var ocurrentGhostMoveY = 0;

var pGhostMoveIndex = 0;
var pcurrentGhostMoveX = 0;
var pcurrentGhostMoveY = 0;

var rGhostMoveIndex = 0;
var rcurrentGhostMoveX = 0;
var rcurrentGhostMoveY = 0;

var pathfinder;
var walkables = [12, 4, 0];
var marker;

var map;
var mapStartX = 0;
var mapStartY = 0;

var totalDots = 0;

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

var audioDotEater;

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

        this.game.load.atlas('pacman', './assets/Gfx/MyPacmen.png', './assets/Gfx/MyPacmen.json');
		this.game.load.atlasJSONHash('ghosts', './assets/Gfx/MyPacGhostAnim.png', './assets/Gfx/MyPacGhostAnim.json');

        this.game.load.tilemap('level1', './assets/maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tileset('tiles', './assets/Gfx/MyPacTiles.png', 32, 32);
    
        this.game.load.audio('titlemusic', ['./assets/Audio/Music/Title.mp3', './assets/Audio/Music/Title.ogg']);
        titlemusic = this.game.add.audio('titlemusic');
        titlemusic.volume = 1.0;

        this.game.load.audio('startlevelsound', ['./assets/Audio/Sounds/startlevel.mp3', './assets/Audio/Sounds/startlevel.ogg']);
        startlevelsound = this.game.add.audio('startlevelsound');
        startlevelsound.volume = 1.0;
        
        this.game.load.audio('audioDotEater', ['./assets/Audio/Sounds/Waka.mp3', './assets/Audio/Sounds/Waka.ogg']);
        audioDotEater = this.game.add.audio('audioDotEater');
        audioDotEater.volume = 1.0;

        this.game.load.image('one', './assets/Gfx/1.png');
        this.game.load.image('two', './assets/Gfx/2.png');
        this.game.load.image('three', './assets/Gfx/3.png');
        
        this.game.load.image('player1', './assets/Gfx/Player1.png');
        
        this.game.load.bitmapFont('pinballgray', './assets/Fonts/pinball_gray.png', './assets/Fonts/pinball_gray.xml');
        this.game.load.bitmapFont('pinballgold', './assets/Fonts/pinball_goldtrans.png', './assets/Fonts/pinball_goldtrans.xml');
        
        this.game.load.spritesheet('rocketstarship', './assets/Gfx/RocketStarshipAnim.png', 512,128, 3);
        
        this.game.load.image('ball', './assets/Gfx/pangball.png');

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
            //this.game.state.start('game');
		}

	}

}
