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
        sprite = 'images/char-boy.png', x = 200, y = 470, select = false, level = 1, multi = 0, lives = 3, points = 0, timer = 3000) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.select = select; 
        this.level = level;
        this.multi = multi;
        this.lives = lives;
        this.points = points;
        this.timer = timer;
        this.timerDefault = timer;
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
    pointsUpdate() {
        let multiBonus = this.multi *50;
        let timerBonus = this.timer /10;
        console.log(this.timer);
        console.log(timerBonus);
        console.log(multiBonus);
        let totalBonus = multiBonus + timerBonus;
        this.points += this.points + totalBonus;
        console.log(totalBonus);
        document.getElementById("points").innerHTML = this.points.toFixed(0);
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
    reset(loss) {
        if (loss == true) {
        this.select = false;
        this.x = 200;
        this.y = 470;
         //
         let list = document.getElementById("livesContainer");
         let lives = document.getElementById("lives");
         lives.classList.add("fadeOut")

         this.lives -= 1;
         if (this.lives == 0) {
            this.timer = 3000;
            gameReset();
            list.removeChild(lives)
         } else {
            setTimeout(function(){
                    list.removeChild(lives);
                    player.select = true;
                    player.timer = 3000;
                    }, 500); 
                }
        } else {
            speedBuff()
            this.pointsUpdate();
            this.level += 1;
            this.multi += .10;
            this.timer = 3000;
            document.getElementById("multiVal").innerHTML = this.multi.toFixed(2);
            document.getElementById("streakVal").innerHTML = this.level;  
            reset();
        }
        }
    }
const allItems = []; 
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

//game reset
function gameReset() {
        player.points = 0;
        player.lives = 3;
        player.level = 1
        player.multi = 0;
        speedNurf();
        console.log('reset');
        console.log(player.lives);
        showDialog();
        for (a = 0; a < 3; a++) {
            let container = document.getElementById("livesContainer");
            let newDiv = document.createElement("div");
            container.appendChild(newDiv);
            newDiv.id ='lives';
        }
        document.getElementById("multiVal").innerHTML = player.multi;
        document.getElementById("streakVal").innerHTML = player.level;
}
function reset() {
    player.x = 200;
    player.y = 490;
    // noop
}

//SPEED BUFF
function speedBuff(enemy) {
    allEnemies.forEach(function(enemy) {
        enemy.speed += enemy.speed * player.multi;
        })
    }
//SPEED NURF
function speedNurf() {
    allEnemies.forEach(function(enemy) {
        //default speed assigned in enemy constructor func - app.js
        enemy.speed = enemy.default;
        })
    }

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
