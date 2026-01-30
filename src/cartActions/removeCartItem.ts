"use server";
import getMyToken from "@/utilities/getMyToken";

export async function removeCartItem(productId: string) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token!,
          "Content-Type": "application/json",
        },
      },
    );
    let payload = await res.json();
    return payload;
  } else {
    throw new Error("error while delete your cart item");
  }
}
