class Game {
    constructor() {
    this.homeScreen =  document.querySelector('#home-screen')
    this.gameBox =  document.querySelector('#game-box')
    this.gameOverScreen =  document.querySelector('#game-over-screen')
    this.harry = new Harry(
    this.gameBox,
    100,
    250,
    90,
    80,
    './img/icon.png'
    ),
    this.height= 800,
    this.width = 600,
    this.snitches = [],
    this.score = 0,
    this.lives = 3,
    this.gameIsOver = false,
    this.gameIntervalId,
    this.gameLoopFrequency = Math.round(1000/60)
    }
    start(){
        this.homeScreen.style.height = `${this.height}px`
        this.gameBox.style.width = `${this.width}px`;
    
        this.homeScreen.style.display = "none";
    
        this.gameBox.style.display = "block";

        this.addEventListeners();
    
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
          }, this.gameLoopFrequency);
    }
    
    gameLoop(){
        console.log("in the game loop");
        
        this.update();
    
        
        if (this.gameIsOver) {
          clearInterval(this.gameIntervalId)
        }
      }
    
      update() {
        console.log("in the update");
        this.harry.move();
    }

    addEventListeners() {
      window.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();// poe em minusculas o teclado
        if(['arrowup', 'w'].includes(key)) {
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
       if(['arrowup', 'arrowdown'].includes(key)) {
        this.harry.setDirection(0, 0) // move se verticalmente
       } else if(['arrowleft', 'arrowright'].includes(key)) {
        this.harry.setDirection(0, 0) // move se horizontalmente
       }
      })
    }
    }