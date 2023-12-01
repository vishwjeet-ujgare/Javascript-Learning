const msgEl = document.getElementById("msg-el");
const cardsEL = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const startBtn = document.getElementById("start-btn");
const newCardBtn = document.getElementById("new-card-btn");
const resetGameBtn = document.getElementById("reset-game-btn");
const coinEL=document.getElementById("coin-el");

const player={
  name:"vishwjeet",
  coins:"200"
}

coinEL.textContent=` ${player.name}: $ ${player.coins}`

let firstNumber = 0;
let secondNumber = 0;
let cards = [];
let sum = 0;
let isAlive = false;
let hasBlackJack = false;

startBtn.addEventListener("click", function () {
  if (!isAlive || hasBlackJack) {
    resetGame();
    startGame();
  } else {
    restartGame();
  }
});

newCardBtn.addEventListener("click", function () {
  if (isAlive && !hasBlackJack) {
    let newcard = generateRondomeCard();
    sum += newcard;
    cardsEL.innerHTML += `, ${newcard}`;
    sumEl.innerHTML = "Sum: " + sum;
    renderGame();
  }
});

resetGameBtn.addEventListener("click", function () {
  let userResetConfirmation = window.confirm("Do you want to reset game ?");
  if (userResetConfirmation) {
    resetGame();
  }
});


function resetGame() {
  isAlive = false;
  hasBlackJack = false;
  firstNumber = 0;
  secondNumber = 0;
  sum = 0;
  cardsEL.textContent = "Cards :";
  msgEl.textContent="Want to Play Round"
  sumEl.textContent = "Sum :";
}

function startGame() {
  isAlive = true;
  firstNumber = generateRondomeCard();
  secondNumber = generateRondomeCard();
  sum = firstNumber + secondNumber;
  cardsEL.innerHTML += `${firstNumber}, ${secondNumber}`;
  sumEl.textContent = `Sum : ${sum}`;

  renderGame();
}

function restartGame() {
  let userConfirmation = window.confirm("Do you want to restart game?");
  if (userConfirmation) {
    cardsEL.innerHTML = "Cards :";
    sumEl.textContent = "Sum :";
    startGame();
  }
}

function generateRondomeCard() {
  return Math.floor(Math.random() * 11 + 1);
}

function renderGame() {
  if (isAlive && !hasBlackJack) {
    if (sum < 21) {
      msgEl.textContent = "Do you want to draw a new card ?";
      isAlive = true;
    } else if (sum === 21) {
      msgEl.textContent = "You have got a BlackJack..!";

      hasBlackJack = true;
    } else {
      msgEl.textContent = "You are out of Game.";
      isAlive = false;
      return;
    }
  }
}
