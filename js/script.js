window.onload = function () {
  const startButton = document.querySelector("#start-btn");
  const restartButtons = document.querySelectorAll("#restart-btn");
  const startNextLevelButton = document.querySelector('#start-next-level-btn');
  const audio = document.querySelector('#myaudio');

  let game;
  startButton.addEventListener("click", function () {
    startGame();
    audio.play().then(function () {
      console.log("Música iniciada com sucesso.");
    }).catch(function (error) {
      console.log("Erro ao tentar iniciar a música: " + error);
    });
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




