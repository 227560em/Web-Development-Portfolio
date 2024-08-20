// 1. Create a pop up window before everything loads to introduce the backstory.
window.addEventListener("DOMContentLoaded", start);
function start() {
  alert("As you see here in the background, Oscar Piastri (orange, Mclaren) is battling Max Verstappen (Red and Yellow, Red Bull) for first place. As the time ticks down, for some reason they tied!Nevertheless, at the end of every race there has to be a tie breaker. In this case it will be connect 4! Make sure you pick your preferred driver when you start the game.")
}

// 2. Make connect 4 a class and create game functions
class Connect4 {
  // 3. Set up the initial game
  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.player = "Oscar";
    this.selector = selector;
    this.isGameOver = false;
    this.onPlayerMove = function(){};
    this.createGrid();
    this.setupEventListeners();
  }
  // 4.Create the Connect 4 grid using loops
  createGrid() {
    const $board = $(this.selector);
    $board.empty();
    this.isGameOver = false;                  
    this.player = "Oscar";
    // for loop , three things to add inside the bracket                                    1. Creating a variable, adding the starting number (typical case would be a zero)           2. Conditions,where is the stopping point (usually will have < or <=)                       3. Adding until the stopping point
    for (let row = 0; row < this.rows; row++) {
      const $row = $("<div>")
        .addClass("row");
      for (let col = 0; col < this.cols; col++) {
        const $col = $("<div>")
          .addClass("col empty")
          .attr("data-col", col)
          .attr("data-row", row)
        // append = combine
        $row.append($col);
      }
      $board.append($row);
    }
  }
  // 5. Set up a bunch of event listeners that is important for the game to work
  setupEventListeners() {
    const $board = $(this.selector);
    const that = this;
    // 5.1 Locate the last empty grid in a column
    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      // The i here refers to index
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass("empty")) {
          return $cell;
        }
      }
      return null;
    }
    // 5.2 Allow the player to select the empty grid, to put the cell with correct colour, than let the other player take a turn
    $board.on("mouseenter", ".col.empty", function() {
      if (that.isGameOver) return;
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.addClass(`next-${that.player}`);
    });
    $board.on("mouseleave", ".col", function() {
      $(".col").removeClass(`next-${that.player}`);
    });
    $board.on("click", ".col.empty", function() {
      if (that.isGameOver) return;
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data("player", that.player);
   
    // 5.3 Check if there is a winner. If there is a winner, the pop up window will appear and say game over
      const winner = that.checkForWinner(
        $lastEmptyCell.data("row"),
        $lastEmptyCell.data("col")
      )
      if (winner) {
        that.isGameOver = true;
        alert(`Game Over! ${that.player} has won this round!  Congrats!!`);
        $(".col.empty").removeClass("empty");
        return;
      }
      // #5.4 Allow 2 players to take turns
      that.player = (that.player === "Oscar") ? "Max" : "Oscar";
      that.onPlayerMove();
      $(this).trigger("mouseenter");
    });
  }
//  6. Create a function to check if there is a winner
  checkForWinner(row, col){
    const that = this;
    function $getCell(i, j) {
      return $(`.col[data-row="${i}"][data-col="${j}"]`);
    }          
  // diagonal, vertical, horizontal- countiong by pairs, see if tjose pairs equal to 4 in total
    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $getCell(i, j);
    // While loop is used when we don't know how many times we have to repeat something.
      while (i >= 0 &&
        i < that.rows &&
        j >= 0 &&
        j < that.cols &&
        $next.data("player") === that.player
      ) {
        total++;
        i += direction.i;
        j += direction.j;
        $next = $getCell(i, j);
      }
      return total;
    }
    function checkWin(directionA, directionB) {
      const total = 1 +
        checkDirection(directionA) + checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
    }
    function checkDiagonalBLtoTR() {
      return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
    }
  
    function checkDiagonalTLtoBR() {
      return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
    }
    function checkVerticals() {
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
  
    }
    function checkHorizontals() {
      return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }
    // || stands for or
    return checkVerticals() || checkDiagonalBLtoTR() || checkDiagonalTLtoBR() || checkHorizontals();
  }
  restart(){
    this.createGrid();
    this.onPlayerMove();
  }
}
// Main Function
$(document).ready(function(){
  const connect4 = new Connect4("#connect4")
  connect4.onPlayerMove = function() {
    $("#player").text(connect4.player);
  }
  $("#restart").click(function() {
    connect4.restart();
  })
})