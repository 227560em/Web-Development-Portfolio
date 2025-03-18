// Get the modal
var modal = document.getElementById('myModal');
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      // When the user clicks on the button, we are going to open the modal
      modalfungo = function() {
        console.log("function is called");
        modal.style.display = "block";
        x = document.querySelector(".gamehead")
        x.textContent = "You Died";
      }
      modalfunwin = function() {
        console.log("function is called");
        modal.style.display = "block";
        x = document.querySelector(".gamehead")
        x.textContent = "Hurray, you are victorious!";
      }
// When we click on the play again words, we want to reload the entire page
document.getElementById("demo").addEventListener("click", myFunction);
function myFunction() {
  document.location.reload();
}
// When the user clicks on <span> (x) close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// Whne the user clicks anywhere outside of the modal, also close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Set up timer
function startTimer(duration, display) {
  // Starting the timer based off the date and time currently
  var start = Date.now(),
    diff,
    minutes,
    seconds;
  // Counting how long the player has left to play the game
  function timer() {
    if (playing) {
      diff = duration - (((Date.now() - start) / 1000) | 0);
      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = " Game ends in " + minutes + ":" + seconds;
      //  If times is up
      if (diff <= 0) {
        display.textContent = "You Died";
        start = Date.now() + 1000;
        playing = false;
        modalfungo();
      }
    }
  };
  timer();
  setInterval(timer, 1000);
}
// initial set up of the game
window.onload = function() {
  twominutes = 30;
  x = document.querySelector('#timerel');
  startTimer(twominutes, x)
}
playing = true;
window.addEventListener('keydown', doKeyDown, true);
function doKeyDown(evt) {
  var handled = false;
  if (playing) {
    switch (evt.keyCode) {
      case 38://up arrow key was pressed
        console.log("up")
        m.moveup("canvas");
        handled = true;
        break;
      case 87: //w key was pressed
        m.moveup("canvas");
        handled = true
        break;
      case 37: //left arrow key was pressed
        m.moveleft("canvas");
        handled = true;
        break;
      case 65: // a key was pressed
        m.moveleft("canvas");
        handled = true;
        break;
      case 39: //  right arrow key was pressed
        m.moveright("canvas");
        handled = true;
        break;
      case 83: // s key was pressed
        m.movedown("canvas");
        handled = true;
        break;
      case 40: // down arrow key was pressed
        m.movedown("canvas");
        handled = true;
        break;
      case 68: // d key was pressed
        m.moveright("canvas");
        handled = true;
        break;
    }
    if (m.checker("canvas"))
      playing = false
    console.log(m.getMoves())
  }
  if (handled)
    evt.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all otehr browsers)
}
var dsd = function(size) {
  this.N = size; // store the number of elements 
  this.P = new Array(this.N);// parent, each element is it's own parent
  this.R = new Array(this.N);// ranking below the parent of family tree
  this.init = function() {
    // initialise the data structure  (creating the family tree or ranking)
    //  initialization, condition, updation are the 3 things in a for loop.
    for (var i = 0; i < this.N; i++) {
      this.P[i] = i;
      this.R[i] = 0;
    }
  }
  // compare the different rankings, action: update or combine
  this.union = function(x, y) { // x & y = ranking
    var u = this.find(x);
    var v = this.find(y);
    if (this.R[u] > this.R[v]) {
      this.R[u] = this.R[v] + 1;
      this.P[u] = v;
    }
    else {
      this.R[v] = this.R[u] + 1;
      this.P[v] = u;
    }
  }
  // find the root of the element to check if its own parent or not. IF yes. return itself. If not, update and find.
  this.find = function(x) {
    if (x == this.P[x])
      return x;
    this.P[x] = this.find(this.P[x]);
    return this.P[x];
  }
};
//In our maze, we want a random number 1. Maze walls 2. Game area 3.
function random(min, max) {
  return (min + (Math.random() * (max - min)));
};
function randomChoice(choices) {
  // Math.round is to return the decimal into an integer
  return choices[Math.round(random(0, choices.length - 1))];
};
//create the maze
var maze = function(X, Y) {
  this.N = X; // store the number of rows of cells in the maze
  this.M = Y; // Store the number of columns of cells in the maze
  this.S = 25; //Size of each cell
  this.moves = 0;
  this.Board = new Array(2 * this.N + 1);// represents the maze itself and additional space for the walls
  this.EL = new Array(); // empty to store items in the maze ( entrance, exit, path)
  this.vis = new Array(2 * this.N + 1) // vis = visited, storing the cells we have visited
  this.delay = 2; // timing purposes, timer and animations or visiual updates
  this.x = 1; // initial position or starting point in our maze
  //build maze with code (adding walls, adding game area..)
  this.init = function() {
    for (var i = 0; i < 2 * this.N + 1; i++) {
      this.Board[i] = new Array(2 * this.M + 1);// walls
      this.vis[i] = new Array(2 * this.M + 1); //game area
    }
    for (var i = 0; i < 2 * this.N + 1; i++) {
      for (var j = 0; j < 2 * this.M + 1; j++) {
        if (!(i % 2) && !(j % 2)) {
          this.Board[i][j] = '+'; //corners and intersections
        }
        else if (!(i % 2)) {
          this.Board[i][j] = '-'; //horizontal walls
        }
        else if (!(j % 2)) {
          this.Board[i][j] = '|' //vertical walls
        }
        else {
          this.Board[i][j] = ' '; //paths
        }
        this.vis[i][j] = 0; // no cells have been visited
      }
    }
  }
  this.add_edges = function() {
    for (var i = 0; i < this.N; i++) {
      for (var j = 0; j < this.M; j++) {
        // != represents not equals to
        if (i != this.N - 1) { //rows
          this.EL.push([[i, j], [i + 1, j], 1]);
        }
        if (j != this.M - 1) { //columns
          this.EL.push([[i, j], [i, j + 1], 1]);
        }
      }
    }
  }
  //Hash Function, do some calculations
  this.h = function(e) {
    return e[1] * this.M + e[0];
  }
  this.randomize = function(EL) {
    for (var i = 0; i < EL.length; i++) {
      var si = Math.floor(Math.random() * 387) % EL.length;
      var tmp = EL[si];
      EL[si] = EL[i]
      EL[i] = tmp;
    }
    return EL;
  }
  // To remove some walls
  this.breakwall = function(e) {
    //calculation of x-coordinate
    var x = e[0][0] + e[1][0] + 1;
    //calculation of y-coordinate
    var y = e[0][1] + e[1][1] + 1;
    //turn it into space, "breaking" the wall
    this.Board[x][y] = ' ';
  }
  this.gen_maze = function() {
    // to randomize the order of the edges, so that maze creation is unpredictable
    this.EL = this.randomize(this.EL);
    //to keep track of the connected components
    var D = new dsd(this.M * this.M);
    D.init();
    // starting and ending points of our maze
    var s = this.h([0, 0]);
    var e = this.h([this.N - 1, this.M - 1]);
    //set up the initial player's postion and where it needs to go
    this.Board[1][0] = ' ';
    this.Board[2 * this.N - 1][2 * this.M] = ' ';
    //Kruskal's Algorithm 
    for (var i = 0; i < this.EL.length; i++) {
      var x = this.h(this.EL[i][0]);
      var y = this.h(this.EL[i][1]);
      if (D.find(s) == D.find(e)) {
        if (!(D.find(x) == D.find(s) && D.find(y) == D.find(s))) {
          if (D.find(x) != D.find(y)) {
            D.union(x, y);
            this.breakwall(this.EL[i]);
            this.EL[i][2] = 0;
          }
        }
      } else if (D.find(x) != D.find(y)) {
        D.union(x, y);
        this.breakwall(this.EL[i]);
        this.EL[i][2] = 0;
      } else {
        continue;
      }
    }
  };
  this.draw_canvas = function(id) {
    this.canvas = document.getElementById(id);
    //stored the size of each box / grid of our maze
    var scale = this.S;
    //temporary != temperature
    temp = []
    //check if the canvas supports 2D rendering (elements)
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
      //mark the starting point
      this.Board[1][0] = '$';
      //draw the board
      for (var i = 0; i < 2 * this.N + 1; i++) {
        for (var j = 0; j < 2 * this.M + 1; j++) {
          if (this.Board[i][j] != ' ') {
            this.ctx.fillStyle = "#0b052d" //red?
            this.ctx.fillRect(scale * i, scale * j, scale, scale);
          }
          else if (i < 5 && j < 5)
            temp.push([i, j]);
        }
      }
      //position our player on the board with a different colour
      x = randomChoice(temp)
      this.Board[x[0]][x[1]] = '&'
      this.ctx.fillStyle = "#c4192a"; //red
      this.ctx.fillRect(scale * x[0], scale * x[1], scale, scale);
    }
  };
  // we are going to find the coordinates of where are marker / player has been and where it currently is
  // change the colour of area where we have already been
  this.checkPos = function(id) {
    for (var i = 0; i < 2 * this.N + 1; i++) {
      for (var j = 0; j < 2 * this.M + 1; j++) {
        if (this.Board[i][j] == '&') {
          //console.log(i,j)
          return [i, j];
        }
      }
    }
  }
  // change the colour of our path
  this.moveclear = function(a, b) {
    var scale = this.S;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "#e27158"
    this.ctx.fillRect(scale * a, scale * b, scale, scale);
    this.Board[a][b] = ' ';
  }
  this.move = function(a, b) {
    var scale = this.S;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "#c4192a";
    this.ctx.fillRect(scale * a, scale * b, scale, scale);
    this.Board[a][b] = '&'
  }
  this.moveup = function(id) {
    //checking for current position
    cord = this.checkPos(id);
    //making the grid size is consistent with the above, movement is based on size, scale 
    var scale = this.S;
    //grabbing coordinates
    i = cord[0]
    j = cord[1]
    //representing the upward movement
    j -= 1
    //checking if we are out of bounds, if there is a wall or if it is outside. If this is true, no movement occurs
    if (j < 0)
      return
    else if (j > 2 * this.M)
      return
    //check if we can move, update the position of marker / player 
    // keep track of the number of movements made
    else if (this.Board[i][j] == ' ') {
      this.moveclear(i, j + 1);
      this.move(i, j)
      this.moves += 1;
    }
    else
      return
  }

  this.movedown = function(id) {
    cord = this.checkPos(id);
    var scale = this.S;
    i = cord[0]
    j = cord[1]
    j += 1
    if (j < 0)
      return
    else if (j > 2 * this.M)
      return
    else if (this.Board[i][j] == ' ') {
      this.moveclear(i, j - 1);
      this.move(i, j);
      this.moves += 1;
    }
    else
      return
  }

  this.moveleft = function(id) {
    cord = this.checkPos(id);
    var scale = this.S;
    i = cord[0]
    j = cord[1]
    i -= 1
    if (i < 0)
      return
    else if (i > 2 * this.N)
      return
    else if (this.Board[i][j] == ' ') {
      this.moveclear(i + 1, j);
      this.move(i, j);
      this.moves += 1;
    } else
      return
  }

  this.moveright = function(id) {
    cord = this.checkPos(id);
    var scale = this.S;
    i = cord[0]
    j = cord[1]
    i += 1
    if (i < 0)
      return
    else if (i > 2 * this.N)
      return
    else if (this.Board[i][j] == ' ') {
      this.moveclear(i - 1, j);
      this.move(i, j);
      this.moves += 1;
    } else
      return
  }
  this.checker = function(id) {
    //console.log("win")
    cord = this.checkPos(id);
    i = cord[0]
    j = cord[1]
    // console.log(cord)
    if ((i == 19 && j == 20) || (i == 1 && j == 0)) {
      modalfunwin();
      //alert("Congratulations, you have succesfuly escaped from the maze of doom.")
      return 1
    }
    return 0
  }
  this.getMoves = function() {
    return this.moves;
    
  }

};

m = new maze(10, 10);
m.init();
m.add_edges();
m.gen_maze();
m.draw_canvas("canvas");
function drawMoves() {
  document.getElementById("moves").innerHTML = "Moves :" + m.getMoves()
}
//drawMoves();
setInterval(drawMoves, 100);
//addEvents();
