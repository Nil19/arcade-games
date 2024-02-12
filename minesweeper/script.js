// const (constant - never changes)
// let (let me change)

//Constants
const totalCells = 100;
const totalBombs = 15;
const maxScore = totalCells - totalBombs;
const bombsList = []; // this is an array
const gridWidth = 10;
const gridHeight = 10;

//pulling html to js. Elements
const scoreCounter = document.querySelector('.score');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-screen');
const endGameText = document.querySelector('.end-screen-text');
const playAgainButton = document.querySelector('.play-again');

let score = 0;

//create grid
function createGrid() {
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-row', row);
      cell.setAttribute('data-col', col);
      cell.addEventListener('click', cellClickHandler);
      cell.addEventListener('touchstart', cellClickHandler);
      grid.appendChild(cell);
    }
  }
}

// Generate a list of unique bombs
function generateBombs() {
  while (bombsList.length < totalBombs) {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * totalCells) + 1;

    // Add the number to the list if not already included
    if (!bombsList.includes(randomNumber)) {
      bombsList.push(randomNumber);
    }
  }
}

function initGame() {
  createGrid();
  generateBombs();
}

// Cell Clicks

function cellClickHandler(event) {
  const cell = event.target;
  const row = parseInt(cell.getAttribute('data-row'));
  const col = parseInt(cell.getAttribute('data-col'));
  const cellIndex = row * gridWidth + col + 1;

  if (cell.classList.contains('cell-clicked')) {
    return;
  }

  if (bombsList.includes(cellIndex)) {
    cell.classList.add('cell-bomb');
    endGame(false);
  } else {
    cell.classList.add('cell-clicked');
    const bombsNearby = countBombsNearby(row, col);
    if (bombsNearby > 0) {
      cell.innerText = bombsNearby;
    } else {
      // If no bombs nearby, recursively reveal adjacent cells
      revealAdjacentCells(row, col);
    }
    updateScore();
  }
}

// Count bombs nearby a cell
function countBombsNearby(row, col) {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < gridHeight && j >= 0 && j < gridWidth) {
        const cellIndex = i * gridWidth + j;
        if (bombsList.includes(cellIndex)) {
          count++;
        }
      }
    }
  }
  return count;
}

// Recursive function to reveal adjacent cells with no bombs nearby
function revealAdjacentCells(row, col) {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      const cellIndex = i * gridWidth + j + 1;
      const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
      if (i >= 0 && i < gridHeight && j >= 0 && j < gridWidth && !cell.classList.contains('cell-clicked')) {
        cell.classList.add('cell-clicked');
        const bombsNearby = countBombsNearby(i, j);
        if (bombsNearby === 0) {
          revealAdjacentCells(i, j);
        } else {
          cell.innerText = bombsNearby;
        }
      }
    }
  }
}


// *---------------------------
// * FUNCTIONS
// *---------------------------

// Score update

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, '0');

  if (score === maxScore) {
    endGame(true);
  }
}

// Function for when the game ends
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WIN';
    endGameScreen.classList.add('win');
  }

  revealAllBombs();
  endGameScreen.classList.remove('hidden');
}

// Function to reveal all bombs
function revealAllBombs() {
  const cells = document.querySelectorAll('.cell');

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
    }
  }
}

playAgainButton.addEventListener('click', function () {
  window.location.reload();
});

initGame();