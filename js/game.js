class Game {
  constructor() {
    this.homeScreen = document.querySelector('#home-screen');
    this.scoreElement = document.querySelector('#score');
    this.livesElement = document.querySelector('#lives');
    this.timerElement = document.querySelector('#timer');
    this.gameScreen = document.querySelector('#game-screen')
    this.gameBox = document.querySelector('#game-box');
    this.gameOverScreen = document.querySelector('#game-over-screen');
    this.nextLevelScreen = document.querySelector('#next-level-screen');
    this.winnerScreen = document.querySelector('#winner-screen');
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.harry = new Harry(this.gameBox, 100, 250, 120, 100, './img/second harry.png');
    this.height = 1500;
    this.width = 1000;
    this.snitches = [];
    this.relics = [];
    this.spells = [];
    this.letters = [];
    this.dementors = [];
    this.secondDementors = [];
    this.magicPotions = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.timeLeft = 30;
    this.level = 1;
    this.scoreToAdvance = 30;
    this.maxLevel = 3;
    this.scoreToWin = 70;

    this.updateScore();
    this.updateLives();
    this.updateTimer()
  }

  updateTimer() {
    this.timerElement.textContent = `You have ${this.timeLeft} seconds to complete this level!`;
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score}!`;
  }

  updateLives() {
    this.livesElement.textContent = `Lives: ${this.lives}`;
  }

  addSnitch() {
    if (this.level <= 1) {
      const newSnitch = new Snitch(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 50)),
        Math.floor(Math.random() * 100),
        60, 60,
        './img/trophy.png'
      );
      this.snitches.push(newSnitch);
    }
  }

  addRelicsOfDeath() {
    if (this.level <= 1) {
      const newRelics = new RelicsOfDeath(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 50)),
        0,
        60, 60,
        './img/relics.png'
      );
      this.relics.push(newRelics);
    }
  }

  addLetter() {
    if (this.level <= 1) {
      const newLetter = new Letter(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 50)),
        0,
        60, 60,
        './img/letter.png'
      );
      this.letters.push(newLetter);
    }
  }

  addSpell() {
    if (this.level <= 1) {
      const newSpell = new Spell(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 50)),
        0,
        50, 50,
        './img/raio.png'
      );
      this.spells.push(newSpell);
    }
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

  addSecondDementors() {
    if (this.level > 1) {
      const newSecondDementor = new SecondDementor(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 50)),
        0,
        80, 130,
        './img/second-dementer.png'
      );
      this.secondDementors.push(newSecondDementor);
    }
  }

  addMagicPotion() {
    if (this.level > 1) {
      const newMagicPotion = new MagicPotion(
        this.gameBox,
        Math.floor(Math.random() * (this.width - 30)),
        0,
        30, 60,
        './img/magic-potion.png'
      );
      this.magicPotions.push(newMagicPotion);
    }
  }


  start() {
    this.homeScreen.style.height = `${this.height}px`
    this.gameBox.style.width = `${this.width}px`;

    this.homeScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameBox.style.display = "block";

    this.addEventListeners();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency);

    this.snitchIntervalId = setInterval(() => {
      this.addSnitch();
    }, 2000);

    this.relicsIntervalId = setInterval(() => {
      this.addRelicsOfDeath();
    }, 3000);

    this.spellIntervalId = setInterval(() => {
      this.addSpell();
    }, 1000);

    this.letterIntervalId = setInterval(() => {
      this.addLetter();
    }, 2000);

    this.dementorIntervalId = setInterval(() => {
      this.addDementors();
    }, 2000);

    this.secondDementorIntervalId = setInterval(() => {
      this.addSecondDementors();
    }, 3000);

    this.magicPotionIntervalId = setInterval(() => {
      this.addMagicPotion();
    }, 4000);

    

    this.timerIntervalId = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();
      console.log(this.timeLeft)
      if (this.timeLeft === 0 && this.level === 1) {
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
      clearInterval(this.relicsIntervalId);
      clearInterval(this.spellIntervalId);
      clearInterval(this.letterIntervalId);
      clearInterval(this.secondDementorsIntervalId);
      clearInterval(this.magicPotionIntervalId);
      
    }
  }

  update() {
    if (this.gameIsOver) return;
    this.harry.move();


    for (let i = 0; i < this.snitches.length; i++) {
      const snitchh = this.snitches[i]
      snitchh.move();
      console.log(`tou nas snitchs`)
      if (this.harry.didCollide(snitchh)) {
        snitchh.element.remove();
        this.snitches.splice(i, 1);
        this.score += 5
        this.updateScore();
        i--;

        if (this.score >= this.scoreToAdvance && this.level < this.maxLevel) {
          this.nextLevel();
        } else if (this.lives < 1) {
          this.gameOver();
        }

      } else if (snitchh.top > this.height) {
        snitchh.element.remove();
        this.snitches.splice(i, 1);
        i--;
      }
    }

    for (let r = 0; r < this.relics.length; r++) {
      const relicsOfDeath = this.relics[r]
      relicsOfDeath.move();
      console.log(`tou nas relics`)

      if (this.harry.didCollide(relicsOfDeath)) {
        relicsOfDeath.element.remove();
        this.relics.splice(r, 1);
        this.score += 5
        this.updateScore();
        r--;

        if (this.score >= this.scoreToAdvance && this.level < this.maxLevel) {
          this.nextLevel();
        } else if (this.lives < 1) {
          this.gameOver();
        }

      } else if (relicsOfDeath.top > this.height) {
        relicsOfDeath.element.remove();
        this.relics.splice(r, 1);
        r--;
      }
    }

    for (let s = 0; s < this.spells.length; s++) {
      const spell = this.spells[s];
      spell.move();
      console.log(`tou nas spell`)

      if (this.harry.didCollide(spell)) {
        spell.element.remove();
        this.spells.splice(s, 1);
        s--;

        this.showSpellOnScreen();

        if (this.lives < 1) {
          this.gameOver();
        }

      } else if (spell.top > this.height) {
        spell.element.remove();
        this.spells.splice(s, 1);
        s--;
      }
    }

    for (let l = 0; l < this.letters.length; l++) {
      const letter = this.letters[l]
      letter.move();
      console.log(`tou nas letters`)

      if (this.harry.didCollide(letter)) {
        letter.element.remove();
        this.letters.splice(l, 1);
        this.score += 3
        this.updateScore();
        l--;

        if (this.score >= this.scoreToAdvance && this.level < this.maxLevel) {
          this.nextLevel();
        } else if (this.lives < 1) {
          this.gameOver();
        }

      } else if (letter.top > this.height) {
        letter.element.remove();
        this.letters.splice(l, 1);
        l--;
      }
    }


    for (let j = 0; j < this.dementors.length; j++) {
      const dementor = this.dementors[j];
      dementor.move();
      console.log(`tou nas dementadores ${this.lives}`)
      if (this.lives < 1) {
        this.gameOver();
      }
      if (this.timeLeft < 1) {
        this.winner();
      }

      if (this.harry.didCollide(dementor)) {
        this.lives--;
        this.updateLives();
        console.log('colidiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        dementor.element.remove();
        this.dementors.splice(j, 1);
        j--;
      }


      
    }

    for (let d = 0; d < this.secondDementors.length; d++) {
      const secondDementor = this.secondDementors[d];
      secondDementor.move();
      console.log(`tou nas segundo dementador ${this.lives}`)

      if (this.lives < 1) {
        this.gameOver();
      }
      if (this.timeLeft < 1) {
        this.winner();
      }

      if (this.harry.didCollide(secondDementor)) {
        this.lives--;
        this.updateLives();
        console.log('colidiu')
        secondDementor.element.remove();
        this.secondDementors.splice(d, 1);
        d--;
      }
    }

    for (let m = 0; m < this.magicPotions.length; m++) {
      const magicPortion = this.magicPotions[m];
      magicPortion.move();
      console.log(`tou nas magic`)
      if (this.lives < 1) {
        this.gameOver();
      }
      if (this.timeLeft < 1) {
        this.winner();
      }

      if (this.harry.didCollide(magicPortion)) {
        magicPortion.element.remove();
        this.magicPotions.splice(m, 1);
        m--;

        this.extraLife();

      } else if (magicPortion.top > this.height) {
        magicPortion.element.remove();
        this.magicPotions.splice(m, 1);
        m--;
      }
    }


  }

  showSpellOnScreen() {
    const printSpells = ["Alohomora", "Lumos", "Stupefy", "Expecto Patronum", "Expelliarmus"];
    const randomSpell = printSpells[Math.floor(Math.random() * printSpells.length)];
    const spellElement = document.createElement('div');
    spellElement.textContent = randomSpell;
    spellElement.className = 'spell-display';
    this.gameScreen.appendChild(spellElement);

    setTimeout(() => {
      spellElement.remove();
    }, 1000)
  }

  extraLife() {
    this.lives += 1;
    this.updateLives();
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
    clearInterval(this.relicsIntervalId);
    clearInterval(this.spellIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);
    clearInterval(this.letterIntervalId);
    clearInterval(this.secondDementorsIntervalId);
    clearInterval(this.magicPotionIntervalId);
    


    this.harry.element.remove();
    this.timeLeft = 0;
    this.gameIsOver = true;
    this.gameBox.style.display = "none";
    this.gameScreen.style.display = "none";
    this.gameOverScreen.style.display = "block";
  }

  nextLevel() {
    if (this.gameIsOver) return;

    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.relicsIntervalId);
    clearInterval(this.spellIntervalId);
    clearInterval(this.letterIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);
    clearInterval(this.secondDementorsIntervalId);
    clearInterval(this.magicPotionIntervalId);
    


    this.gameBox.style.display = "none";
    this.gameScreen.style.display = "none";
    this.scoreElement.style.display = "none";
    this.livesElement.style.display = "none";
    this.timerElement.style.display = "none";
    this.nextLevelScreen.style.display = "block";
    // a partir de aqui estou a reiniciar o jogo
  }

  resetGameElements() {
    this.score = 0;
    this.lives = 3;
    this.timeLeft = 30;
    this.gameBox.innerHTML = null;
    this.harry = new Harry(this.gameBox, 100, 250, 120, 100, './img/second harry.png');
    this.gameBox.style.backgroundImage = "url('./img/castle')";
    this.snitches = [];
    this.relics = [];
    this.spells = [];
    this.letters = [];
    this.dementors = [];
    this.secondDementors = [];
    this.updateScore();
    this.updateLives();
    this.updateTimer();
    this.start();
  }

  startNewLevel() {
    if (this.gameIsOver) return;
    this.resetGameElements();
    this.level++;
    this.timeLeft = 10;
    this.nextLevelScreen.style.display = "none";
    this.gameBox.style.display = "block";
    this.gameScreen.style.display = "block";
    this.scoreElement.style.display = "block";
    this.livesElement.style.display = "block";
    this.timerElement.style.display = "block";
    this.homeScreen.style.height = `${this.height}px`
    this.gameBox.style.width = `${this.width}px`;
  }


  checkWinner() {
    if (this.lives >= 1 && this.level === 2 && this.timer < 1) {
      this.winner();
      return true;
    }
    return false;
  }

  winner() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.snitchIntervalId);
    clearInterval(this.relicsIntervalId);
    clearInterval(this.spellIntervalId);
    clearInterval(this.letterIntervalId);
    clearInterval(this.dementorIntervalId);
    clearInterval(this.timerIntervalId);
    clearInterval(this.secondDementorsIntervalId);
    clearInterval(this.magicPotionIntervalId);
    



    this.gameBox.style.display = "none";
    this.gameScreen.style.display = "none";
    this.nextLevelScreen.style.display = "none";
    this.winnerScreen.style.display = "block";
    this.gameIsOver = true;
  }

}


