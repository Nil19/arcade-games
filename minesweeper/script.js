// const (constant - never changes)
// let (let me change)

//pulling html to js
const scoreCounter = document.querySelector('.score');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-screen');
const endGameText = document.querySelector('.end-screen-text');
const playAgainButton = document.querySelector('.play-again');

const totalCells = 100;
const totalBombs = 90;
const maxScore = 5;
// this is an array
const bombsList = [];

let score = 0;

function updateScore() {
  // ++ increases by 1
  score++;
  scoreCounter.innerText = score.toString().padStart(5, '0');

  if (score === maxScore) {
    endGame(true);
  }
}

//++ is increase by 1
for (let i = 1; i <= 100; i++) {
  //create 100 cells in js
  const cell = document.createElement('div');
  // cell = <div class="cell"></div>
  cell.classList.add('cell');

  cell.addEventListener('click', function () {
    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
      endGame(false);
    }
    cell.classList.add('cell-clicked');
    updateScore();
  });

  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  //generate a random number between 1 and 100, inclusive
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br />WON';
    endGameScreen.classList.add('win');
  }
  endGameScreen.claasList.remove('hidden');
}

playAgainButton.addEventListener('click', function () {
  window.location.reload();
});
