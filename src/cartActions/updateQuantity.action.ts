"use server";
import getMyToken from "@/utilities/getMyToken";

export async function UpdateQuantity(
  productId: string,
  productQuantity: number,
) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          token: token!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: productQuantity }),
      },
    );
    let payload = await res.json();
    return payload;
  } else {
    throw new Error("error while update your cart item quantity");
  }
}
