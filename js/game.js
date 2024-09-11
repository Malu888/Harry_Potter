class Game {
  constructor() {
    this.homeScreen = document.querySelector('#home-screen');
    this.gameBox = document.querySelector('#game-box');
    this.gameOverScreen = document.querySelector('#game-over-screen');
    this.nextLevelScreen = document.querySelector('#next-level-screen');
    this.winnerScreen = document.querySelector('#winner-screen');
    this.scoreElement = document.querySelector('#score');
    this.livesElement = document.querySelector('#lives');
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.timerElement = document.querySelector('#timer');
    this.harry = new Harry(this.gameBox, 100, 250, 90, 80, './img/icon.png');
    this.height = 1100;
    this.width = 700;
    this.snitches = [];
    this.dementors = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.timeLeft = 30;
    this.level = 1;
    this.scoreToAdvance = 60;
    this.maxLevel = 3;
    this.scoreToWin = 70;

    this.updateScore();
    this.updateLives();
    this.updateTimer()
  }

  updateTimer() {
    this.timerElement.textContent = `${this.timeLeft}`;
  }

  updateScore() {
    this.scoreElement.textContent = `${this.score}`;
    console.log(this.score, `pontosssssssssssssssssssssssssssss`)
  }

  updateLives() {
    this.livesElement.textContent = `${this.lives}`;
  }

  addSnitch() {
    const newSnitch = new Snitch(
      this.gameBox,
      Math.floor(Math.random() * (this.width - 50)),
      Math.floor(Math.random() * 100),
      50, 50,
      './img/snitch.png'
    );
    this.snitches.push(newSnitch);
  }

  addDementors() {
    if (this.level > 1) {
      const newDementor = new Dementor(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 50)),
        0,
        100, 100,
        './img/dementor.png'
      );
      this.dementors.push(newDementor);
    }
  }

  start() {
    this.homeScreen.style.height = `${this.height}px`
    this.gameBox.style.width = `${this.width}px`;

    this.homeScreen.style.display = "none";

    this.gameBox.style.display = "block";

    this.addEventListeners();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency);

    this.snitchIntervalId = setInterval(() => {
      this.addSnitch();
    }, 1000);

    this.dementorIntervalId = setInterval(() => {
      this.addDementors();
    }, 2000);

    this.timerIntervalId = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      console.log(this.timeLeft)
      if (this.timeLeft === 0) {
        this.gameOver();
      }
    }, 1000);
  }




  gameLoop() {
    //console.log("in the game loop");

    this.update();


    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      clearInterval(this.snitchIntervalId);
      clearInterval(this.timerIntervalId);
      clearInterval(this.dementorIntervalId);
    }


  }

  update() {
    if (this.gameIsOver) return;
    this.harry.move();

    for (let i = 0; i < this.snitches.length; i++) {
      const snitchh = this.snitches[i]
      snitchh.move();

      if (this.harry.didCollide(snitchh)) {
        snitchh.element.remove();
        this.snitches.splice(i, 1);
        this.score += 5
        this.updateScore();
        i--;

        if (this.score >= this.scoreToAdvance && this.level < this.maxLevel) {
          this.nextLevel();
        } else if (this.lives < 1 || this.timeLeft === -1) {
          this.gameOver();
        }

      } else if (snitchh.top > this.height) {
        snitchh.element.remove();
        this.snitches.splice(i, 1);
        i--;
      }
    }

    for (let j = 0; j < this.dementors.length; j++) {
      const dementor = this.dementors[j];
      dementor.move();

      if (this.harry.didCollide(dementor)) {
        this.lives--;
        this.updateLives();
        console.log('colidiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        dementor.element.remove();
        this.dementors.splice(j, 1);
        j--;
      }


      if (this.lives < 1 || this.timeLeft === -1) {
        this.gameOver();
      } else if (this.score >= this.scoreToWin) {
        this.winner();
      }
    }
  }


  addEventListeners() {
    window.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();// poe em minusculas o teclado
      if (['arrowup', 'w'].includes(key)) {
        this.harry.setDirection(0, -1); //ele vai subir
      } else if (['arrowdown', 's'].includes(key)) {
        this.harry.setDirection(0, 1); // ele vai descer
      } else if (['arrowleft', 'a'].includes(key)) {
        this.harry.setDirection(-1, 0); // vai para a esquerda
      } else if (['arrowright', 'd'].includes(key)) {
        this.harry.setDirection(1, 0); // vai para a direita
      }
    });

    window.addEventListener('keyup', (event) => {
      const key = event.key.toLowerCase();
      if (['arrowup', 'arrowdown'].includes(key)) {
        this.harry.setDirection(0, 0) // move se verticalmente
      } else if (['arrowleft', 'arrowright'].includes(key)) {
        this.harry.setDirection(0, 0) // move se horizontalmente
      }
    })
  }


  gameOver() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);
    this.harry.element.remove();
    this.timeLeft = 0;
    this.gameIsOver = true;
    this.gameBox.style.display = "none";
    this.gameOverScreen.style.display = "block";
  }

  nextLevel() {
    if (this.gameIsOver) return;

    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);

    this.gameBox.style.display = "none";
    this.nextLevelScreen.style.display = "block";
    // a partir de aqui estou a reiniciar o jogo
  }

  resetGameElements() {
    this.score = 0;
    this.lives = 3;
    this.timeLeft = 30;
    this.snitches = [];
    this.dementors = [];
    this.updateScore();
    this.updateLives();
    this.updateTimer();
    this.start();
  }

  startNewLevel() {
    if (this.gameIsOver) return;

    this.level++;
    this.timeLeft = 30;
    this.scoreToAdvance += 10;
    this.resetGameElements();
    this.nextLevelScreen.style.display = "none";
    this.gameBox.style.display = "block";
  }


  checkWinner() {
    if (this.score >= this.scoreToWin && this.level === this.maxLevel) {
      this.winner();
      return true;
    }
    return false;
  }

  winner() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);

    this.gameBox.style.display = "none";
    this.winnerScreen.style.display = "block";
    this.nextLevelScreen.style.display = "none";
    this.gameIsOver = true;
  }

}


