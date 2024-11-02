TestGame.MainMenu = function (game) {

	//	Our main menu
	this.game = game;

};

TestGame.MainMenu.prototype = {

	create: function () {

        this.game.stage.backgroundColor = '#000000';
        this.game.world.setBounds(0,0, 1280, 720);
        
        //Setup Stars
        for( var i=0; i<starscount;i++)
        {
            starArrayX[i] = this.game.rnd.integerInRange(starPosX, starPosX + starsWidth);
            starArrayY[i] = this.game.rnd.integerInRange(starPosY, starPosY + starsHeight);
            starPoint[i] = new Phaser.Point(starArrayX[i], starArrayY[i]);
        }
        
        rocketStarShip = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'rocketstarship');
        rocketStarShip.anchor.setTo(0.5,0.5);
        rocketStarShip.scale.setTo(1.0, 1.0);
        rocketStarShip.animations.add('fly');
        rocketStarShip.animations.play('fly', 3, true);
        
        titlemusic.play();
        titlemusic.volume = 0.8;

        this.game.input.onDown.add(this.startGame, this);
        
        //  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
        //  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
        cursors = this.game.input.keyboard.createCursorKeys();
        
        t = this.game.time.now + 80;
	},
    
    update: function() {
        if (cursors.up.isDown)
        {
            starSpeedY = starSpeedY - starAcceleration;
            rocketStarShip.angle += 1;
        }
        else if (cursors.down.isDown)
        {
            starSpeedY += starAcceleration;
            rocketStarShip.angle -= 1;
        }
        if (cursors.left.isDown)
        {
            starSpeedX -= starAcceleration;
            rocketStarShip.angle -= 1;            
        }
        else if (cursors.right.isDown)
        {
            starSpeedX += starAcceleration;
            rocketStarShip.angle += 1;
        }
    },
    
    render: function() {
        
        this.game.context.save();
        this.game.context.setTransform(1, 0, 0, 1, 0, 0);

        for (var i=0; i<starscount; i++)
        {
            //starSpeedX = 1 + (i % 3);
            //starSpeedY = 0;//1 + (i % 3);
                          
            starArrayX[i] = starPoint[i].x + starSpeedX;
            starArrayY[i] = starPoint[i].y + starSpeedY;
            
            // Check X boundries
            if (starArrayX[i] >= starsWidth)
            {
                starArrayX[i] = 0;
            }
            if (starArrayY[i] >= starsHeight)
            {
                starArrayY[i] = 0;
            }
            
            if (starArrayX[i] > -1 && starArrayY[i] > -1 && starArrayX[i] < (starPosX + starsWidth) && starArrayY[i] < (starPosY + starsHeight))
            {
                //Draw a star
                
               // this.game.debug.start();
                starPoint[i].setTo(starArrayX[i], starArrayY[i]);
                
                this.game.context.fillStyle = 'rgb(197,193,170)';
                this.game.context.fillRect(starPoint[i].x, starPoint[i].y, (i % 3), (i % 3));
                //this.game.debug.stop();
            }
        }
        this.game.context.restore();
    },

    startGame: function () {
        titlemusic.stop();
        
		this.game.state.start('game');
	},

		// Add the Scared Ghost and Animation
		//scaredGhost = this.game.add.sprite(0 -32, 0 -32, 'ghosts');
		//scaredGhost.scale.setTo(1.0, 1.0);
		//	Here we add a new animation called 'left'
		//	Because we didn't give any other parameters it's going to make an animation from all available frames in the 'Ghosts' sprite sheet
		//scaredGhost.animations.add('scared', [36, 37], 5, true);
		//	And this starts the animation playing by using its key ("left")
		//	30 is the frame rate (30fps)
		//	true means it will loop when it finishes
		//scaredGhost.animations.play('scared', 5, true);

		// Add the Eyes Ghost and Animation
		//eyesGhost = this.game.add.sprite(0 -32, 0 -32, 'ghosts');
		//eyesGhost.scale.setTo(1.0, 1.0);
		//	Here we add a new animation called 'left'
		//	Because we didn't give any other parameters it's going to make an animation from all available frames in the 'Ghosts' sprite sheet
		//eyesGhost.animations.add('eyes', [0, 1, 2, 3], 5, true);
		//	And this starts the animation playing by using its key ("left")
		//	30 is the frame rate (30fps)
		//	true means it will loop when it finishes
		//eyesGhost.animations.play('eyes', 5, true);
        
}
