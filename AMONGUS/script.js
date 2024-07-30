document.getElementById('musicbutton').addEventListener('click', () =>{
  //  in our function we want to store our sound as a variable
var audio = new Audio("sound.mp3");
  // we call it to play the sound
  audio.play();
});