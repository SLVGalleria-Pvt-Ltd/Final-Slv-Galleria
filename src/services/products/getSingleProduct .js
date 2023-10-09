import AxiosClient from "../AxiosClient";

export default async function getSingleProductApi({ slug }) {
  return AxiosClient.get(`/api/v1/product/get-product/${slug}`).then(
    (res) => res.data
  );
}
