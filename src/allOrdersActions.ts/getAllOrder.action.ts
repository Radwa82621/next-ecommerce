"use server";
import getMyToken from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";

export async function getAllOrders() {
  const token = await getMyToken();
  console.log(token);

  if (token) {
    const decoded = jwtDecode<{ id: string }>(token as string);
    const userId = decoded.id;

    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
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
    throw new Error("not autherized");
  }
}
