export async function getAllCategories() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  let { data } = await res.json();
  return data;
}
