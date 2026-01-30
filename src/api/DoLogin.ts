import axios from "axios";

export async function DoLogin(formBody: any) {
  let data = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    formBody,
  );
  return data;
}
