"use server";
import getMyToken from "@/utilities/getMyToken";

export async function cashPayment(data: any, cartId: string) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token: token!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: data.shippingAddress,
        }),
      },
    );
    let payload = await res.json();
    return payload;
  } else {
    throw new Error("not autherized");
  }
}
