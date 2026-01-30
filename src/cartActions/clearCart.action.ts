"use server";
import getMyToken from "@/utilities/getMyToken";

export async function clearCart() {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token!,
        "Content-Type": "application/json",
      },
    });
    let payload = await res.json();
    return payload;
  } else {
    throw new Error("error while clear your cart ");
  }
}
