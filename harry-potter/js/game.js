class Game {
  constructor() {
    this.homeScreen = document.querySelector('#home-screen');
    this.gameBox = document.querySelector('#game-box');
    this.gameOverScreen = document.querySelector('#game-over-screen');
    this.nextLevelScreen = document.querySelector('#next-level-screen');
    this.harry = new Harry(this.gameBox, 100, 250, 90, 80, './img/icon.png');
    this.height = 1100;
    this.width = 700;
    this.snitches = [];
    this.dementors = [];
    this.score = 0;
    this.scoreElement = document.querySelector('#score');
    this.lives = 3;
    this.livesElement = document.querySelector('#lives');
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.timeLeft = 20;
    this.timerElement = document.querySelector('#timer');
    this.level = 1;
    this.scoreToAdvance = 30;




    this.updateScore();
    this.updateLives();
    this.updateTimer()
  }

  updateTimer() {
    this.timerElement.textContent = `${this.timeLeft}`;
  }

  updateScore() {
    this.scoreElement.textContent = `${this.score}`;

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
    }, 2000);

    this.dementorIntervalId = setInterval(() => {
      this.addDementors();
    }, 7000);

    this.timerIntervalId = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      console.log(this.timeLeft)
      if (this.timeLeft < -1) {
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
    //console.log("in the update");
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
        console.log(this.score, this.scoreToAdvance)
        if (this.score >= this.scoreToAdvance) {
          this.nextLevel();
          return;
        }

      } else if (snitchh.top > this.height) {
        this.score++;
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

      if (this.lives <= 0) {
        this.gameOver()
        return;
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
    this.harry.element.remove();
    this.snitches.forEach(snitch => snitch.element.remove());
    this.dementors.forEach(dementor => dementor.element.remove());
    this.timeLeft = 0;
    this.gameIsOver = true;
    this.gameBox.style.display = "none";
    this.gameOverScreen.style.display = "block";

    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);
  }

  nextLevel() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.timerIntervalId);


    this.updateTimer();
    this.updateScore();

    this.gameBox.style.display = "none";
    this.nextLevelScreen.style.display = "block";
    // a partir de aqui estou a reiniciar o jogo

  }

  startNewLevel() {
    this.level++;
    this.timeLeft = 20;
    this.scoreToAdvance = 30;
    this.resetGameElements();
    this.nextLevelScreen.style.display = "none";
    this.gameBox.style.display = "block";
   this.snitches = [];
   this.dementors = [];
    this.start();
  }

  resetGameElements() {
    this.score = 0;
    this.lives = 3;
    this.updateScore();
    this.updateLives();
  }

  newGameLevel() {
    this.start();
    this.gameBox.style.display = "block";
    this.nextLevelScreen.style.display = "none";
  }



}


