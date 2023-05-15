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

function goToLogin() {
  const loginButton = document.querySelector(".login__button");
  loginButton.addEventListener("click", () => {
    location.replace("./login.html");
  });
}

function registerNewUser() {
  const urlBase = `${url}/employees/create`;
  const button = document.querySelector(".input__button-sign");
  const getName = document.querySelector(".input__name");
  const getEmail = document.querySelector(".input__email");
  const getPassword = document.querySelector(".input__password");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const info = {
      name: getName.value,
      email: getEmail.value,
      password: getPassword.value,
    };

    await fetch(urlBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    location.replace("./login.html");
  });
}

goToLogin();
goToHome();
registerNewUser();
