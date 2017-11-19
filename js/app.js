'use strict;'
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.maxSpeed = 400;
    this.minSpeed = 100;
    this.speed = random(this.maxSpeed,this.minSpeed);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 550){
        this.speed = random(400,100);
        this.x = -50;
    }
    this.checkCollisions();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Implement checkCollisions function on Enemy to avoid looping over allEnemies array if done on Player
Enemy.prototype.checkCollisions = function() {
    if ((this.y == player.y)&&(this.x < player.x + 55) &&( this.x + 70 > player.x)) { 
        player.reset(); 
    } 
};

var random = function(lower_limit,upper_limit){
    return Math.floor(Math.random()*(upper_limit-lower_limit+1)+lower_limit);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
 
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies               
var allEnemies = [new Enemy(0, 48),
                  new Enemy(-50, 131),
                  new Enemy(-20, 214)
                 ];
// Place the player object in a variable called player
var player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(code) {
    if(code === 'left') {
        if (this.x > -2) {
            this.x -= 101;
        }
        else {
            this.x = this.x;
        }
    }
    if(code === 'right') {
        if (this.x < 402) {
            this.x += 101;
        }
        else {
            this.x = this.x;
        }
    }
    if(code === 'up') {
        if (this.y > 48) {
            this.y -= 83;  
        }
        else {
            this.y = this.y;
            if (code === 'up') {
                    console.log("Winner!");
                // Reset game 
                this.reset();
                }     
        }
    }
    if(code === 'down') {
        if (this.y < 380) {
            this.y += 83;
        }
        else {
            this.y = this.y;
        }
    }
};
