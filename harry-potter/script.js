/*// Pantallas
const homeScreenNode = document.querySelector("#home-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

//Botones
const startBtnNode = document.querySelector("#start-btn") 

//Game Box
const gameBoxNode = document.querySelector("#game-box")*/

window.onload = function () {
    const startButton = document.querySelector("#start-btn");
    const restartButton = document.querySelector("#restart-btn");
    let game;
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
      console.log("start game");
      game = new Game();
      game.start();
    }
  };
  

