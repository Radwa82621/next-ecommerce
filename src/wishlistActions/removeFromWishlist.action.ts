"use server";
import getMyToken from "@/utilities/getMyToken";
import { revalidatePath } from "next/cache";

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken();
  if (token) {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token!,
          "Content-Type": "application/json",
        },
      },
    );
    let payload = await res.json();
    revalidatePath("/wishlist");
    return payload;
  } else {
    throw new Error("Unauthorized to remove from wishlist");
  }
}
