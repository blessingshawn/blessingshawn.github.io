TestGame.Test = function (game) {

	//	Our main menu
	this.game = game;

};

TestGame.Test.prototype = {
    
    create: function() {
        this.game.stage.backgroundColor = '#000000';
        this.game.world.setBounds(0,0, 1280, 720);
        
        //Setup Stars
        for( var i=0; i<starscount;i++)
        {
            starArrayX[i] = this.game.rnd.integerInRange(starPosX, starPosX + starsWidth);
            starArrayY[i] = this.game.rnd.integerInRange(starPosY, starPosY + starsHeight);
            starPoint[i] = new Phaser.Point(starArrayX[i], starArrayY[i]);
            starSpeed[i] = 1;
        }
        
        this.game.input.onDown.add(this.addRocket, this);
    },
    
    addRocket: function() {

        rocketStarShip = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'rocketstarship');
        rocketStarShip.anchor.setTo(0.5,0.5);
        rocketStarShip.scale.setTo(1.0, 1.0);
        rocketStarShip.animations.add('fly');
        rocketStarShip.animations.play('fly', 3, true);
        
    },
    
    update: function() {
        // calc position of stars
        for (var i=0; i<starscount; i++)
        {
            starSpeed[i] = 1 + (i % 3);
            starArrayX[i] = starPoint[i].x + starSpeed[i];
            if (starArrayX[i] >= starsWidth)
            {
                starArrayX[i] = 0;
            }
        }
        
    },
    
    render: function () {
        
        this.game.context.save();
        this.game.context.setTransform(1, 0, 0, 1, 0, 0);
        
        // draw stars
        for (var i=0; i<starscount; i++)
        {
            if (starArrayX[i] > -1 && starArrayY[i] > -1 && starArrayX[i] < (starPosX + starsWidth) && starArrayY[i] < (starPosY + starsHeight))
            {
                //Draw a star
                starPoint[i].setTo(starArrayX[i], starArrayY[i]);
                
                this.game.context.fillStyle = 'rgb(197,193,170)';
                this.game.context.fillRect(starPoint[i].x, starPoint[i].y, starSpeed[i], starSpeed[i]);
            }
        }
        
        this.game.context.restore();
    },
};