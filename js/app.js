"use strict";

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 450 + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
        this.x += this.speed * dt;

    // This updates the enemies position when the end of the canvas is reached.
    if(this.x > 505) {
        this.x = Math.random() * -850;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 405;
    this.score = 0;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;

    // Calls the collisionCheck() function to see if player made contact with enemy.
    this.collisionCheck();

    // Checks to see if player reaches the water to restart position and add points.
    if (this.y < 10) {
        this.positionReset();
        this.score += 50;
    }
};

// This function checks to see if player makes contact with the enemies 
// in the Enemy array.
Player.prototype.collisionCheck = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if(Math.abs(player.x - allEnemies[i].x) < 30 && Math.abs(player.y - allEnemies[i].y) < 30) {
            this.positionReset();
        }
    }
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = '33px serif';
    ctx.fillText("Score: " + this.score, 15, 90);
};

// This function sends player back to starting position.
Player.prototype.positionReset = function() {
    this.x = 202;
    this.y = 405;
};

// Keeps player inside the canvas; Player does not leave the canvas. The function also moves player using the arrows. 
Player.prototype.handleInput = function(keyInput) {
    switch(keyInput) {
        case 'up':
            if(this.y < 10) {
                return null;
            }
            else {
                this.y -= 83; 
            }
            break;
        case 'down':
            if(this.y > 400) {
                return null;
            }
            else {
                this.y += 83; 
            }
            break;
        case 'left':
            if(this.x < 100) {
                return null;
            }
            else {
                this.x -= 101; 
            }
            break;
        case 'right':
            if(this.x > 400) {
                return null;
            }
            else {
                this.x += 101;
            }
            break;
    }
};
var player = new Player();

// Place all enemy objects in an array called allEnemies
var enemy_1 = new Enemy(-200, 63);
var enemy_2 = new Enemy(-350, 145);
var enemy_3 = new Enemy(-96, 228);
var enemy_4 = new Enemy(-96, 63);
var enemy_5 = new Enemy(-150, 145);
var enemy_6 = new Enemy(-450, 228);
var allEnemies = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5, enemy_6];

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
