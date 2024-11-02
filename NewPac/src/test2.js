TestGame.Test2 = function (game) {

	//	Our main menu
	this.game = game;

};

TestGame.Test2.prototype = {
    
    create: function() {
        this.game.stage.backgroundColor = '#000000';
        this.game.world.setBounds(0,0, 1280, 720);
        
        //	Here we'll create a renderTexture the same size as our game
        texture = this.game.add.renderTexture('mousetrail', 1280, 720);
    
        //	This is the sprite that will be drawn to the texture, we set it to visible false as we only need its texture data
        ball = this.game.add.sprite(0, 0, 'ball');
        ball.visible = false;
        ball.anchor.setTo(0.5, 0.5);
    
        //	This is the sprite that is drawn to the display. We've given it the renderTexture as its texture.
        this.game.add.sprite(0, 0, texture);

    },
    
    update: function() {
        //	This time we'll draw the ball sprite twice, in a mirror effect
        texture.renderXY(ball, this.game.input.activePointer.x, this.game.input.activePointer.y, false);
        texture.renderXY(ball, this.game.input.activePointer.x, 600 - this.game.input.activePointer.y, false);
    },
    
    render: function () {
        
    },
};