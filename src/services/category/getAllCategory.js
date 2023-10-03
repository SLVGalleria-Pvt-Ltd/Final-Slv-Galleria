import AxiosClient from "../AxiosClient";

export default async function getallcategoryApi() {
  return AxiosClient.get(`/api/v1/category/get-category`).then(
    (res) => res.data
  );
}
