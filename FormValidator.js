const Name = document.getElementById("User");
const Key = document.getElementById("Password");
const Submit = document.getElementById("Validate");
const SignIN = document.getElementById("SignIn");
const ShowPass = document.getElementById("ShowPass");

let InputUsername = "";
let InputPassword = "";

ShowPass.addEventListener("click", function () {
  if (Key.type === "password") {
    Key.type = "text";
    ShowPass.textContent = "Hide Password";
  } else {
    Key.type = "password";
    ShowPass.textContent = "Show Password";
  }
});

function checkUser(Id, Cred) {
  let storedUser = localStorage.getItem("StoredUsername");
  let storedPass = localStorage.getItem("StoredPassword");

  if (Id === storedUser && Cred === storedPass) {
    alert("Login successful");
  } else {
    alert("Invalid username or password");
  }
}

function checkPassword(Cred) {
  const Strong = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
  if (Cred.length < 8) {
    alert("Enter a strong password");
  }
  if (!Strong.test(Cred)) {
    alert(
      "Password must contain a special character, number and uppercase letter",
    );
    return;
  }
  console.log("Successfully created a strong password");
}

Submit.addEventListener("click", () => {
  InputUsername = Name.value;
  InputPassword = Key.value;
  checkUser(InputUsername, InputPassword);
});

SignIN.addEventListener("click", () => {
  InputUsername = Name.value;
  InputPassword = Key.value;

  localStorage.setItem("StoredUsername", InputUsername);
  localStorage.setItem("StoredPassword", InputPassword);
  console.log("Data stored in localStorage");

  console.log(InputUsername + " is good");
  if (InputUsername.length < 6) {
    alert("Enter atleast 6 letter username");
  }
  localStorage.getItem("StoredUsername");
  localStorage.getItem("StoredPassword");
  checkPassword(InputPassword);
});
