import { url } from "./requests.js";
const token = JSON.parse(localStorage.getItem("token"));
function logout() {
  const button = document.querySelector(".logout__button");

  button.addEventListener("click", () => {
    localStorage.clear();
    location.replace("./login.html");
  });
}

async function sectorSelect() {
  const urlBase = `${url}/categories/readAll`;
  const container = document.querySelector(".company__select");
  await fetch(urlBase, {
    method: "GET",
    "Content-Type": "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((index) => {
        const options = document.createElement("option");
        options.value = index.name;
        options.innerHTML = index.name;

        container.appendChild(options);
      });
    });
}

async function renderDepartments() {
  const urlBase = `${url}/departments/readAll`;
  const container = document.querySelector(".department__container");
  await fetch(urlBase, {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((index) => {
        const createLi = document.createElement("li");
        const createDiv = document.createElement("div");
        const createH3 = document.createElement("h3");
        const createSpan1 = document.createElement("span");
        const createSpan2 = document.createElement("span");
        const createDiv2 = document.createElement("div");
        const createIcon1 = document.createElement("img");
        const createIcon2 = document.createElement("img");
        const createIcon3 = document.createElement("img");

        container.className = "department__container";
        createLi.className = "department";
        createDiv.className = "text__container";
        createH3.className = "department__name";
        createH3.innerHTML = index.name;
        createSpan1.className = "department__description";
        createSpan1.innerHTML = index.description;
        createSpan2.className = "department__company";
        createDiv2.className = "icons__container";
        //fazer um find para buscar o company_name em outra endpoint.
        createIcon1.className = "view";
        createIcon1.src = "../assets/Vector.png";
        createIcon2.className = "edit";
        createIcon2.src = "../assets/Vector_(1).png";
        createIcon3.className = "delete";
        createIcon3.src = "../assets/Vector_(2).png";

        container.appendChild(createLi);
        createLi.append(createDiv, createDiv2);
        createDiv.append(createH3, createSpan1, createSpan2);
        createDiv2.append(createIcon1, createIcon2, createIcon3);
      });
    });
}

logout();
sectorSelect();
renderDepartments();
