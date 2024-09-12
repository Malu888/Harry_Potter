window.onload = function () {
  const instructionsButton = document.querySelector('#instructions-btn');
  const startButton = document.querySelector("#start-btn");
  const restartButtons = document.querySelectorAll("#restart-btn");
  const startNextLevelButton = document.querySelector('#start-next-level-btn');
  const homeScreen = document.querySelector('#home-screen');
  const textScreen = document.querySelector('#text');
  const music = document.querySelector("#background-music");
  let game;

  instructionsButton.addEventListener("click", function () {
    music.play()
    homeScreen.style.display = 'none';
    textScreen.style.display = 'block';
  });

  startButton.addEventListener("click", function () {
    textScreen.style.display = 'none';
    startGame();
  });

  function restartGame() {
    location.reload();
  }

  for (let i = 0; i < restartButtons.length; i++) {
    restartButtons[i].addEventListener("click", function () {
      restartGame();
    })
  };

  startNextLevelButton.addEventListener('click', function () {
    if (game) {
      game.startNewLevel();
    } else {
      console.error("O jogo ainda não foi iniciado!");
    }
  });



  function startGame() {
    game = new Game();
    game.start();
  }
};




