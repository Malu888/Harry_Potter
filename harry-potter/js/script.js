


window.onload = function () {
    const startButton = document.querySelector("#start-btn");
    const restartButton = document.querySelector("#restart-btn");
    const startNextLevelButton = document.querySelector('#start-next-level-btn');
    let game;
    startButton.addEventListener("click", function () {
      startGame();
    });

    function restartGame() {
      location.reload();
    }

    restartButton.addEventListener("click", function () {
    restartGame();
    });

    startNextLevelButton.addEventListener('click', function () {
      if (game) { 
        game.startNewLevel();
      } else {
        console.error("O jogo ainda não foi iniciado!");
      }

    
    });
  
    function startGame() {
      console.log("start game");
      game = new Game();
      game.start();
    }
  
  };
  

