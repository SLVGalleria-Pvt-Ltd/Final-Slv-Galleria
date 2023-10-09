import AxiosClient from "../AxiosClient";

export default async function deleteProductsApi({ id }) {
  return AxiosClient.delete(`/api/v1/product/delete-product/${id}`).then(
    (res) => res.data
  );
}
