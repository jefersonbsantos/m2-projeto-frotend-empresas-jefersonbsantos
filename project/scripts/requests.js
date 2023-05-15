export const url = "http://localhost:3333";
export const token = JSON.parse(localStorage.getItem("token"));
export const isAdm = JSON.parse(localStorage.getItem("isAdm"));

export async function getAllCategories() {
  const categories = await fetch(`${url}/categories/readAll`, {
    method: "GET",
    "Content-Type": "application/json",
  })
    .then((response) => response.json())
    .then((data) => data);
  return categories;
}

export async function getCompaniesreadById(company_id) {
  const companies = await fetch(`${url}/companies/readById/${company_id}`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return companies;
}

export async function getDepartmentsReadById(department_id) {
  const departments = await fetch(
    `${url}/departments/readById/${department_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  return departments;
}

export async function getEmployeesOutOfWork() {
  const employeesOutOfWork = await fetch(`${url}/employees/outOfWork`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);

  return employeesOutOfWork;
}
