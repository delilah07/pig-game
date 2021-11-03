'use strict';

// select elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const player0El = document.querySelector('#player--0');
const player1El = document.querySelector('#player--1');
const diceImg = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let currentScore = 0;
let activePlayer = 0;

const scores = [0, 0];

let playing = true;

// start conditions
score0El.textContent = '0';
score1El.textContent = '0';
diceImg.classList.add('hidden');

//rolling dice functionality

rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.display dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    // 3.check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check  if player's score >=50
    if (scores[activePlayer] >= 50) {
      // finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', function () {
  location.reload();
});

function switchPlayer() {
  //   nulled score
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelectorAll('.player')
    .forEach(player => player.classList.toggle('player--active'));

  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
}
