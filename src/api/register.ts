import axios from "axios";

export async function register(formBody: any) {
  let data = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    formBody,
  );
  return data;
}
