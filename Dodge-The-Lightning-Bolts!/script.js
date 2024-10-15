// 1. Set up the HTML canvas as our game area
var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");
// 2. Create images and link the respective sources
// Tell the variable that it will be an image
var car = new Image();
// Add the image source
car.src = "images/thing-thing1 copy.png"
var lightning = new Image();
lightning.src = "images/lightning.png";
var background = new Image();
background.src = "images/thing-thing-thing.png";

// get context exercise
// document.addEventListener('DOMContentLoaded ',function(){
// var c = document.getElementById("myCanvas");
// var cx = c.getContext("2d");
// setting the starting point to be on the top left hand corner
//   cx.moveTo(0,0)  
//   setting the end point
//   cx.lineTo(600,520);
//   to draw the actual line 
//   cx.stroke();
// cx.beginPath();
// circle setting of x coordinate, y coordinate, hte start angle, the end angle, clockwise?
// cx.arc(260,300,200,0, 2* Math.PI);
// cx.stroke();
// cx.closePath();
// add text
// cx.beginPath();
// cx.font = " 100px Madimi One"
// cx.strokeText("strokeText,",100,260);
// cx.fillText("fillText", 260, 260);
// cx.stroke();
// ctx.closePath();
// to create a gradient...
// // starting x-coordinate starting y-coordinate ending x-coordinate ending y-coordinate
// // var grid1 = cx.createLinearGradient(0,0,300,520);
// // grid1.addColorStop(0," blue");
// // grid1.addColorStop(1,"yellow");
// // cx.fillStyle = grid1;
// // cx.fillRect(0,0,300,520);
// // x-coordinate of centre of first circle, y- coordinate, radius,x-coordinate of the centre of the second circle, y- coordinate and radius
//   var grid2 = cx.createRadialGradient(450,260,50,450,260,100);
//   grid2.addColorStop(1,"orange");
//   grid2.addColorStop(0,"blue");
//   cx.fillStyle = grid2;
//   cx.fillRect(260,0,600,520);
//  });
// 3. Set up the initial game settings
var wX = 25; 
var wY = cvs.height/2;
var gravity = 1.5;
var score = 0;
// 4.create a function to jump up when the mouse is clicked
document.addEventListener("mousedown", moveUp);
function moveUp(){
  wY -= 50;
}
// 5. Spawn the first obstacle by creating a list
var obstacle = [];
obstacle[0] ={
  x: 550,
  y: 400
};
// 6. Create a function to draw within the canvas
function draw() {
  ctx.drawImage(background, 0, 0);
  // 6.1 Draw the background, spawn obstacles and make them move across the canvas 
  for(var i=0; i < obstacle.length; i++){
    ctx.drawImage(lightning,obstacle[i].x, obstacle[i].y);
    obstacle[i].x--;
    if (obstacle[i].x == 300) {
      obstacle.push({
        x: cvs.width,
        y: 
          Math.floor(Math.random()*lightning.height)+lightning.height
      });
    }
    //  6.2 Check if the wagon collides with the obstacles. If yes, reload the page. If no, add one score.
    if (wX + car.width >= obstacle[i].x && wX <= obstacle[i].x + lightning.width && wY <= obstacle[i].y + lightning.height && wY + car.height >= obstacle[i].y || wY == 500){
      location.reload();
    }
    if (obstacle[i].x == 5){
      score++;           
    }
  }
  // 6.3 Draw the car and make it move according to gravity
  ctx.drawImage(car, wX, wY);
  wY += gravity;
  let highscore = 0;
  // 6.4 Store player's high score locally (hardware wise, only store the score on the laptot/ computer the user is using to play the game)
  if (localStorage.getItem("highscore")){
   highscore = localStorage.getItem("highscore");
  }
  if (score > highscore){
    highscore = score;
  }
  window.localStorage.setItem("highscore", highscore);
  // 6.5 Draw the text to show the current and high score
  ctx.fillStyle = "white";
  ctx.font = " 20px Madimi One";
  ctx.fillText("Score: " +score, 10, cvs.height-50);
  // added the high score part and positioned it higher than score
   ctx.fillText("High Score: " +highscore, 10, cvs.height-20);
  // 6.6 Update vour canvas frame
  requestAnimationFrame(draw);
}
// 7 Excecute The main function
draw();