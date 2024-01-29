// select html elements
const grid = document.querySelector('.grid');
const time = document.querySelector('.timer');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainBtn = document.querySelector('.play-again');

// Nested Array
const gridMatrix = [
  ['', '', '', '', '', '', '', '', ''],
  [
    'river',
    'wood',
    'wood',
    'river',
    'wood',
    'river',
    'river',
    'river',
    'river',
  ],
  ['river', 'river', 'river', 'wood', 'wood', 'river', 'wood', 'wood', 'river'],
  ['', '', '', '', '', '', '', '', ''],
  ['road', 'bus', 'road', 'road', 'road', 'car', 'road', 'road', 'road'],
  ['road', 'road', 'road', 'car', 'road', 'road', 'road', 'road', 'bus'],
  ['road', 'road', 'car', 'road', 'road', 'road', 'bus', 'road', 'road'],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];

// Initialise variables the contorl game "settings"
// These are based on array above

const victoryRow = 0;
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
const duckPosition = { x: 4, y: 8 }; // 8 is index 8. 4 is the 4th position in the 8th row down.
let contentBeforeDuck = '';
let timer = 15;

function drawGrid() {
  grid.innerHTML = '';

  // for each row in gridMatrix we need to proces what is going to be displayed on screen
  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    gridRow.forEach(function (cellContent, cellContentIndex) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      // [1, 2]
      if (riverRows.includes(gridRowIndex)) {
        cellDiv.classList.add('river');
        // [4, 5, 6]
      } else if (roadRows.includes(gridRowIndex)) {
        cellDiv.classList.add('road');
      }

      // '' --> "falsy"
      // 'river', 'road', 'car' --> "truthy"
      if (cellContent) {
        cellDiv.classList.add(cellContent);
      }

      grid.appendChild(cellDiv);
    });
  });
}


// Touch events for other devices


// grid.addEventListener("touchstart", e => {
  
//})
//document.addEventListener("touchstart", e => {
  //console.log("Start")
//})
//document.addEventListener("touchmove", e => {
  //console.log("Move")
//})
//document.addEventListener("touchend", e => {
  //console.log("End")
//})

// DUCK FUNCTIONS
function placeDuck() {
  contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
  gridMatrix[duckPosition.y][duckPosition.x] = 'duck';
  // gridMatrix[8][4]
}

grid.addEventListener('touchstart', function (event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}, false);

grid.addEventListener('touchend', function (event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
}, false);

function moveDuck(event) {
  const key = event.key;
  console.log(key);
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
  // arrows and WASD
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      if (duckPosition.y > 0) duckPosition.y--;
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      if (duckPosition.y < 8) duckPosition.y++;
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      if (duckPosition.x > 0) duckPosition.x--;
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      if (duckPosition.x < 8) duckPosition.x++;
      break;
  }

  render();
}

//TOUCH EVENTS

let touchstartX, touchstartY, touchendX, touchendY;

grid.addEventListener('touchstart', function (event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}, false);

grid.addEventListener('touchend', function (event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
}, false);

function handleGesture() {
  const deltaX = touchendX - touchstartX;
  const deltaY = touchendY - touchstartY;

  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0 && duckPosition.x < 8) {
      duckPosition.x++; // Swipe right
      console.log('Swiped Right');
    } else if (deltaX < 0 && duckPosition.x > 0) {
      duckPosition.x--; // Swipe left
      console.log('Swiped Left');
    }
  } else {
    if (deltaY > 0 && duckPosition.y < 8) {
      duckPosition.y++; // Swipe down
      console.log('Swiped Down');
    } else if (deltaY < 0 && duckPosition.y > 0) {
      duckPosition.y--; // Swipe up
      console.log('Swiped Up');
    }
  }

  render();
}


function updateDuckPosition() {
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  if (contentBeforeDuck === 'wood') {
    if (duckPosition.y === 1 && duckPosition.x < 8) duckPosition.x++;
    else if (duckPosition.y === 2 && duckPosition.x > 0) duckPosition.x--;
  }
}

function checkPosition() {
  if (duckPosition.y === victoryRow) endGame('duck-arrived');
  else if (contentBeforeDuck === 'river') endGame('duck-drowned');
  else if (contentBeforeDuck === 'car' || contentBeforeDuck === 'bus')
    endGame('duck-hit');
}

// animation functions
function moveRight(gridRowIndex) {
  // get all cells in current row
  const currentRow = gridMatrix[gridRowIndex];

  // remove last element..
  const lastElement = currentRow.pop();

  // put it back to the beginning
  currentRow.unshift(lastElement);
}

function moveLeft(gridRowIndex) {
  const currentRow = gridMatrix[gridRowIndex];
  const firstElement = currentRow.shift();
  currentRow.push(firstElement);
}

function animateGame() {
  //anitmate river
  moveRight(1);
  moveLeft(2);

  // animate road
  moveRight(4);
  moveRight(5);
  moveRight(6);
}

// game logic win/lose
function endGame(reason) {
  //victory
  if (reason === 'duck-arrived') {
    endGameText.innerHTML = 'YOU<br>WIN';
    endGameScreen.classList.add('win');
  }

  gridMatrix[duckPosition.y][duckPosition.x] = reason;

  // stop timer
  clearInterval(countdownLoop);
  clearInterval(renderLoop);

  // stop player from being able to control duck
  document.removeEventListener('keyup', moveDuck);
  //display game over
  endGameScreen.classList.remove('hidden');
}

function countdown() {
  if (time != 0) {
    time--;
    timer.innerText = time.toString().padStart(5, '0');
  }

  if (time === 0) {
    //end game
    endGame();
  }
}

//RUNNING THE GAME
// rendering
function render() {
  placeDuck();
  checkPosition();
  drawGrid();
}

// Annonymous function
const renderLoop = setInterval(function () {
  updateDuckPosition();
  animateGame();
  render();
}, 600);

const countdownLoop = setInterval(countdown, 1000);

document.addEventListener('keyup', moveDuck);
playAgainBtn.addEventListener('click', function () {
  location.reload();
});

// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events