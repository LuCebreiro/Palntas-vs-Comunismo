const canvas = document.querySelector('#my-canvas');


const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#start-button');
const reloadButton = document.querySelector('.reload-button');
const startPage = document.querySelector('.container');
const canvasGame = document.querySelector('.game-container');

const game = new Game(ctx);
//game.start();


document.addEventListener('keydown', (event) => game.player.onKeyEvent(event));
document.addEventListener('keyup', (event) => game.player.onKeyEvent(event));

startButton.addEventListener('click', () => {
  startPage.classList.add('hidden')
  canvasGame.classList.remove('hidden');

  startButton.setAttribute('disabled', true);
  game.start();
  game.music.play();

});

reloadButton.addEventListener('click', () => {
  document.location.reload()
});