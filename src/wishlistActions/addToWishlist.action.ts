"use server";
import getMyToken from "@/utilities/getMyToken";
import { revalidatePath } from "next/cache";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token: token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    let payload = await res.json();
    revalidatePath("/wishlist");
    return payload;
  } else {
    throw new Error("Unauthorized to add to wishlist");
  }
}
