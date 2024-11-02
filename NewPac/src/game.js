TestGame.Game = function (game) {

	this.game = game;
    var bGameRun = false;
};

TestGame.Game.prototype = {
    

    preload: function () {

	},

	create: function () {

		this.game.stage.backgroundColor = '#000000';
        
        this.game.world.setBounds(0 - 64, 0, 1280 + 64, 720);
        this.game.camera.setBoundsToWorld = true;
        
        map = this.game.add.tilemap('level1');
        tileset = this.game.add.tileset('tiles');
        layer = this.game.add.tilemapLayer(mapStartX, mapStartY, 1280, 512, tileset, map, 0);
        layer.fixedToCamera = false;
        //layer.resizeWorld();
        
        pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathfinder.setGrid(map.layers[0].data, walkables);
        
        //Lets get the total Dots to complete level from the map
        this.countDots();
		
        // Add the Pacman sprite and animation
		pacman = this.game.add.sprite(mapStartX + (pacStartTileX * this.game.cache.getFrameByName('pacman', 'left0001').width) + 16,  mapStartY + (pacStartTileY * this.game.cache.getFrameByName('pacman', 'left0001').height) + 16, 'pacman');
        pacman.anchor.setTo(0.5, 0.5);
        pacman.body.setSize(32, 32, 0, 0);
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

        // Add the Blue Ghost and Animation
		bGhost = this.game.add.sprite(mapStartX + (ghostStartTileX * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').width) + 16,  mapStartY + (ghostStartTileY * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').height) + 16, 'ghosts');
        bGhost.anchor.setTo(0.5, 0.5);
		bGhost.animations.add('down', [4, 5], 5, true);		
		bGhost.animations.add('left', [6, 7], 5, true);
		bGhost.animations.add('right', [8, 9], 5, true);
		bGhost.animations.add('up', [10, 11], 5, true);
		bGhost.animations.play('up', 5, true); 
		// Add the Orange Ghost and Animation
		oGhost = this.game.add.sprite(mapStartX + ((ghostStartTileX - 1) * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').width) + 16,  mapStartY + (ghostStartTileY * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').height) + 16, 'ghosts');
        oGhost.anchor.setTo(0.5, 0.5);
		oGhost.animations.add('down', [12, 13], 5, true);
		oGhost.animations.add('left', [14, 15], 5, true);
		oGhost.animations.add('right', [16, 17], 5, true);
		oGhost.animations.add('up', [18, 19], 5, true);
		oGhost.animations.play('up', 5, true);
        // Add the Pink Ghost and Animation
		pGhost = this.game.add.sprite(mapStartX + ((ghostStartTileX + 3) * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').width) + 16,  mapStartY + (ghostStartTileY * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').height) + 16, 'ghosts');
        pGhost.anchor.setTo(0.5, 0.5);
		pGhost.animations.add('down', [20, 21], 5, true);
		pGhost.animations.add('left', [22, 23], 5, true);
		pGhost.animations.add('right', [24, 25], 5, true);
		pGhost.animations.add('up', [26, 27], 5, true);
		pGhost.animations.play('up', 5, true);
		// Add the Red Ghost and Animation
		rGhost = this.game.add.sprite(mapStartX + ((ghostStartTileX + 4) * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').width) + 16,  mapStartY + (ghostStartTileY * this.game.cache.getFrameByName('ghosts', 'ghost_scared_1.png').height) + 16, 'ghosts');
        rGhost.anchor.setTo(0.5, 0.5);
		rGhost.animations.add('down', [28, 29], 5, true);
		rGhost.animations.add('left', [30, 31], 5, true);
		rGhost.animations.add('right', [32, 33], 5, true);
		rGhost.animations.add('up', [34, 35], 5, true);
		rGhost.animations.play('up', 5, true);
        
        oneimage = this.game.add.sprite(this.game.world.width + this.game.cache.getImage('one').width / 2, 0, 'one');
        oneimage.scale.setTo(1.0, 1.0);
        oneimage.anchor.setTo(0.5, 0.5);
        
        twoimage = this.game.add.sprite(0 - this.game.cache.getImage('two').width / 2, 0, 'two');
        twoimage.scale.setTo(1.0, 1.0);
        twoimage.anchor.setTo(0.5, 0.5);
        
        threeimage = this.game.add.sprite(this.game.world.width + this.game.cache.getImage('three').width / 2, 0, 'three');
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
        
        this.blueFindPathTo(ghostStartTileX, ghostStartTileY, layer.getTileX(pacman.x), layer.getTileY(pacman.y));
        this.orangeFindPathTo(ghostStartTileX - 1, ghostStartTileY, layer.getTileX(pacman.x), layer.getTileY(pacman.y));
        this.pinkFindPathTo(ghostStartTileX + 3, ghostStartTileY, layer.getTileX(pacman.x), layer.getTileY(pacman.y));
        this.redFindPathTo(ghostStartTileX + 4, ghostStartTileY, layer.getTileX(pacman.x), layer.getTileY(pacman.y));
        this.game.input.onDown.add(this.quitToMenu, this);

        //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
        //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
        cursors = this.game.input.keyboard.createCursorKeys();

	},
    
    update: function(){
        
        if (this.bGameRun)
        {
            pacman.body.velocity.x = 0;
            pacman.body.velocity.y = 0;

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
            
            //Lets put our wanted direction on the pacMovesArray
            if (pacMoves.length != 0)
            {
                //Is the last move the same as the wanted move
                if (pacMoves[pacMoves.length - 1] != pacDirection)
                {
                    pacMoves.push(pacDirection);
                }
            }
            else
            {
                //pacMoves is empty so add current
                pacMoves.push(pacDirection);
            }
            

            // We have a move, and the last move was complete so lets do the next move!
            if (pacMoves.length !=0 && pacDoMove == false)
            {
                //grab the first move in the moves array
                var pacMove = pacMoves.shift();
                
                //If the tileMovesX Array is not empty then use next moves tile
                if (tileMovesX.length != 0)
                {
                    var pacCanMove = this.isMoveAvailable(tileMovesX[0], tileMovesY[0], pacMove);
                }
                else //If the tileMovesX Array is empty then use pacman's current tile
                {
                    var pacCanMove = this.isMoveAvailable(pacman.x / 32, pacman.y / 32, pacMove);
                }
                
                
                //Lets use the direction to move our little guy
                if (pacMove == DirectionEnum.RIGHT && pacCanMove)
                {
                    pacAnimPlay = pacAnimPrefix + 'right';
                    pacMoveX = pacVelocity;
                    pacMoveY = 0;
                    pacDoMove = true;
                }
                else if (pacMove == DirectionEnum.LEFT && pacCanMove)
                {
                    pacAnimPlay = pacAnimPrefix + 'left';
                    pacMoveX = pacVelocity * -1;
                    pacMoveY = 0;
                    pacDoMove = true;
                }
                else if (pacMove == DirectionEnum.UP && pacCanMove)
                {
                    pacAnimPlay = pacAnimPrefix + 'rightup';
                    pacMoveX = 0;
                    pacMoveY = pacVelocity * -1;
                    pacDoMove = true;
                }
                else if (pacMove == DirectionEnum.DOWN && pacCanMove)
                {
                    pacAnimPlay = pacAnimPrefix + 'rightdown';
                    pacMoveX = 0;
                    pacMoveY = pacVelocity;
                    pacDoMove = true;
                }
            }
            
            if (bGhostMoveDone)
            {
                this.dobGhostMove();
            }
            if (oGhostMoveDone)
            {
                this.dooGhostMove();
            }
            if (pGhostMoveDone)
            {
                this.dopGhostMove();
            }
            if (rGhostMoveDone)
            {
                this.dorGhostMove();
            }
            
        }
    },
    
    render: function() {
        if (this.bGameRun)
        {
            if (pacDoMove)
            {
                pacman.animations.play( pacAnimPlay, 5, true);
                pacman.body.velocity.x = pacMoveX;
                pacman.body.velocity.y = pacMoveY;
                pacDoMove = false;
            }
            
            if (bGhostDoMove)
            {
                bGhost.animations.play( bGhostAnimPlay, 5, true);
                bGhost.body.velocity.x = bGhostMoveX;
                bGhost.body.velocity.y = bGhostMoveY;
            }
            if (bGhostDoMove && !bGhostMoveDone)
            {
                if (Math.floor(bGhost.x) == currentGhostMoveX && Math.floor(bGhost.y) == currentGhostMoveY)
                {
                    bGhostMoveDone = true;
                    bGhostDoMove = false;
                }
                else
                {
                    bGhostMoveDone = false;
                    bGhostDoMove = true;
                }
            }
            if (oGhostDoMove)
            {
                oGhost.animations.play( oGhostAnimPlay, 5, true);
                oGhost.body.velocity.x = oGhostMoveX;
                oGhost.body.velocity.y = oGhostMoveY;
            }
            if (oGhostDoMove && !oGhostMoveDone)
            {
                if (Math.floor(oGhost.x) == ocurrentGhostMoveX && Math.floor(oGhost.y) == ocurrentGhostMoveY)
                {
                    oGhostMoveDone = true;
                    oGhostDoMove = false;
                }
                else
                {
                    oGhostMoveDone = false;
                    oGhostDoMove = true;
                }
            }
            if (pGhostDoMove)
            {
                pGhost.animations.play( pGhostAnimPlay, 5, true);
                pGhost.body.velocity.x = pGhostMoveX;
                pGhost.body.velocity.y = pGhostMoveY;
            }
            if (pGhostDoMove && !pGhostMoveDone)
            {
                if (Math.floor(pGhost.x) == pcurrentGhostMoveX && Math.floor(pGhost.y) == pcurrentGhostMoveY)
                {
                    pGhostMoveDone = true;
                    pGhostDoMove = false;
                }
                else
                {
                    pGhostMoveDone = false;
                    pGhostDoMove = true;
                }
            }
            if (rGhostDoMove)
            {
                rGhost.animations.play( rGhostAnimPlay, 5, true);
                rGhost.body.velocity.x = rGhostMoveX;
                rGhost.body.velocity.y = rGhostMoveY;
            }
            if (rGhostDoMove && !rGhostMoveDone)
            {
                if (Math.floor(rGhost.x) == rcurrentGhostMoveX && Math.floor(rGhost.y) == rcurrentGhostMoveY)
                {
                    rGhostMoveDone = true;
                    rGhostDoMove = false;
                }
                else
                {
                    rGhostMoveDone = false;
                    rGhostDoMove = true;
                }
            }

            //Eat dot if pac is over a dot
            this.doEatDot();
            
            //Update the score
            //scoretext.setText(new String("000000000" + score).slice(-9));
        }

        //Print Debug Information        
        var currentTile = map.getTile(layer.getTileX(pacman.x), layer.getTileY(pacman.y));
        
        this.game.debug.renderText('Tile X: ' + layer.getTileX(pacman.x), 600, 615, 'rgb(255,255,255)');
        this.game.debug.renderText('Tile Y: ' + layer.getTileY(pacman.y), 600, 630, 'rgb(255,255,255)');
        this.game.debug.renderText('currentTileIndex: ' + currentTile, 600, 600, 'rgb(255,255,255)');
        this.game.debug.renderSpriteInfo(pacman, 300, 600);
    
        this.game.debug.renderText('pacMoves Array: ' + pacMoves, 600, 645, 'rgb(255,255,255)');
        this.game.debug.renderText('Total Dots: ' + totalDots.toString(), 600, 660, 'rgb(255,255,255)'); 
        
        this.game.debug.renderText('bGhostMoves.x: ' + bGhostMoves[bGhostMoveIndex].x.toString(), 600, 675, 'rgb(255,255,255)');
        this.game.debug.renderText('bGhostMoves.y: ' + bGhostMoves[bGhostMoveIndex].y.toString(), 600, 690, 'rgb(255,255,255)'); 
        this.game.debug.renderText('bGhostMoveIndex: ' + bGhostMoveIndex.toString(), 600, 705, 'rgb(255,255,255)'); 

        this.game.debug.renderSpriteInfo(bGhost, 900, 600);
       
    },
    
    isMoveAvailable: function(currentTileX, currentTileY, wantedDirection) {
        
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
    
    dobGhostMove: function() {
    
        if(bGhostMoves.length !=0 && bGhostMoveDone)
        {
            bGhostMoveIndex ++;
            //We have travelled the full path
            if (bGhostMoveIndex > bGhostMoves.length - 1)
            {
                bGhostMoveIndex --;
                bGhostMoveX = 0;
                bGhostMoveY = 0;
                bGhostMoveDone = false;
                bGhostDoMove = true;
                return;
            }
            currentGhostMoveX =  bGhostMoves[bGhostMoveIndex].x * 32 + 16;
            currentGhostMoveY =  bGhostMoves[bGhostMoveIndex].y * 32 + 16;
            bGhostMoveDone = false;
            bGhostDoMove = true;
        }

        if (Math.floor(bGhost.x) < currentGhostMoveX) //Move Right
        {
            bGhostAnimPlay = 'right';
            bGhostMoveX = bGhostVelocity;
            bGhostMoveY = 0;
            return;
        }
        else if (Math.floor(bGhost.x) > currentGhostMoveX) //Move Left
        {
            bGhostAnimPlay = 'left';
            bGhostMoveX = bGhostVelocity * -1;
            bGhostMoveY = 0;
            return;
        }
        else if (Math.floor(bGhost.x) == currentGhostMoveX)
        {
            bGhostAnimPlay = 'left';
            bGhostMoveX = 0;
            bGhostMoveY = 0;
        }
        if (Math.floor(bGhost.y) < currentGhostMoveY) //Move Down
        {
            bGhostAnimPlay = 'down';
            bGhostMoveX = 0;
            bGhostMoveY = bGhostVelocity;;
            return;
        }
        else if (Math.floor(bGhost.y) > currentGhostMoveY) //Move up
        {
            bGhostAnimPlay = 'up';
            bGhostMoveX = 0;
            bGhostMoveY = bGhostVelocity * -1;
            return;
        }
        else if (Math.floor(bGhost.y) == currentGhostMoveY)
        {
            bGhostAnimPlay = 'up';
            bGhostMoveX = 0;
            bGhostMoveY = 0;
        }
    
    },

    dooGhostMove: function() {
    
        if(oGhostMoves.length !=0 && oGhostMoveDone)
        {
            oGhostMoveIndex ++;
            //We have travelled the full path
            if (oGhostMoveIndex > oGhostMoves.length - 1)
            {
                oGhostMoveIndex --;
                oGhostMoveX = 0;
                oGhostMoveY = 0;
                oGhostMoveDone = false;
                oGhostDoMove = true;
                return;
            }
            ocurrentGhostMoveX =  oGhostMoves[oGhostMoveIndex].x * 32 + 16;
            ocurrentGhostMoveY =  oGhostMoves[oGhostMoveIndex].y * 32 + 16;
            oGhostMoveDone = false;
            oGhostDoMove = true;
        }

        if (Math.floor(oGhost.x) < ocurrentGhostMoveX) //Move Right
        {
            oGhostAnimPlay = 'right';
            oGhostMoveX = oGhostVelocity;
            oGhostMoveY = 0;
            return;
        }
        else if (Math.floor(oGhost.x) > ocurrentGhostMoveX) //Move Left
        {
            oGhostAnimPlay = 'left';
            oGhostMoveX = oGhostVelocity * -1;
            oGhostMoveY = 0;
            return;
        }
        else if (Math.floor(oGhost.x) == ocurrentGhostMoveX)
        {
            oGhostAnimPlay = 'left';
            oGhostMoveX = 0;
            oGhostMoveY = 0;
        }
        if (Math.floor(oGhost.y) < ocurrentGhostMoveY) //Move Down
        {
            oGhostAnimPlay = 'down';
            oGhostMoveX = 0;
            oGhostMoveY = oGhostVelocity;;
            return;
        }
        else if (Math.floor(oGhost.y) > ocurrentGhostMoveY) //Move up
        {
            oGhostAnimPlay = 'up';
            oGhostMoveX = 0;
            oGhostMoveY = oGhostVelocity * -1;
            return;
        }
        else if (Math.floor(oGhost.y) == ocurrentGhostMoveY)
        {
            oGhostAnimPlay = 'up';
            oGhostMoveX = 0;
            oGhostMoveY = 0;
        }
    
    },

    dopGhostMove: function() {
    
        if(pGhostMoves.length !=0 && pGhostMoveDone)
        {
            pGhostMoveIndex ++;
            //We have travelled the full path
            if (pGhostMoveIndex > pGhostMoves.length - 1)
            {
                pGhostMoveIndex --;
                pGhostMoveX = 0;
                pGhostMoveY = 0;
                pGhostMoveDone = false;
                pGhostDoMove = true;
                return;
            }
            pcurrentGhostMoveX =  pGhostMoves[pGhostMoveIndex].x * 32 + 16;
            pcurrentGhostMoveY =  pGhostMoves[pGhostMoveIndex].y * 32 + 16;
            pGhostMoveDone = false;
            pGhostDoMove = true;
        }

        if (Math.floor(pGhost.x) < pcurrentGhostMoveX) //Move Right
        {
            pGhostAnimPlay = 'right';
            pGhostMoveX = pGhostVelocity;
            pGhostMoveY = 0;
            return;
        }
        else if (Math.floor(pGhost.x) > pcurrentGhostMoveX) //Move Left
        {
            pGhostAnimPlay = 'left';
            pGhostMoveX = pGhostVelocity * -1;
            pGhostMoveY = 0;
            return;
        }
        else if (Math.floor(pGhost.x) == pcurrentGhostMoveX)
        {
            pGhostAnimPlay = 'left';
            pGhostMoveX = 0;
            pGhostMoveY = 0;
        }
        if (Math.floor(pGhost.y) < pcurrentGhostMoveY) //Move Down
        {
            pGhostAnimPlay = 'down';
            pGhostMoveX = 0;
            pGhostMoveY = pGhostVelocity;;
            return;
        }
        else if (Math.floor(pGhost.y) > pcurrentGhostMoveY) //Move up
        {
            pGhostAnimPlay = 'up';
            pGhostMoveX = 0;
            pGhostMoveY = pGhostVelocity * -1;
            return;
        }
        else if (Math.floor(pGhost.y) == pcurrentGhostMoveY)
        {
            pGhostAnimPlay = 'up';
            pGhostMoveX = 0;
            pGhostMoveY = 0;
        }
    
    },
    
    dorGhostMove: function() {
    
        if(rGhostMoves.length !=0 && rGhostMoveDone)
        {
            rGhostMoveIndex ++;
            //We have travelled the full path
            if (rGhostMoveIndex > rGhostMoves.length - 1)
            {
                rGhostMoveIndex --;
                rGhostMoveX = 0;
                rGhostMoveY = 0;
                rGhostMoveDone = false;
                rGhostDoMove = true;
                return;
            }
            rcurrentGhostMoveX =  rGhostMoves[rGhostMoveIndex].x * 32 + 16;
            rcurrentGhostMoveY =  rGhostMoves[rGhostMoveIndex].y * 32 + 16;
            rGhostMoveDone = false;
            rGhostDoMove = true;
        }

        if (Math.floor(rGhost.x) < rcurrentGhostMoveX) //Move Right
        {
            rGhostAnimPlay = 'right';
            rGhostMoveX = rGhostVelocity;
            rGhostMoveY = 0;
            return;
        }
        else if (Math.floor(rGhost.x) > rcurrentGhostMoveX) //Move Left
        {
            rGhostAnimPlay = 'left';
            rGhostMoveX = rGhostVelocity * -1;
            rGhostMoveY = 0;
            return;
        }
        else if (Math.floor(rGhost.x) == rcurrentGhostMoveX)
        {
            rGhostAnimPlay = 'left';
            rGhostMoveX = 0;
            rGhostMoveY = 0;
        }
        if (Math.floor(rGhost.y) < rcurrentGhostMoveY) //Move Down
        {
            rGhostAnimPlay = 'down';
            rGhostMoveX = 0;
            rGhostMoveY = rGhostVelocity;;
            return;
        }
        else if (Math.floor(rGhost.y) > rcurrentGhostMoveY) //Move up
        {
            rGhostAnimPlay = 'up';
            rGhostMoveX = 0;
            rGhostMoveY = rGhostVelocity * -1;
            return;
        }
        else if (Math.floor(rGhost.y) == rcurrentGhostMoveY)
        {
            rGhostAnimPlay = 'up';
            rGhostMoveX = 0;
            rGhostMoveY = 0;
        }
    
    },

    blueFindPathTo: function(fromTileX, fromTileY, toTileX, toTileY) {
    
        pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            bGhostMoves = path;
        });
    
        pathfinder.preparePathCalculation([fromTileX, fromTileY], [toTileX, toTileY]);
        pathfinder.calculatePath();
    },
    
    orangeFindPathTo: function(fromTileX, fromTileY, toTileX, toTileY) {
    
        pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            oGhostMoves = path;
        });
    
        pathfinder.preparePathCalculation([fromTileX, fromTileY], [toTileX, toTileY]);
        pathfinder.calculatePath();
    },

    pinkFindPathTo: function(fromTileX, fromTileY, toTileX, toTileY) {
    
        pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            pGhostMoves = path;
        });
    
        pathfinder.preparePathCalculation([fromTileX, fromTileY], [toTileX, toTileY]);
        pathfinder.calculatePath();
    },

    redFindPathTo: function(fromTileX, fromTileY, toTileX, toTileY) {
    
        pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            rGhostMoves = path;
        });
    
        pathfinder.preparePathCalculation([fromTileX, fromTileY], [toTileX, toTileY]);
        pathfinder.calculatePath();
    },
    
    //Count how many dots to complete the level
    countDots: function() {
        for( var y = 0; y < 20; y ++)
        {
            for( var x = 0; x < 40; x ++)
            {
                var tile = map.getTile(layer.getTileX(x * 32), layer.getTileY(y * 32));
                if (tile == 12 || tile ==4 )
                {
                    totalDots = totalDots + 1;
                }
            }
        }
    },
    
    //Check if pac is over an eatable tile and replace it with an empty tile
    doEatDot: function() {

        var currentTile = map.getTile(layer.getTileX(pacman.x), layer.getTileY(pacman.y));;
        
        if (currentTile == 12)
        {
            //Eating dot
            map.putTile(0, layer.getTileX(pacman.x), layer.getTileY(pacman.y), 0);
            
            if (!audioDotEater.isPlaying)
            {
                audioDotEater.play();
            }
            score = score + 100;
            totalDots--;
        }
        else if (currentTile == 4)
        {
            //Eating Power dot
            if (!pacBig)
            {
                pacBig = true;
                pacman.body.setSize(32, 32, pacman.width / 2 - 16 , pacman.height / 2 - 16);
            }
            
            map.putTile(0, layer.getTileX(pacman.x), layer.getTileY(pacman.y), 0);
            score = score + 1000;
            totalDots --;
        }
    },
    
    //Update the Lives count graphics
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
        
        pacDirection = DirectionEnum.RIGHT;
        
    },

    quitToMenu: function () {
		
        layer.kill();
        
        startlevelsound.stop();

		console.log('lets quit! back to the main menu');

		this.game.state.start('mainmenu');

	}
    
}

