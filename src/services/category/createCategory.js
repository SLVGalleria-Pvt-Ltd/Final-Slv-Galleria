import AxiosClient from "../AxiosClient";

export default async function AddNewCategoryApi(name) {
  return AxiosClient.post(`/api/v1/category/create-category`, {
    name,
  }).then((res) => res.data);
}
