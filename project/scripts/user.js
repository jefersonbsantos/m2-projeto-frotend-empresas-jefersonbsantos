import { url } from "./requests.js";
const token = JSON.parse(localStorage.getItem("token"));
function logout() {
  const button = document.querySelector(".logout__button");
  1;
  button.addEventListener("click", () => {
    localStorage.clear();
    location.replace("./login.html");
  });
}

async function user() {
  const employed = document.querySelector(".company__container");
  const companyHeader = document.querySelector(".company__header");
  const content = document.querySelector(".employee__list");

  const info = document.querySelector(".info__container");
  const username = document.querySelector(".user__title");
  const email = document.querySelector(".user__email");

  await fetch(`${url}/employees/profile`, {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);
      username.innerHTML = data.name;
      email.innerHTML = data.email;

      if (data.company_id === null) {
        employed.classList.add("company__container--empty");
        const unemployed = document.querySelector(".company__container--empty");
        const title = document.querySelector(".empty__title");
        title.innerText = "Usuário ainda não empregado";

        unemployed.style.display = "flex";
        companyHeader.style.display = "none";
        content.style.display = "none";
      } else {
        await getCompanyDepartment(data.department_id);
      }
    });
}

async function getCompanyDepartment(department_id) {
  const employed = document.querySelector(".company__container");

  const urlBase = `${url}/departments/readById/${department_id}`;
  await fetch(urlBase, {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const createDiv = document.createElement("div");
      const createTitle = document.createElement("h1");

      createDiv.className = "company__header";
      createTitle.className = "company__title";
      createTitle.innerHTML = `${data.company.name} - ${data.name}`;

      employed.appendChild(createDiv);
      createDiv.appendChild(createTitle);

      data.employees.forEach(async (index) => {
        department_id = data.id;
        const createUl = document.createElement("ul");
        const createLi = document.createElement("li");
        const createP = document.createElement("p");

        createUl.className = "employee__name";
        createLi.className = "employee";
        createP.className = "employee__name";
        createP.innerHTML = index.name;

        employed.appendChild(createUl);
        createUl.appendChild(createLi);
        createLi.appendChild(createP);
      });
    });
}

user();
logout();
