// Prepare

//Select element we want to interact with in the html file

const grid = document.querySelector('.grid');
const stackButton = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Create game grid
// add array of arrays 0=empty cell
// 1= bar=segment

const gridMatrix = [
  [0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0], 
  [1, 1, 1, 0, 0, 0], // this is current starting currentRowIndex
];

// keep track of values whilst playing
let currentRowIndex = gridMatrix.length - 1;
// We start at the last index of the matrix as that is the
// bottom of the grid as displayed in the game
let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;

// FUNCTIONS

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

function moveRight(row) {
  row.pop();
  row.unshift(0);
}

function moveLeft(row) {
  row.shift();
  row.push(0);
}

function isRightEdge(row) {
  // Check if the right-most element of `row` has a value of 1.
  // If it does, then we know the bar has reached the right edge.
  const lastElement = row[row.length - 1];
  return lastElement === 1;
}

function isLeftEdge(row) {
  // As above for `isRightEdge` but for the left-most element.
  const firstElement = row[0];
  return firstElement === 1;
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === 'right') {
    moveRight(currentRow);

    // After moving the bar to the right, if it reaches the right edge,
    // we need to move the bar to the left in the next loop.
    if (isRightEdge(currentRow)) {
      barDirection = 'left';
    }
  } else if (barDirection === 'left') {
    moveLeft(currentRow);

    // Vice-versa.
    if (isLeftEdge(currentRow)) {
      barDirection = 'right';
    }
  }
}

// GAME LOGIC / CONTROLS

//end game function
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WIN!';
    endGameScreen.classList.add('win');
  }
  // removing the hidden class from html
  endGameScreen.classList.remove('hidden');
}

function onPlayAgain() {
  location.reload();
}

//win function
function checkWin() {
  // win when you ge tto the top of the grid
  if (currentRowIndex === 0 && !isGameOver) {
    updateScore();
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

//lose funtion
function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];

  // If there is no previous row (i.e. at game start)
  // then exit the function
  if (!prevRow) return;

  // Check whether there is at least one accumulated stack
  // element under each bar element
  for (let i = 0; i < currentRow.length; i++) {
    // If there is no accumulated stack element below a bar element...
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      // ...remove the overhanging bar pieces for both the current stack
      // and for the bar in the next loop
      currentRow[i] = 0;
      barSize--;

      // If the bar has no more pieces left, we've lost the game!
      if (barSize === 0) {
        isGameOver = true;
        clearInterval(gameInterval);
        endGame(false);
      }
    }
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkLost();
  checkWin();

  if (isGameOver) return;
  updateScore();

  // Move the current row up one and...
  currentRowIndex = currentRowIndex - 1;
  barDirection = 'right';

  // ...update `gridMatrix` to add a bar to the new row
  // starting from the first column/element
  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }
  // When we call the `draw` function, the cells which the bar occupied
  // in the row when we clicked "STACK" will retain the `.bar` style.
  // As we have just incremented the `currentRowIndex` variable, the moving
  // bar will be on the row above.
  draw();
}

//EVENTS

stackButton.addEventListener('click', onStack);
playAgainButton.addEventListener('click', onPlayAgain);

//START GAME

draw();

function main() {
  moveBar();
  draw();
}
const gameInterval = setInterval(main, 600);

//NOTES

// 1 == 1 equality
// 1 === strict equality, compares the value and data type

// console.log(isGameOver is a:', typeof isGameOVer); this helps understand the type for example a number, integer, boolean
// Start game loop.
// Every 600ms we call `main`:
// - `moveBar()` updates the values in the `gridMatrix` variable;
// - `draw()` updates the display based on the modified `gridMatrix`;
// We will make use of the `gameInterval` variable later.