let score = 0;
let cross = true;
let lives = 3;
let invincible = false;
let musicOn = true;

updateLivesUI();

let audio = new Audio('bg.mp3');
let audiogo = new Audio('gameover.mp3');

document.getElementById("startBtn").onclick = function () {
    document.querySelector(".startScreen").style.display = "none";
    if (musicOn) audio.play();
};

document.getElementById("musicToggle").onclick = function () {
    musicOn = !musicOn;
    if (musicOn) {
        audio.play();
        this.textContent = "🔊";
    } else {
        audio.pause();
        this.textContent = "🔇";
    }
};

document.getElementById("controlsToggle").onclick = function() {
    const controls = document.querySelector('.controls');
    if (controls.style.display === 'none' || controls.style.display === '') {
        controls.style.display = 'flex';
    } else {
        controls.style.display = 'none';
    }
};

document.onkeydown = function (e) {
    if (e.key == "ArrowUp") {
        let dino = document.querySelector('.dino');
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 900);
        }
    }

    if (e.key == "ArrowRight") {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX < window.innerWidth - 120) {
            dino.style.left = (dinoX + 60) + "px";
        }
    }

    if (e.key == "ArrowLeft") {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX > 10) {
            dino.style.left = (dinoX - 30) + "px";
        }
    }
};

let obstaclePassed = false;

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOverScreen = document.querySelector('.gameOverScreen');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 72 && offsetY < 52 && !invincible) {
        lives--;
        updateLivesUI();
        obstaclePassed = true;

        if (lives <= 0) {
            gameOverScreen.style.display = 'block';
            document.querySelector('.gameover').style.display = 'block';
            obstacle.classList.remove('obstacleani');
            audiogo.play();

            setTimeout(() => {
                audio.pause();
            }, 1000);
            document.querySelector('.restartBtn').style.display = 'block';
        } else {
            invincible = true;
            dino.style.filter = "brightness(0.5) drop-shadow(0 0 10px red)";
            setTimeout(() => {
                invincible = false;
                dino.style.filter = "none";
            }, 2000);
        }
    } 
    
    if (ox < dx - 100 && !obstaclePassed) {
        score += 1;
        updateScore(score);
        obstaclePassed = true;

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = Math.max(aniDur - 0.1, 1.5);
            obstacle.style.animationDuration = newDur + 's';
        }, 100);
    }
    
    if (ox > window.innerWidth - 50) {
        obstaclePassed = false;
    }
}, 100);

document.getElementById('leftBtn').addEventListener('click', () => handleControl("ArrowLeft"));
document.getElementById('rightBtn').addEventListener('click', () => handleControl("ArrowRight"));
document.getElementById('upBtn').addEventListener('click', () => handleControl("ArrowUp"));

function handleControl(key) {
    let dino = document.querySelector('.dino');

    if (key == "ArrowUp" && !dino.classList.contains('animateDino')) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700); 
    }

    if (key == "ArrowRight") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX < window.innerWidth - 120) {
            dino.style.left = (dinoX + 30) + "px"; 
        }
    }
    if (key == "ArrowLeft") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX > 10) { 
            dino.style.left = (dinoX - 30) + "px";
        }
    }
}

function updateScore(scoreVal) {
    document.getElementById('score').innerHTML = "Your Score: " + scoreVal;
}

function updateLivesUI() {
    const lifeElements = document.querySelectorAll(".life");
    lifeElements.forEach((life, index) => {
        if (index < lives) {
            life.style.opacity = "1";
        } else {
            life.style.opacity = "0.3";
        }
    });
}

document.querySelector('.restartBtn').onclick = function () {
    score = 0;
    lives = 3;
    cross = true;
    invincible = false;
    obstaclePassed = false;
    updateScore(score);
    updateLivesUI();
    document.querySelector('.gameOverScreen').style.display = 'none';
    document.querySelector('.gameover').style.display = 'none';
    this.style.display = 'none';
    let obstacle = document.querySelector('.obstacle');
    obstacle.classList.remove('obstacleani');
    obstacle.style.animationDuration = '4s';
    setTimeout(() => {
        obstacle.classList.add('obstacleani');
    }, 50);
    document.querySelector('.dino').style.left = "50px";
    if (musicOn) audio.play();
};