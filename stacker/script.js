// Prepare

//Select element we want to interact with in the html file

const grid = document.querySelector('.grid');
const stackButton = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainBtn = document.querySelector('.play-again');

// Create game grid
// add array of arrays 0=empty cell
// 1= bar=segment

const gridMatrix = [
  [0, 0, 0, 0, 0, 0], //index 0
  [0, 0, 0, 0, 0, 0], //index 1
  [0, 0, 0, 0, 0, 0], //index 2
  [0, 0, 0, 0, 0, 0], //index 3
  [0, 0, 0, 0, 0, 0], //index 4
  [0, 0, 0, 0, 0, 0], //index 5
  [0, 0, 0, 0, 0, 0], //index 6
  [1, 1, 1, 0, 0, 0], //index 7
  // this is current starting currentRowIndex
];

// keep track of values whilst playing
let currentRowIndex = gridMatrix.length - 1;
let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;

function draw() {
  //alway reset display when this function is called
  grid.innerHTML = '';

  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {
      //create a cell
      const cell = document.createElement('div');
      cell.classList.add('cell'); //not adding a dot to cell as it pulls from css

      if (cellContent === 1) {
        cell.classList.add('bar');
      }

      grid.appendChild(cell);
    });
  });
}

// game logic and controls. Stacking

//end game function
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON!';
    endGameScreen.classList.add('win');
  }
  // removing the hidden class from html
  endGameScreen.classList.remove('hidden');
}

//win function
function checkWin() {
  // win when you ge tto the top of the grid
  if (currentRowIndex === 0) {
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

//lose funtion
function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];

  if (!prevRow) return;

  // check if there is one accumulated stack
  // element under each bar

  for (let i = 0; i < currentRow.length; i++) {
    // if no stack below a bar element, remove 1 bar piece for both the current and new bar stack in the next loop
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      currentRow[i] = 0;
      barSize--;
    }

    if (barSize === 0) {
      isGameOver = true;
      clearInterval(gameInterval);
      endGame(false);
    }
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkWin();
  checkLost();
  updateScore();

  if (isGameOver) return;

  // this is same as below currentRowIndex--;
  currentRowIndex--;
  barDirection = 'right';

  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }
  draw();
}

function moveRight(currentRow) {
  // [1, 1, 1, 0, 0, 0]
  currentRow.pop(); //[1, 1, 1, 0, 0]
  currentRow.unshift(0); // [0, 1, 1, 1, 0, 0]
}

function moveLeft(currentRow) {
  // [0, 0, 0, 1, 1, 1]
  currentRow.shift(); // [0, 0, 1, 1, 1]
  currentRow.push(0); // [0, 0, 1, 1, 1, 0]
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === 'right') {
    moveRight(currentRow);

    const lastElement = currentRow[currentRow.length - 1];
    if (lastElement === 1) {
      barDirection = 'left';
    }
  } else if (barDirection === 'left') {
    moveLeft(currentRow);

    const firstElement = currentRow[0]; //zeroth index of first element of array
    if (firstElement === 1) {
      barDirection = 'right';
    }
  }
}
draw();
// move bar function calls
function main() {
  draw();
  moveBar();
}

function onPlayAgain() {
  window.location.reload();
}

//Click event
stackButton.addEventListener('click', onStack);
playAgainBtn.addEventListener('click', onPlayAgain);
const gameInterval = setInterval(main, 600);

//NOTES

// 1 == 1 equality
// 1 === strict equality, compares the value and data type

// console.log(isGameOver is a:', typeof isGameOVer); this helps understand the type for example a number, integer, boolean
