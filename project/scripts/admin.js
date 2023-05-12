import { url } from "./requests.js";
import { getCompaniesreadById, getAllCategories } from "./requests.js";

const token = JSON.parse(localStorage.getItem("token"));

function logout() {
  const button = document.querySelector(".logout__button");

  button.addEventListener("click", () => {
    localStorage.clear();
    location.replace("./login.html");
  });
}

async function sectorSelect() {
  const urlBase = `${url}/companies/readAll`;
  const container = document.querySelector(".company__select");
  await fetch(urlBase, {
    method: "GET",
    "Content-Type": "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((index) => {
        const options = document.createElement("option");
        options.value = index.id;
        options.innerHTML = index.name;

        container.appendChild(options);
      });
    });
}

async function renderDepartments(category_name) {
  const urlBase = `${url}/departments/readAll`;
  const container = document.querySelector(".department__container");
  const select = document.querySelector(".company__select");
  await fetch(urlBase, {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach(async (index) => {
        if (select.value === "Selecionar Empresa") {
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

          const categories = await getAllCategories();
          const companies = await getCompaniesreadById(index.company_id);
          const sector = categories.find((element) => {
            const result = element.id === index.category_id;
            return result;
          });
          createSpan2.innerHTML = companies.name;
          createDiv2.className = "icons__container";
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
        }
      });
    });

  select.addEventListener("change", async () => {
    category_name = select.value;
    const getCompanies = await getCompaniesreadById(select.value);
    container.innerHTML = "";
    getCompanies.departments.forEach((index) => {
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
      createSpan2.innerHTML = getCompanies.name;
      createDiv2.className = "icons__container";
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

async function renderUsers() {
  const urlBase = `${url}/employees/readAll`;
  const container = document.querySelector(".users__container");

  await fetch(urlBase, {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach(async (index) => {
        const createLi = document.createElement("li");
        const createDiv = document.createElement("div");
        const createTitle = document.createElement("h3");
        const createSpan = document.createElement("span");
        const createDiv2 = document.createElement("div");
        const createIcon1 = document.createElement("img");
        const createIcon2 = document.createElement("img");

        createLi.className = "user__card";
        createDiv.className = "text__container";
        createTitle.className = "department__name";
        createTitle.innerHTML = index.name;
        createSpan.className = "department__company";
        createSpan.innerHTML = index.company_id;
        createDiv2.className = "icons__container";
        createIcon1.className = "user__view";
        createIcon1.src = "../assets/Vector_(1).png";
        createIcon2.className = "user__edit";
        createIcon2.src = "../assets/Vector_(2).png";

        container.appendChild(createLi);
        createLi.append(createDiv, createDiv2);
        createDiv.append(createTitle, createSpan);
        createDiv2.append(createIcon1, createIcon2);
      });
    });
}

logout();
sectorSelect();
renderDepartments();
renderUsers();
