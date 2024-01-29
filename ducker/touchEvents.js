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
//grid.addEventListener('touchstart', function (event) {
  //touchstartX = event.changedTouches[0].screenX;
  //touchstartY = event.changedTouches[0].screenY;
//}, false);

//grid.addEventListener('touchend', function (event) {
  //touchendX = event.changedTouches[0].screenX;
 //touchendY = event.changedTouches[0].screenY;
 // handleGesture();
///}, false);

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
