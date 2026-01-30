"use server";
import getMyToken from "@/utilities/getMyToken";

export async function getWishlist() {
  const token = await getMyToken();
  if (token) {
    let res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token: token!,
        "Content-Type": "application/json",
      },
    });
    let payload = await res.json();
    return payload;
  } else {
    // Return empty if no token (user not logged in)
    return { data: [] };
  }
}
