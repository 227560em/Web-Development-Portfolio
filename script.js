// Load up our content and run a few things
document.addEventListener("DOMContentLoaded", () => {
  // set up our canvas
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  // add in the coordinates of our snake               Size of canvas = 600 x 520
  var snakeX = 50;
  var snakeY = 200;
  // add in the coordinates of our apple               Math.floor is to turn float (decimal) into integers
  var appleX = Math.floor(Math.random() * ((canvas.width - 50)/50 + 1)) * 50;
  var appleY = Math.floor(Math.random() * ((canvas.height - 50)/ 50 + 1)) * 50;
  // set up the game by recognising keyboard inputs
  document.addEventListener("keydown", move, false);
  // set up the high score
  if (localStorage.getItem("snake-highscore")) document.getElementById("highscore").innerHTML = "High Score: " + localStorage.getItem("snake-highscore");
  //set up arrow keys tp play the game
  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;
  // set up the score
  var score = 0
  // move our snake based on the keys we press on our keyboard
  // function is to make calling up many lines of code in a simple way, you just have to call the name of the function
  function move(event) {
    if (event.code == "ArrowRight") {
      rightPressed = true;
      leftPressed = false;
      upPressed = false;
      downPressed = false;
    } else if (event.code == "ArrowLeft") {
      rightPressed = false;
      leftPressed = true;
      upPressed = false;
      downPressed = false;
    } else if (event.code == "ArrowUp") {
      rightPressed = false;
      leftPressed = false;
      upPressed = true;
      downPressed = false;
    } else if (event.code == "ArrowDown") {
      rightPressed = false;
      leftPressed = false;
      upPressed = false;
      downPressed = true;
    }
  }
  // draw the snake and make it move according to the keystrokes above
  function drawSnake() {
    if(rightPressed){
      // 50 refers to tge width of our snake and we are checking to see if it is not at the edge of out canvas,meaning we have space to move the snake to the right                                != = not equals
      if(snakeX != canvas.width - 50)
        // when we move our snake, we move it according to our snake picture size
        snakeX += 50;
      else
        death();
    } else if (leftPressed) {
      // if,if else, else indentation is important
      if (snakeX != 0)
        snakeX -= 50;
      else
        death();
    } else if (downPressed) {
      if (snakeY != canvas.height - 50)
        snakeY += 50;
      else
        death();
    } else if (upPressed) {
      if (snakeY != 0)
        snakeY -= 50;
      else
        death();
    }
    // when you press the arrow keys too fast that the snake gets dizzy and bumps itself
    collisionCheck();
    var img = document.getElementById("image");
    ctx.drawImage(img, snakeX, snakeY, 50, 50);
  }
  function death() {
    alert("Unfortunately, you failed so...YOU ARE DEAD")
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    highScore();
    document.getElementById("highscore").innerHTML = "High Score: " + localStorage.getItem("snake-highscore");
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
  }
  // We will now check if the snake collides with our apple, add points accordingly
  function collisionCheck() {
    if (snakeX == appleX & snakeY == appleY) {
      appleX = Math.floor(Math.random() *
        ((canvas.width - 50) / 50 + 1)) * 50;
      appleY = Math.floor(Math.random() *
        ((canvas.height - 50) / 50 + 1)) * 50;
      //  ++ means add 1
      score++;
      // update our score html wise so that people can see the updated score
      document.getElementById("score").innerHTML = "Score: " + score;
    }
  }
  // draw abox making use of the canvas property, colouring it red to represent the apple
  function drawApple() {
    ctx.rect(appleX, appleY, 50, 50);
    ctx.fillStyle = "red";
    ctx.fill()
  }
  // add it our canvas
  function draw() {
    // at the beginning of our game, we want a clean canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawSnake();
    ctx.closePath();
    ctx.beginPath();
    drawApple();
    ctx.closePath();
  }
  function highScore() {
    // ! is the operator NOT
    // if we cannot get the local storage, we will set the highscore to be 0
    if (!localStorage.getItem("snake-highscore")) {
      localStorage.setItem("snake-highscore", 0);
    } else {
      if (localStorage.getItem("snake-highscore") < score) {
        localStorage.setItem("snake-highscore", score);
      }
    }
  }
  //  make the sprites move
  setInterval(draw, 100);
  setInterval(move, 100);
})