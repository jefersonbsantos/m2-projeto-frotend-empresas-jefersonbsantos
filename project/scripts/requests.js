export const url = "http://localhost:3333";
const token = JSON.parse(localStorage.getItem("token"));

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
