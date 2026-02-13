const cells = document.querySelectorAll(".box");
const winState = document.getElementById("Win");
const reset = document.getElementById("reset");
let turnO = true;

const winAlgo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resetGame() {
  cells.forEach((cell) => {
    cell.innerText = " ";
    cell.disabled = false;
    cell.classList.remove("winner");
    winState.textContent = " ";
  });
}

function disableAll() {
  cells.forEach((cell) => (cell.disabled = true));
}
function checkWinner() {
  let winnerFound = false;

  for (let [a, b, c] of winAlgo) {
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      disableAll();
      //   alert(cells[a].innerText + " is the winner");
      winState.textContent = cells[a].innerText + " is the winner";
      winnerFound = true;

      break;
    }
  }
  if (!winnerFound) {
    const allDisabled = [...cells].every((cell) => cell.disabled);
    if (allDisabled) {
      winState.textContent = "it is a tie";
    }
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (turnO) {
      cell.innerText = "O";
      turnO = false;
    } else {
      cell.innerText = "X";
      turnO = true;
    }
    cell.disabled = true;

    checkWinner();
  });
});
reset.addEventListener("click", resetGame);
