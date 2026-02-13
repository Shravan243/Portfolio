const cards = document.querySelectorAll(".Card");
const Timer = document.getElementById("Timer");
const Reset = document.getElementById("Reset");

let cardColor = [
  "Red",
  "Red",
  "Green",
  "Green",
  "Blue",
  "Blue",
  "yellow",
  "yellow",
  "purple",
  "purple",
  "orange",
  "orange",
];

let time = -1;
let timerInterval = null;

let cardsLeft = 6;
let FirstColor = null;
let FirstCard = null;
let lockBoard = false;

// Timer
function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(() => {
    Timer.textContent = ++time;
  }, 1000);
}
//ShuffleColors
function shuffleColors() {
  for (let i = cardColor.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cardColor[i];
    cardColor[i] = cardColor[j];
    cardColor[j] = temp;
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].dataset.color = cardColor[i];
    cards[i].style.backgroundColor = cardColor[i];
  }
}

// GameReset

function resetGame() {
  FirstCard = null;
  FirstColor = null;
  lockBoard = false;
  cardsLeft = 6;

  cards.forEach((card) => {
    card.classList.remove("is-flipped", "disabled", "Glow");
  });

  clearInterval(timerInterval);
  timerInterval = null;
  time = -1;
  Timer.textContent = 0;
  shuffleColors();
  startTimer();
}

// Selecting Card
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("disabled")) return;

    card.classList.add("is-flipped"); //toggle/add here

    var CardColor = card.dataset.color;

    if (!FirstCard) {
      FirstCard = card;
      FirstColor = CardColor;
      return;
    }
    if (card === FirstCard) {
      return;
    }
    lockBoard = true;
    if (FirstColor !== CardColor) {
      console.log("wrong");
      // lockBoard = true;

      setTimeout(() => {
        FirstCard.classList.remove("is-flipped");
        card.classList.remove("is-flipped");

        FirstColor = null;
        FirstCard = null;
        lockBoard = false;
      }, 800);
    } else {
      console.log("correct");
      FirstCard.classList.add("disabled", "Glow");
      card.classList.add("disabled", "Glow");

      FirstColor = null;
      FirstCard = null;
      cardsLeft--;
      lockBoard = false;

      if (cardsLeft == 0) {
        clearInterval(timerInterval);
        setTimeout(() => {
          alert("Congratulations! You completed the game");
        }, 600);
      }
    }
  });
});

Reset.addEventListener("click", resetGame);

resetGame();
