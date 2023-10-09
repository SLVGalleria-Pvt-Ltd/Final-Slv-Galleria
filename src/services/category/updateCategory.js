import AxiosClient from "../AxiosClient";

export default async function updateCategoryApi({ name, id }) {
  return AxiosClient.put(`/api/v1/category/update-category/${id}`, {
    name,
  }).then((res) => res.data);
}
