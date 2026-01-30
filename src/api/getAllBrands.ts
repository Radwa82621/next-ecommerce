export async function getAllBrands() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  let { data } = await res.json();
  return data;
}
