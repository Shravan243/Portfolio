const screen = document.getElementById("display");
const buttons = document.querySelectorAll("button");
console.log("js is loaded");

let expression = "";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (value === "=") {
      try {
        const result = eval(expression);
        screen.textContent = eval(expression);
        expression = result.toString(); // allow further operations
      } catch {
        screen.textContent = "Error";
        expression = "";
      }
    } else if (value === "C") {
      expression = "";
      screen.textContent = "";
    } else {
      expression += value;
      screen.textContent = expression;
    }
  });
});
