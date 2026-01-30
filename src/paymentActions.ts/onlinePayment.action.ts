"use server";
import getMyToken from "@/utilities/getMyToken";
import { headers } from "next/headers";

export async function onlinePayment(data: any, cartId: string) {
  const token = await getMyToken();
  const headersList = await headers();
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = headersList.get("host") || "localhost:3000";
  const baseUrl = `${protocol}://${host}`;

  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
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
