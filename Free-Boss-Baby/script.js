// Create a repeating pop-up message/reminder each time after every 20 seconds has passed
window.addEventListener("DOMContentLoaded", twentyseconds);
var reminder;
function twentyseconds(){
reminder = setInterval(function(){alert("Another 20 seconds have passed!");},20000);
}
function stopTwentySeconds(){
  clearInterval(reminder);
}

// 2.Generate a random integer number between 1 and 100 by using the OBJECT Math.                  +1 ia to make sure that the number is between 1 and 100 not 0 and 99.                              Math.FLoor is to make sure to turn the number into an integer.
let randomnumber = Math.floor(Math.random() * 100) + 1;
// console.log(randomnumber);
// 3. Record the number of guesses the user has made by creating a variable
var guessCount = 1;
// 4. Set up the initial game settings
const guesses = document.querySelector(".guesses");
const result = document.querySelector(".result");
const comparison = document.querySelector(".comparison");
const GuessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
var winningSound = new Audio("audios/Applause.wav");
var losingsound = new Audio("audios/Loser.wav");
// 5. Create a function to check if the user guessed number is correct.
function checkGuess(){
  // 5.1 Record the user's guesses
  let userGuess = Number(guessField.value);
  if (guessCount === 1){
    guesses.textContent = "Previous Guesses: ";
  }
  guesses.textContent += userGuess + " ";
  // 5.2 Check if guessed number is correct or not.
  if(userGuess === randomnumber){
    result.textContent ="Congratulations!! You have rescued Boss Baby from the pit of unowned babies! You are a CHAMPION.";
    result.style.backgroundColor = "green";
    comparison.textcontent = " ";
    winningSound.play();
    alert("The number tag is correct. You have aided Boss Baby greatly, now we will send a group of people to collect him.");
    setGameOver();
  } else{
    switch(guessCount){
      case 10:
        result.textContent ="Ugh! Boss Baby's talent will be wasted FOREVER.";
        comparison.textContent = "";
        losingsound.play();
        alert("You guessed incorrectly to many times, Boss Baby is running out of time with now way of aid. He will be normal FOREVER.");
        setGameOver();
        break;
      default:
        result.textContent ="Wrong number tag!";
        result.style.backgroundColor ="red";
        if(userGuess < randomnumber){
          comparison.textContent ="Your guess was too low!"
        }else if(userGuess > randomnumber){
          comparison.textContent ="Your guess was too high!";
        }
    }
  }
  // 5.3 Increase the number of guesses and make the guess field text box empty.
  guessCount++;
  guessField.value = "";
}
// 6. Let the user submit a guess by clicking on the button
GuessSubmit.addEventListener("click",checkGuess);
// 7. Create a function to disable the guess field text box, submit button and the 20 second reminder
function setGameOver(){
  guessField.disabled = true;
  GuessSubmit.disabled = true;
  stopTwentySeconds();
}