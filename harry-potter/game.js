class Game {
    constructor() {
    this.homeScreen =  document.querySelector('#home-screen')
    this.gameBox =  document.querySelector('#game-screen')
    this.gameOverScreen =  document.querySelector('#game-over-screen')
    this.player = null,
    this.height= 600,
    this.width = 500,
    this.obstacles = [],
    this.score = 0,
    this.lives = 3,
    this.gameIsOver = false,
    this.gameIntervalId,
    this.gameLoopFrecuency = Math.round(1000/60)
    }
    start(){
        this.homeScreen.style.height = `${this.height}px`
        this.gameBox.style.width = `${this.width}px`;
    
        this.homeScreen.style.display = "none";
    
        this.gameBox.style.display = "block";
    
        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
          }, this.gameLoopFrequency)
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
    }
    update(){}
    
    }