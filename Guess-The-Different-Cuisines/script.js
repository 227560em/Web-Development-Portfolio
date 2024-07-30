// 1. create an array of words to be guessed
let cuisines = [
"italian", 
"chinese", 
"japanese", 
"greek", 
"french", 
"korean", 
"australian",
"indian"
]

// 2. Create the initial game settings
var answer = "";
// storage of the list of letters the player has guessed
var guessed = [];
var word_progress = null

// 3. creat a function to randomize the word to be guessed
function random_word() {
  // calling the list, making sure that the number of items in the list is an integer grabbing a random item from that list based on the list
  answer = cuisines[Math.floor(Math.random()*cuisines.length)]
}

// 4. create a function to generate the keyboard buttons
function keyboard() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => `<button class="btn btn-lg btn-info m-2" id='` + letter + `' onClick="guess('` + letter + `')">` + letter + `</button>`).join("");
  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

// 5. create a fuction to disable buttons and update fprogress has been chosen
function guess(letter_chose) {
  guessed.indexOf(letter_chose) === -1 ? guessed.push(letter_chose): null;
  document.getElementById(letter_chose).setAttribute("disabled", true);
  if (answer.indexOf(letter_chose) >= 0) {
    guessed_word();
    end()
  }
}

//6. create a function to end the game when the correct word is guessed
function end(){
  //  if ===,3 equal signs is CHECKING if two things are equal
  if (word_progress === answer) {
    document.getElementById("keyboard").innerHTML = "Congratulations, you guessed it correctly!!! Now Emma knows what cuisine she is having. Great Job!";
  }
}

// create a function to update progress of the words that has been guessed
function guessed_word(){
//   when we guess a letter split it apart form our letters and join back the others
  word_progress = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter: " _ ")).join("");
  document.getElementById("correct_word").innerHTML = word_progress
} 

// 8. create a function to restart the game
function restart(){
  mistakes = 0;
  guessed = [];
  random_word();
  keyboard();
  guessed_word();
}

// 9. put all the main functions at the end
random_word();
keyboard(); 
guessed_word();