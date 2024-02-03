'use strict'
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice')
const btnNew = document.getElementById('new_game');
const rollDice = document.getElementById('roll_dice');
const btnHold = document.getElementById('hold');

// Starting condition
let activePlayer, currentScore, scores, playing;

const init = function(){
    scores = [0, 0];
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    
    current0El.textContent = 0;
    current1El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.add('player_active');
    player1El.classList.remove('player_active');
    
    player0El.classList.remove('player_winner');
    player1El.classList.remove('player_winner');
}
init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player_active');
    player1El.classList.toggle('player_active');
    
}

//Rolling dice functionality
rollDice.addEventListener('click', function () {
    if (playing) {
        //1.Generating Random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dices/dice-${dice}.png`;

        //3.Check if the rolled dice equals 1 
        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //if 1 switch player
            switchPlayer();
        }
    }
})


btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player_winner')
            playing = false;
        } else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);