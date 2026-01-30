"use server";
import getMyToken from "@/utilities/getMyToken";

export async function addToCart(productId: string) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        token: token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    let payload = await res.json();
    return payload;
  } else {
    throw new Error("not autherized");
  }
}
