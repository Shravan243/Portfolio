const buttons = document.querySelectorAll(".Buttons");
const Display = document.getElementById("Display");
const pcDisplay = document.getElementById("pcDisplay");
const ScoreBoard = document.getElementById("ScoreBoard");
const userScore = document.getElementById("UserScore");
const pcScore = document.getElementById("PcScore");
const ResetButton = document.getElementById("reset");
const HistoryDisplay = document.getElementById("History");

const choices = ["stone", "paper", "scissor"];

let WinningHistory = [];

var user = 0;
var pc = 0;

ResetButton.addEventListener("click", () => {
  user = 0;
  pc = 0;
  userScore.textContent = user;
  pcScore.textContent = pc;
  HistoryDisplay.textContent = "";
  userScore.style.color = "black";
  pcScore.style.color = "black";
});

function winner(button, pcChoice) {
  const userChoice = button.textContent.toLowerCase();
  if (
    (userChoice === "stone" && pcChoice === "paper") ||
    (userChoice === "paper" && pcChoice === "scissor") ||
    (userChoice === "scissor" && pcChoice === "stone")
  ) {
    pc++;
    pcScore.textContent = pc;
    return "PC";
  } else if (userChoice == pcChoice) {
    return "Tie";
  } else {
    user++;
    userScore.textContent = user;
    return "User";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const pcChoice = choices[Math.floor(Math.random() * 3)];
    // console.log(button.textContent);
    Display.textContent = button.textContent;
    pcDisplay.textContent = pcChoice;
    console.log(pcChoice);
    const result = winner(button, pcChoice);
    if (user > pc) {
      pcScore.style.color = "black";
      userScore.style.color = "red";
    } else if (pc > user) {
      userScore.style.color = "black";
      pcScore.style.color = "red";
    } else {
      userScore.style.color = "black";
      pcScore.style.color = "black";
    }
    WinningHistory.push({ user: button.textContent, pc: pcChoice, result });
    HistoryDisplay.textContent = WinningHistory.map(
      (entry) => `${entry.user} vs ${entry.pc} - ${entry.result}`,
    ).join("\n");
  });
});
