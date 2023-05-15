import { getEmployeesOutOfWork, url, isAdm } from "./requests.js";
import {
  getCompaniesreadById,
  getAllCategories,
  getDepartmentsReadById,
} from "./requests.js";

const token = JSON.parse(localStorage.getItem("token"));

function authentication() {
  if (!isAdm && token) {
    location.replace("./user.html");
  } else if (!token) {
    location.replace("./login.html");
  }
}

authentication();

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
          createIcon1.dataset.id = index.id;
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

          openViewDepartment(createIcon1);
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
        createIcon1.dataset.id = index.id;
        createIcon1.src = "../assets/Vector_(1).png";
        createIcon2.className = "user__edit";
        createIcon2.dataset.id = index.id;
        createIcon2.src = "../assets/Vector_(2).png";

        container.appendChild(createLi);
        createLi.append(createDiv, createDiv2);
        createDiv.append(createTitle, createSpan);
        createDiv2.append(createIcon1, createIcon2);

        openEditUser(createIcon1);
        openDeleteUser(createIcon2);
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
  const closeButton = document.querySelector(".edit__department-close");
  button.addEventListener("click", (e) => {
    modal.showModal();
    editDepartment(e.target.dataset.id);
  });
  closeButton.addEventListener("click", (e) => {
    modal.close();
  });
}

async function editDepartment(department_id) {
  const urlBase = `${url}/departments/update/${department_id}`;
  const editText = document.querySelector(".edit__department-text");
  const editButton = document.querySelector(".edit__department-button");
  const container = document.querySelector(".department__container");
  const modal = document.querySelector(".edit__department-modal");

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
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        container.innerHTML = "";
        renderDepartments();
        modal.close();
      });
  });
}

function openDeleteDepartment(button) {
  const modal = document.querySelector(".delete__department-modal");
  const closeButton = document.querySelector(".delete__department-close");
  button.addEventListener("click", (e) => {
    modal.showModal();
    deleteDepartment(e.target.dataset.id);
  });
  closeButton.addEventListener("click", (e) => {
    modal.close();
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

function openViewDepartment(button) {
  const modal = document.querySelector(".admin__view-modal");
  const closeButton = document.querySelector(".admin__view-close");
  const select = document.querySelector(".admin__view-select");
  button.addEventListener("click", (e) => {
    modal.showModal();
    viewDepartment(e.target.dataset.id);
  });
  closeButton.addEventListener("click", (e) => {
    modal.close();
  });
}

async function viewDepartment(department_id) {
  const departmentInfo = await getDepartmentsReadById(department_id);
  const employeesOutOfWork = await getEmployeesOutOfWork();
  const title = document.querySelector(".admin__view-title");
  const description = document.querySelector(".admin__view-title2");
  const select = document.querySelector(".admin__view-select");
  const hireButton = document.querySelector(".admin__view-hire-button");

  title.innerHTML = departmentInfo.name;
  description.innerHTML = departmentInfo.description;

  const info = {
    department_id: departmentInfo.id,
  };
  employeesOutOfWork.forEach(async (index) => {
    const options = document.createElement("option");
    options.innerHTML = index.name;
    options.value = index.id;

    select.appendChild(options);
  });

  hireButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const test = select.value;
    const urlBase = `${url}/employees/hireEmployee/${test}`;
    await fetch(urlBase, {
      method: "PATCH",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
}

function openEditUser(button) {
  const modal = document.querySelector(".edit__user-modal");
  const closeButton = document.querySelector(".edit__user-close");
  button.addEventListener("click", (e) => {
    modal.showModal();
    editUser(e.target.dataset.id);
  });
  closeButton.addEventListener("click", (e) => {
    modal.close();
  });
}

async function editUser(employee_id) {
  const urlBase = `${url}/employees/updateEmployee/${employee_id}`;
  const nameInput = document.querySelector(".edit__user-name");
  const emailInput = document.querySelector(".edit__user-email");
  const button = document.querySelector(".edit__user-button");
  const container = document.querySelector(".users__container");
  const modal = document.querySelector(".edit__user-modal");

  button.addEventListener("click", async () => {
    const info = {
      name: nameInput.value,
      email: emailInput.name,
    };
    await fetch(urlBase, {
      method: "PATCH",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        container.innerHTML = "";
        renderUsers();
        modal.close();
      });
  });
}

function openDeleteUser(button) {
  const modal = document.querySelector(".delete__user-modal");
  const closeButton = document.querySelector(".delete__user-close");
  button.addEventListener("click", (e) => {
    modal.showModal();
    deleteUser(e.target.dataset.id);
  });
  closeButton.addEventListener("click", () => {
    modal.close();
  });
}

async function deleteUser(employee_id) {
  const urlBase = `${url}/employees/deleteEmployee/${employee_id}`;
  const deleteButton = document.querySelector(".delete__user-button");
  const container = document.querySelector(".users__container");
  const modal = document.querySelector(".delete__user-modal");

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
        renderUsers();
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
