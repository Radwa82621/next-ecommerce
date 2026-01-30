"use server";
import getMyToken from "@/utilities/getMyToken";

export async function getRelatedProducts(categoryId: string) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?limit=60&category[in]=${categoryId}`,
      {
        method: "GET",
        headers: {
          token: token!,
          "Content-Type": "application/json",
        },
      },
    );
    let payload = await res.json();
    return payload;
  } else {
    throw new Error("error white get your related products");
  }
}
