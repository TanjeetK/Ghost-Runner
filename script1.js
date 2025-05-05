// with comments
let score = 0;
let cross = true;
let lives = 3;
let invincible = false;
let musicOn = true;

let audio = new Audio('bg.mp3');
let audiogo = new Audio('gameover.mp3');

// Initial UI update
updateLivesUI();
updateScore(score);

// Start Game on Play Button Click
document.getElementById("startBtn").onclick = function () {
    document.querySelector(".startScreen").style.display = "none";
    if (musicOn) audio.play();
    document.querySelector(".obstacle").classList.add("obstacleani");
};

// Toggle Music On/Off
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

// Key Controls
document.onkeydown = function (e) {
    const dino = document.querySelector('.dino');

    // Jump
    if (e.key === "ArrowUp") {
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 600);
        }
    }

    // Move Right
    if (e.key === "ArrowRight") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX < window.innerWidth - 120) {
            dino.style.left = (dinoX + 30) + "px";
        }
    }

    // Move Left
    if (e.key === "ArrowLeft") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dinoX > 10) {
            dino.style.left = (dinoX - 30) + "px";
        }
    }
};

// Collision + Score Detection
setInterval(() => {
    let dino = document.querySelector('.dino');
    let obstacle = document.querySelector('.obstacle');
    let gameOverScreen = document.querySelector('.gameOverScreen');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // Collision
    if (offsetX < 72 && offsetY < 52 && !invincible) {
        lives--;
        updateLivesUI();

        if (lives <= 0) {
            gameOverScreen.style.visibility = 'visible';
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

    // Scoring and Speed Increase
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = Math.max(aniDur - 0.1, 1.5); // Min speed limit
            obstacle.style.animationDuration = newDur + 's';
        }, 900);
    }

}, 100);

// Update Score Display
function updateScore(scoreVal) {
    document.getElementById('score').innerHTML = "Your Score: " + scoreVal;
}

// Update Lives Display
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

// Restart Button Logic
document.querySelector('.restartBtn').onclick = function () {
    score = 0;
    lives = 3;
    cross = true;
    invincible = false;
    updateScore(score);
    updateLivesUI();

    document.querySelector('.gameOverScreen').style.visibility = 'hidden';
    this.style.display = 'none';

    let obstacle = document.querySelector('.obstacle');
    obstacle.classList.remove('obstacleani');
    setTimeout(() => {
        obstacle.classList.add('obstacleani');
    }, 50);

    document.querySelector('.dino').style.left = "50px"; // Reset Dino
    if (musicOn) audio.play();
};
