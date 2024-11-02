TestGame.Game = function (game) {

	this.game = game;
    var bGameRun = false;
};

TestGame.Game.prototype = {
    

    preload: function () {

	},

	create: function () {

		this.game.stage.backgroundColor = '#000000';
        
        map = this.game.add.tilemap('level1');
        
        tileset = this.game.add.tileset('tiles');
        //  Basically this sets EVERY SINGLE tile to fully collide on all faces
        tileset.setCollisionRange(0, tileset.total - 2, true, true, true, true);
        //  And this turns off collision on the only tile we don't want collision on :)
        tileset.setCollision(3, false, false, false, false); // big diamond
        tileset.setCollision(11, false, false, false, false);// little diamonds
        tileset.setCollision(13, false, false, false, false);// empty space?
        
        layer = this.game.add.tilemapLayer(0, 0, 1280, 512, tileset, map, 0);
        //layer.resizeWorld();
		
        // Add the Pacman sprite and animation
		pacman = this.game.add.sprite(-32,  -32, 'pacman');
        pacman.anchor.setTo(0.0, 0.0);
        pacman.body.setSize(32, 32, 0, 0);
        pacman.body.immovable = false;
        pacman.body.allowCollision = true;
        
        pacman.animations.add('pacleft', Phaser.Animation.generateFrameNames('left', 1, 2, '', 4), 30, true);
        pacman.animations.add('pacrightup', Phaser.Animation.generateFrameNames('rightup', 1, 2, '', 4), 30, true);  
        pacman.animations.add('pacrightdown', Phaser.Animation.generateFrameNames('rightdown', 1, 2, '', 4), 30, true);
        pacman.animations.add('pacleftup', Phaser.Animation.generateFrameNames('leftup', 1, 2, '', 4), 30, true);  
        pacman.animations.add('pacleftdown', Phaser.Animation.generateFrameNames('leftdown', 1, 2, '', 4), 30, true);
        
        pacman.animations.add('paclargeright', Phaser.Animation.generateFrameNames('largeright', 1, 2, '', 4), 30, true);
        pacman.animations.add('paclargeleft', Phaser.Animation.generateFrameNames('largeleft', 1, 2, '', 4), 30, true);
        pacman.animations.add('paclargerightup', Phaser.Animation.generateFrameNames('largerightup', 1, 2, '', 4), 30, true);  
        pacman.animations.add('paclargerightdown', Phaser.Animation.generateFrameNames('largerightdown', 1, 2, '', 4), 30, true);
        pacman.animations.add('paclargeleftup', Phaser.Animation.generateFrameNames('largeleftup', 1, 2, '', 4), 30, true);  
        pacman.animations.add('paclargeleftdown', Phaser.Animation.generateFrameNames('largeleftdown', 1, 2, '', 4), 30, true);
        
        pacman.animations.add('pacright', Phaser.Animation.generateFrameNames('right', 1, 2, '', 4), 30, true);
        
        oneimage = this.game.add.sprite(this.game.world.width + this.game.cache.getImage('one').width /2, 0, 'one');
        oneimage.scale.setTo(1.0, 1.0);
        oneimage.anchor.setTo(0.5, 0.5);
        
        twoimage = this.game.add.sprite(0 - this.game.cache.getImage('two').width /2, 0, 'two');
        twoimage.scale.setTo(1.0, 1.0);
        twoimage.anchor.setTo(0.5, 0.5);
        
        threeimage = this.game.add.sprite(this.game.world.width + this.game.cache.getImage('three').width /2, 0, 'three');
        threeimage.scale.setTo(1.0, 1.0);
        threeimage.anchor.setTo(0.5, 0.5);

        player1image = this.game.add.sprite(5, 512, 'player1');
        player1image.scale.setTo(1.0, 1.0);
        
        var style = { font: "48px PinballGray", align: "left" };
        scoretextbackground = this.game.add.bitmapText(10, 512 + 35, '[[[[[[[[[[', style);
        style = { font: "48px PinballGold", align: "left" };
        scoretext = this.game.add.bitmapText(23, 512 + 33, '000000000', style);                                               

        this.countLives();
        
        startlevelsound.play();

        //  Here we'll chain 4 different tweens together and play through them all in a loop
        var threetween = this.game.add.tween(threeimage);
        threetween.to({ x: 0 - threeimage.width /2 }, 1000, Phaser.Easing.Linear.None);
        threetween.onComplete.add(this.firstTween, this);
        threetween.start();

        this.game.input.onDown.add(this.quitToMenu, this);

        //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
        //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
        cursors = this.game.input.keyboard.createCursorKeys();

	},
    
    countLives: function() {
        for (var i=0; i < pacLivesCount; i++)
        {
            pacLivesImages[i] = this.game.add.sprite(i * 32 + 5, 485, 'pacman');
            pacLivesImages[i].frameName = 'right0001';
        }
    },
    
    firstTween: function () {
        var twotween = this.game.add.tween(twoimage);
        twotween.to({ x: this.game.world.width + twoimage.width /2 }, 850, Phaser.Easing.Linear.None);
        twotween.onComplete.add(this.theEnd, this);
        twotween.start();
    },
    
    theEnd: function () {
        //  Here we'll chain 4 different tweens together and play through them all in a loop
        var onetween = this.game.add.tween(oneimage);
        onetween.to({ x: 0 - threeimage.width /2 }, 850, Phaser.Easing.Linear.None);
        onetween.onComplete.add(this.startGame, this);
        onetween.start();
    },
        
    startGame: function() {
        
        //Set our game start flag
        this.bGameRun = true;
        
        pacman.x = 0 + 20 * 32 -32;
        pacman.y = 0 + 10 * 32 -32;
        pacman.body.x = 0 + 20 * 32 -32;
        pacman.body.y = 0 + 10 * 32 -32;
        pacDirection = DirectionEnum.RIGHT;
        
    },

    quitToMenu: function () {
		
        layer.kill();
        
        startlevelsound.stop();

		console.log('lets quit! back to the main menu');

		this.game.state.start('mainmenu');

	},
    
    update: function(){
        
        if (this.bGameRun)
        {
            pacman.body.velocity.x = 0;
            pacman.body.velocity.y = 0;

            this.game.physics.collide(pacman, layer, this.pacTileHit(pacman, layer), null, this);
            //this.game.physics.collide(pacman, layer);
        
            if (pacBig)
            {
                pacAnimPrefix = 'paclarge';
            }
            
            if (cursors.up.isDown)
            {
                pacDirection = DirectionEnum.UP;
            }
            else if (cursors.down.isDown)
            {
                pacDirection = DirectionEnum.DOWN;
            }
            if (cursors.left.isDown)
            {
                pacDirection = DirectionEnum.LEFT;
            }
            else if (cursors.right.isDown)
            {
                pacDirection = DirectionEnum.RIGHT;
            }
            
            //Lets use the direction to move our little guy
            if (pacDirection == DirectionEnum.RIGHT)
            {
                pacAnimPlay = pacAnimPrefix + 'right';
                pacMoveX = pacVelocity;
                pacMoveY = 0;
                pacDoMove = true;
            }
            else if (pacDirection == DirectionEnum.LEFT)
            {
                pacAnimPlay = pacAnimPrefix + 'left';
                pacMoveX = pacVelocity * -1;
                pacMoveY = 0;
                pacDoMove = true;
            }
            else if (pacDirection == DirectionEnum.UP)
            {
                pacAnimPlay = pacAnimPrefix + 'rightup';
                pacMoveX = 0;
                pacMoveY = pacVelocity * -1;
                pacDoMove = true;
            }
            else if (pacDirection == DirectionEnum.DOWN)
            {
                pacAnimPlay = pacAnimPrefix + 'rightdown';
                pacMoveX = 0;
                pacMoveY = pacVelocity;
                pacDoMove = true;
            }
        }
        
    },
    
    pacTileHit: function(pacObj, layerObj) {
        pacTileHit = true;

        var collidingTile = map.getTile(layerObj.getTileX(pacObj.x), layerObj.getTileY(pacObj.y));;
        
        //Get colliding tile
        if (pacObj.body.touching.left)
        {
            collidingTile = map.getTile(layerObj.getTileX(pacObj.x) - 1, layerObj.getTileY(pacObj.y));
        }
        else if (pacObj.body.touching.right)
        {
            collidingTile = map.getTile(layerObj.getTileX(pacObj.x) + 1, layerObj.getTileY(pacObj.y));
        }
        else if (pacObj.body.touching.up)
        {
            collidingTile = map.getTile(layerObj.getTileX(pacObj.x), layerObj.getTileY(pacObj.y) -1);
        }
        else if (pacObj.body.touching.down)
        {
            collidingTile = map.getTile(layerObj.getTileX(pacObj.x), layerObj.getTileY(pacObj.y) +1);
        }
        else if (pacObj.body.touching.none)
        {
            collidingTile = 0;
        }
        
        if (collidingTile == 12)
        {
            //Eating dot
            map.putTile(0, layerObj.getTileX(pacObj.x), layerObj.getTileY(pacObj.y), 0);
            if (!audioDotEater.isPlaying)
            {
                audioDotEater.play();
            }
            score = score + 100;
        }
        else if (collidingTile == 4)
        {
            //Eating Power dot
            if (!pacBig)
            {
                pacBig = true;
                pacObj.body.setSize(32, 32, pacObj.width/2 - 16 , pacObj.height/2 - 16);
            }
            
            map.putTile(0, layerObj.getTileX(pacObj.x), layerObj.getTileY(pacObj.y), 0);
            score = score + 1000;
        }
        else if (collidingTile != 0)
        {
            pacMoveX = 0;
            pacMoveY = 0;
        }
    
        scoretext.setText(new String("000000000" + score).slice(-9));
        
        pacTileHit = false;
        
    },
    
    checkAvailableDirection: function() {
        
        var uTile = map.getTile(layer.getTileX(pacman.x), layer.getTileY(pacman.y) -1);
        var dTile = map.getTile(layer.getTileX(pacman.x), layer.getTileY(pacman.y) +1);
        var lTile = map.getTile(layer.getTileX(pacman.x) - 1, layer.getTileY(pacman.y));
        var rTile = map.getTile(layer.getTileX(pacman.x) + 1, layer.getTileY(pacman.y));
        
        if (uTile == 12 || uTile == 4 || uTile == 0) 
        { 
            pacCanMoveUp = true;
            pacMoveWhenX = layer.getTileX(pacman.x) * 32 + 16;
            pacMoveWhenY = (layer.getTileY(pacman.y) -1) * 32 + 16;
        }
        else { pacCanMoveUp = false; }
        if (dTile == 12 || dTile == 4 || dTile == 0) 
        {
            pacCanMoveDown = true; 
            pacMoveWhenX = layer.getTileX(pacman.x) * 32 + 16;
            pacMoveWhenY = (layer.getTileY(pacman.y) +1) * 32 + 16;
        }
        else { pacCanMoveDown = false; }
        if (lTile == 12 || lTile == 4 || lTile == 0) 
        {
            pacCanMoveLeft = true;
            pacMoveWhenX = (layer.getTileX(pacman.x) -1) * 32 + 16;
            pacMoveWhenY = (layer.getTileY(pacman.y) ) * 32 + 16;
        }
        else { pacCanMoveLeft = false; }
        if (rTile == 12 || rTile == 4 || rTile == 0) 
        {
            pacCanMoveRight = true;
            pacMoveWhenX = (layer.getTileX(pacman.x) + 1) * 32 + 16;
            pacMoveWhenY = layer.getTileY(pacman.y) * 32 + 16;
        }
        else { pacCanMoveRight = false; }
    
    },

    render: function() {
        if (this.bGameRun)
        {
            if (pacDoMove)
            {
                if (pacman.x % 32 == 0 && pacman.y % 32 ==0)
                {
                    pacman.animations.play( pacAnimPlay, 5, true);
                    pacman.body.velocity.x = pacMoveX;
                    pacman.body.velocity.y = pacMoveY;
                    pacDoMove = false;
                }
            }
        }
        
        var currentTile = map.getTile(layer.getTileX(pacman.x), layer.getTileY(pacman.y));
        
        this.game.debug.renderText('Tile X: ' + layer.getTileX(pacman.x), 600, 615, 'rgb(255,255,255)');
        this.game.debug.renderText('Tile Y: ' + layer.getTileY(pacman.y), 600, 630, 'rgb(255,255,255)');
        this.game.debug.renderText('currentTileIndex: ' + currentTile, 600, 600, 'rgb(255,255,255)');
        //this.game.debug.renderText('Pacman X: ' + pacman.x, 32, 48, 'rgb(255,255,255)');
        //this.game.debug.renderText('Pacman Y: ' + pacman.y, 32, 64, 'rgb(255,255,255)');
        this.game.debug.renderRectangle(pacman.body);
        this.game.debug.renderSpriteInfo(pacman, 300, 600);
    
        this.game.debug.renderText('pacCanMoveDown: ' + pacCanMoveDown.toString(), 600, 645, 'rgb(255,255,255)');
        this.game.debug.renderText('pacCanMoveUp: ' + pacCanMoveUp.toString(), 600, 660, 'rgb(255,255,255)');
        this.game.debug.renderText('pacCanMoveLeft: ' + pacCanMoveLeft.toString(), 600, 675, 'rgb(255,255,255)');
        this.game.debug.renderText('pacCanMoveRight: ' + pacCanMoveRight.toString(), 600, 690, 'rgb(255,255,255)');

        this.game.debug.renderText('pacMoveWhenX: ' + pacMoveWhenX, 900, 600, 'rgb(255,255,255)');
        this.game.debug.renderText('pacMoveWhenY: ' + pacMoveWhenY, 900, 615, 'rgb(255,255,255)');
        this.game.debug.renderText('pacDirection: ' + pacDirection, 900, 630, 'rgb(255,255,255)');
        this.game.debug.renderText('pacDoMove: ' + pacDoMove.toString(), 900, 645, 'rgb(255,255,255)');
        this.game.debug.renderText('pacTileHit: ' + pacTileHit.toString(), 900, 665, 'rgb(255,255,255)');
        this.game.debug.renderSpriteCollision(pacman, 90, 600);

    }
    

}

