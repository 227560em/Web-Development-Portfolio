// run javascript code when the website is open
// when the website is done showing everything it needs to show, it will run some functions to change the website 
document.addEventListener('DOMContentLoaded', function(event) {


  var movietitles = ['Barbie', 'Trolls 3', 'Frozen 2', 'Boss Baby 2', 'Raya and the Last Dragon'];


  // create a function with parameters, parameters are things that can be changed in the function
  // text= current movie title that we will be typing out
  // i= index of each character in movie title
  // fnCallack= call the function to run again
  function typewriter(text, i, fnCallback) {
    // conditional to check the current character of the movie title that is being typed
    // we want to type the letters one by one until all has been typed
    // check if the program is done typing
    if (i < text.length) {
      // substring(index,index) getting the letters from a word (string)
      // add the next character to the word.
      document.getElementById("movies").innerHTML = text.substring(onabort, i + 1);
      // wait a while and call this function again for the next character.
      // setTimeout (function, milliseconds)
      setTimeout(function() {
        typewriter(text, i + 1, fnCallback)
      }, 200);
    }
    // if the movie title is done being typed, call the call back function
    // typeof: find out the data type wether it's a string (etc)
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 1200);

    }

  }
  // start a typewrite animation for the text in one of the movie titles
  // the parameter i stands for the index number i nthe movie tiles list which we call an array
  function starttextanimation(i) {
    if (typeof movietitles[i] == 'undefined') {  //checking to make that we haven't set the index array
      setTimeout(function() { //execute a fuction after a couple of milliseconds
        starttextanimation(0);//start a function with the first movie title in the array
      }, 20000);

    }
    //check if the movie title [i] exists
    if (i < movietitles.length) {
      typewriter(movietitles[i], 0, function() { //movietile exists, call the typewriter animation to start
        starttextanimation(i + 1); //after the callback and the whole text has been animated, start the next movie title 
      });
    }
    if (i == 0) {//barbie
      document.getElementById('gifs').src = 'https://i.pinimg.com/originals/f9/a0/30/f9a03035623fa0bead95abcde066271a.gif';
    } else if (i == 1) { //Trolls 3
      document.getElementById('gifs').src = 'https://media3.giphy.com/media/wRlGksuy0ittYKFxpX/giphy.gif?cid=6c09b952a13alae99a93n3fx7mzz5pedou9lih9nfb8dib6m&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g ';
    } else if (i == 2) { //Frozen 2
      document.getElementById('gifs').src = 'https://j.gifs.com/81Kxr3.gif';
    } else if (i == 3) { //Boss Baby 2
      document.getElementById('gifs').src = 'https://media2.giphy.com/media/DTlHptI8sA8sc4NyQM/200.gif?cid=6c09b952ldj0ljzjaa3sta5yxwb0d70ds7o0um0dxjltfi1i&ep=v1_internal_gif_by_id&rid=200.gif&ct=g';
    } else if (i == 4) { //Raya and the Last Dragon
      document.getElementById('gifs').src = 'https://media.tenor.com/M5UTWbygKiIAAAAM/raya-and-the-last-dragon-sisu.gif';
    }
  }
  starttextanimation(0); //start the animation with the first movie title in the array
});