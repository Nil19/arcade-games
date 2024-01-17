// Basic Expression

const cell = document.querySelectorAll('.cell');
const gameOverElement = document.querySelectorAll('.game-over');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');

// Define game state
let score = 0;
let timeLeft = 5;
let bugSpeed = 800;
let gameOver = false;

scoreDisplay.innerText = score;
timerDisplay.innerText = timeLeft;

function randomBug() {
  const randomNumber = Math.floor(Math.random() * cell.length);
  const cells = cell[randomNumber];
  cells.classList.add('bug');
}

const bugMovement = setInterval(randomBug, 800);

function removeBugs() {
  for (let i = 0; i < 9; i++) {
    const bugCell = cell[i];
    bugCell.classList.remove('bug');
  }
}

function countDown() {
  timerDisplay.innerText = timeLeft = --timeLeft;

  if (timeLeft === 0) {
    gameOver = true;
    clearInterval(bugMovement);
    clearInterval(timer);
    gameOverElement.innerText = 'Game Over! Score: ' + score;
  }
}

const timer = setInterval(countDown, 1000);
for (let i = 0; i < 9; i++) {
  const cells = cell[i];
}
