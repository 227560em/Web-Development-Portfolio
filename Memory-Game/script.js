// store all the cards with the class memory cards in a variable
const cards = document.querySelectorAll('.memory-card');
// set up the intial settings of our game
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    
    return;
  }
  
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // tell them how to know that the cards are a match
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // tell them what to do if the cars are the match
  // condition ? what to do if the condition is true: what to do if the condition is false
  isMatch ? disableCards() : unflipCards();
}
// stops the cards from being flippable
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  // remove the properties of the matched cards
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  // flip the unmatched cards back within a certain amount of time
  setTimeout(() => {
    // flip property refers to showing the flag face of the card
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));