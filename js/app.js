// Enemies our player must avoid
class Enemy {
    constructor(sprite = imageT, x, y, speed) {
    this.sprite = sprite;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.default = speed;
    }
    update (dt) {
        if (this.x < 500) {
            this.x += this.speed * dt 
        } else if (this.x >= 500){
            this.x = -50;
        } 
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Player object
class Player {
    constructor(
        sprite = 'images/char-boy.png', x = 200, y = 470, select = false, level = 1, multi = 0, lives = 3, points = 0) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.select = select; 
        this.level = level;
        this.multi = multi;
        this.lives = lives;
        this.points = points;
    }
    update(min, max) {
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 470) {
            this.y = 470;
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
const allItems = [];

function randomGen() { 
        //randomly generates at each round start * multiplier adds .02 probability of appearance be default.
        let randomNum = Math.floor((Math.random() * 100) + 1);
        console.log(randomNum);
        if (randomNum >= 95) {
            console.log(`SUMMON BLUE GEM`);
            allItems.push(new Item('images/Gem-Blue.png',10, 25, 430 ))
        } else if (randomNum >= 80) {
            console.log(`SUMMON2`);
        } else if (randomNum >= 70) {
            console.log(`SUMMON3`)
        }
    }    
class Item {
    constructor(sprite = "", quality = 0, x = 0, y = 0,) {
        this.sprite = sprite;
        this.quality = quality;
        this.x = x;
        this.y = y;
    }
    update(effect) {
        //set parameters
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    extraPoints() {
        // null
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
