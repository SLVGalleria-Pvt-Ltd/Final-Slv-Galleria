import AxiosClient from "../AxiosClient";

export default async function deleteProductsApi() {
    return AxiosClient.get(`/api/v1/product/delete-product/${id}`).then(
        (res) => res.data
    );
}
