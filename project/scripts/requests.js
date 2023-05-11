export const url = "http://localhost:3333";

export async function getAllCategories() {
  const categories = await fetch(`${url}/categories/readAll`, {
    method: "GET",
    "Content-Type": "application/json",
  })
    .then((response) => response.json())
    .then((data) => data);
  return categories;
}
