import { url } from "./requests.js";
import {
  getCompaniesreadById,
  getAllCategories,
  getDepartmentsReadById,
} from "./requests.js";

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
  const companies = await fetch(urlBase, {
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
          createIcon2.dataset.id = index.id;
          createIcon3.className = "delete";
          createIcon3.src = "../assets/Vector_(2).png";
          createIcon3.dataset.id = index.id;

          container.appendChild(createLi);
          createLi.append(createDiv, createDiv2);
          createDiv.append(createH3, createSpan1, createSpan2);
          createDiv2.append(createIcon1, createIcon2, createIcon3);

          openEditDepartment(createIcon2);
          openDeleteDepartment(createIcon3);
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
        if (index.company_id != null) {
          const company = await getCompaniesreadById(index.company_id);
          createSpan.innerHTML = company.name;
        } else {
          createSpan.innerHTML = "Usuário ainda não empregado";
        }
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

function openCreateDepartment() {
  const button = document.querySelector(".department__button");
  const modal = document.querySelector(".modal__create-department");

  button.addEventListener("click", () => {
    modal.showModal();
  });
}

function closeCreateDepartment() {
  const closeButton = document.querySelector(".create__department--close");
  const modal = document.querySelector(".modal__create-department");
  closeButton.addEventListener("click", () => {
    modal.close();
  });
}

async function createDepartment() {
  const urlBase = `${url}/departments/create`;
  const input1 = document.querySelector(".create__department-name");
  const input2 = document.querySelector(".create__department-description");
  const select = document.querySelector(".create__department-select");
  const button = document.querySelector(".create-department__button");

  const urlCompanies = `${url}/companies/readAll`;
  const companies = await fetch(urlCompanies, {
    method: "GET",
    "Content-Type": "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((index) => {
        const options = document.createElement("option");
        options.value = index.id;
        options.innerHTML = index.name;

        select.appendChild(options);
      });
    });

  button.addEventListener("click", async (event) => {
    const info = {
      name: input1.value,
      description: input2.value,
      company_id: select.value,
    };
    await fetch(urlBase, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  });
}

function openEditDepartment(button) {
  const modal = document.querySelector(".edit__department-modal");
  button.addEventListener("click", (e) => {
    modal.showModal();
    editDepartment(e.target.dataset.id);
  });
}

async function editDepartment(department_id) {
  const urlBase = `${url}/departments/update/${department_id}`;
  const editText = document.querySelector(".edit__department-text");
  const editButton = document.querySelector(".edit__department-button");
  const container = document.querySelector(".department__container");

  const departments = await getDepartmentsReadById(department_id);
  editButton.addEventListener("click", async () => {
    const info = {
      description: editText.value,
      name: departments.name,
    };
    await fetch(urlBase, {
      method: "PATCH",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        body: JSON.stringify(info),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        container.innerHTML = "";
        console.log(data);
        console.log(department_id);
        console.log(info);
        console.log(departments.name);
        console.log(editText.value);
        renderDepartments();
        return data;
      });
  });
}

function openDeleteDepartment(button) {
  const modal = document.querySelector(".delete__department-modal");
  button.addEventListener("click", (e) => {
    modal.showModal();
    deleteDepartment(e.target.dataset.id);
  });
}

async function deleteDepartment(department_id) {
  const urlBase = `${url}/departments/delete/${department_id}`;
  const deleteButton = document.querySelector(".delete__department-button");
  const container = document.querySelector(".department__container");
  const modal = document.querySelector(".delete__department-modal");

  deleteButton.addEventListener("click", async () => {
    await fetch(urlBase, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        container.innerHTML = "";
        renderDepartments();
        modal.close();
      });
  });
}

logout();
sectorSelect();
renderDepartments();
renderUsers();
openCreateDepartment();
closeCreateDepartment();
createDepartment();
