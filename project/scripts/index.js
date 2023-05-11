import { getAllCategories } from "./requests.js";

function toLoginPage() {
  const button = document.querySelector(".index-login__button");

  button.addEventListener("click", () => {
    location.replace("./project/pages/login.html");
  });
}

function toRegisterPage() {
  const button = document.querySelector(".sign-in__button");

  button.addEventListener("click", () => {
    location.replace("./project/pages/register.html");
  });
}

async function getSectorsSelect() {
  const url = "http://localhost:3333/categories/readAll";
  const container = document.querySelector(".select");
  const sectors = await fetch(url, {
    method: "GET",
    "Content-Type": "application/json",
  }).then((res) =>
    res.json().then((data) => {
      data.forEach((index) => {
        const options = document.createElement("option");
        options.value = index.name;
        options.innerHTML = index.name;
        container.appendChild(options);
      });
    })
  );
}

async function getCompanies(category_name) {
  const url = "http://localhost:3333/companies/readAll";
  const container = document.querySelector(".sector__container");
  const select = document.querySelector(".select");

  if (select.value === "selecionar setor") {
    const companies = await fetch(url, {
      method: "GET",
      "Content-Type": "application/json",
    }).then((res) =>
      res.json().then((data) => {
        data.forEach(async (index) => {
          const createLi = document.createElement("li");
          const createDiv = document.createElement("div");
          const createH3 = document.createElement("h3");
          const createSpan = document.createElement("span");

          createLi.className = "card__container";
          createDiv.className = "card__content";
          createH3.className = "card__title";
          createH3.innerHTML = index.name;
          const categories = await getAllCategories();
          const sector = categories.find((element) => {
            const result = element.id === index.category_id;
            return result;
          });
          createSpan.className = "card__span";
          createSpan.innerHTML = sector.name;

          container.appendChild(createLi);
          createLi.appendChild(createDiv);
          createDiv.append(createH3, createSpan);
        });
      })
    );
  }

  select.addEventListener("change", async () => {
    category_name = select.value;
    const urlFilter = `http://localhost:3333/companies/readByCategory/${category_name}`;
    await fetch(urlFilter)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const selectUl = document.querySelector(".sector__container");
        selectUl.innerHTML = "";
        data.forEach((index) => {
          const createLi = document.createElement("li");
          const createDiv = document.createElement("div");
          const createH3 = document.createElement("h3");
          const createSpan = document.createElement("span");

          createLi.className = "card__container";
          createDiv.className = "card__content";
          createH3.className = "card__title";
          createH3.innerHTML = index.name;
          createSpan.className = "card__span";
          createSpan.innerHTML = select.value;

          container.appendChild(createLi);
          createLi.appendChild(createDiv);
          createDiv.append(createH3, createSpan);

          getCompanies();
        });
      });
  });
}

getCompanies();
getSectorsSelect();
toLoginPage();
toRegisterPage();
