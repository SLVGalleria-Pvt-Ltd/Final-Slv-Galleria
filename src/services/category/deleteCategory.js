import AxiosClient from "../AxiosClient";

export default async function deleteCategoryApi({ id }) {
  return AxiosClient.delete(`/api/v1/category/delete-category/${id}`).then(
    (res) => res.data
  );
}
