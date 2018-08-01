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
    this.default = speed;
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
    constructor(sprite = 'images/char-boy.png', x = 200, y = 390, select = false, streak = 0, multi = 0) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.select = select; 
        this.streak = streak;
        this.multi = multi;
    }
    update(min, max) {
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
            //player select default state is false; once a character is selected the event listener keys can be utilized for movement of player
        if (player.select === true) {
        // moves player
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

    }

const allEnemies = [
    new Enemy('images/enemy-bug.png', 0, 65, 100),
    new Enemy('images/Rock.png', 0, 145, 250),
    new Enemy('images/enemy-bug.png', 0, 225, 160),
    new Enemy('images/Star.png', 0, 305, 50)
]

const player = new Player();

const defaultSpeeds = [];


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

// Character selection func, self invoking
(function charDialog() {

    let selection = document.getElementById('playerSelect');
    selection.showModal();
    // opens a modal dialog
    document.getElementById("boy").addEventListener("click", function() {
        charSelect(1);
        //boy
    });
    document.getElementById("princess").addEventListener("click", function() {
        charSelect(2);
        //princess
    });
    document.getElementById("catGirl").addEventListener("click", function() {
        charSelect(3);
        //cat girl
    });

  })();

  // assigning selected sprite to player object, and allowing movement 
  function charSelect(num) {
    //checksum for moving player
    player.select = true;

    if (num == 1) {
        //boy
        player.sprite = 'images/char-boy.png';
    } else if (num == 2) {
        //princess
        player.sprite = 'images/char-princess-girl.png';
    } else player.sprite = 'images/char-cat-girl.png';
    let selection = document.getElementById('playerSelect');
    selection.close();
  }

  // used on reset/win function
  function showDialog() {
    player.select = false;
    var selection = document.getElementById('playerSelect');
    selection.showModal();
  }
