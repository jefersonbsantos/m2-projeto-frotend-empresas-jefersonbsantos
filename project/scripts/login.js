import { url } from "./requests.js";

function goToHome() {
  const homeButton = document.querySelector(".home__button");
  homeButton.addEventListener("click", () => {
    location.replace("../../index.html");
  });
}

function goToRegister() {
  const registerButton = document.querySelector(".sign-in__button");
  registerButton.addEventListener("click", () => {
    location.replace("./register.html");
  });
}

async function login(body) {
  const tokenRequest = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (res) => {
    if (res.ok) {
      const token = await res.json();
      localStorage.setItem("token", JSON.stringify(token.authToken));
      return token;
    } else {
      const test = await res.json();

      alert(test.message);
    }
  });
  return tokenRequest;
}

async function handleLogin() {
  const inputs = document.querySelectorAll("input");
  const button = document.querySelector(".input__button-login");
  const body = {};
  let count = 0;

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      body[input.name] = input.value;
      if (input.value.trim() === "") {
        count++;
      }
    });
    if (count != 0) {
      count = 0;
      alert("Por favor, preencha os campos corretamente");
    } else {
      const token = await login(body);
      location.replace("./user.html");
    }
  });
}

handleLogin();
goToHome();
goToRegister();