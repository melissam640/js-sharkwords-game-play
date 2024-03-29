const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const letterDivs = document.querySelectorAll(`div.${letter}`);
  for (const div of letterDivs) {
    div.innerHTML = letter;
  }  
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  
  const sharkImage = document.querySelector('img');
  sharkImage.setAttribute('src', `/static/images/guess${numWrong}.png`)

  if (numWrong === 5) {
    for (const button of document.querySelectorAll('button')) {
      disableLetterButton(button);
    }
    const losingMessage = document.querySelector('#play-again');
    losingMessage.setAttribute('style', 'display: block;');
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';
  const wordLength = word.length
  
  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', (evt) => {
      const currentButton = evt.target
      const letter = currentButton.innerHTML;
      disableLetterButton(currentButton);
      if (isLetterInWord(letter) == true) {
        handleCorrectGuess(letter, wordLength);
      } else {
        handleWrongGuess(letter);
      }
    });
  
  }
  // add an event handler to handle clicking on the Play Again button
  for (const message of document.querySelectorAll('a')) {
    message.addEventListener('click', () => {
    resetGame();
    });
  }
  
})();
