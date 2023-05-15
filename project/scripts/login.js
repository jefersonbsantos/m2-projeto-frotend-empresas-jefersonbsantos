import { url, token, isAdm } from "./requests.js";

function authentication() {
  if (JSON.parse(localStorage.getItem("isAdm"))) {
    location.replace("./admin.html");
  } else if (token) {
    location.replace("./user.html");
  }
}

authentication();

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
      localStorage.setItem("isAdm", JSON.stringify(token.isAdm));

      const teste = localStorage.getItem("isAdm");

      if (JSON.parse(teste)) {
        location.replace("./admin.html");
      } else {
        location.replace("./user.html");
      }

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
      login(body);
    }
  });
}

handleLogin();
goToHome();
goToRegister();
