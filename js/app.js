// Enemies our player must avoid
var Enemy = function(imageT, x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = imageT;
    this.speed = speed;
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 500) {
        this.x += this.speed * dt 
    } else if (this.x >= 500){
        this.x = -50;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
    constructor(sprite = 'images/char-boy.png', x = 200, y = 390) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    update(x, y) {
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 390) {
            this.y = 390;
        }
        if (this.y < 0) {
            this.y = 0;
        };
        


    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    handleInput(e) {
        // Detects when a collision happens and move the player back to initial position
        switch(e) {
            case 'left':
                this.x -= 100;
                break;
            case 'up':
                this.y -= 80;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'down':
                this.y += 80;
                break;
        }
        this.update(this.x, this.y)



    }
}

const allEnemies = [
    new Enemy('images/enemy-bug.png', 0, 65, 100),
    new Enemy('images/Rock.png', 0, 145, 250),
    new Enemy('images/enemy-bug.png', 0, 225, 160),
]

const player = new Player();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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


(function charDialog() {

    var submitButton = document.getElementById('submit');
    var selection = document.getElementById('playerSelect');
    selection.showModal();
    // Update button opens a modal dialog
    document.getElementById("dialog").addEventListener("submit", charSelect);
    // Form cancel button closes the dialog box
    // cancelButton.addEventListener('click', function() {
    //   favDialog.close();
    // });
  })();

  function charSelect() {
    console.log(`it works`)
  }

  function showDialog() {
    var selection = document.getElementById('playerSelect');
    selection.showModal();
  }
