import AxiosClient from "../AxiosClient";

export default async function getAllProductsApi() {
    return AxiosClient.get(`/api/v1/product/product-list/${page}`).then(
        (res) => res.data
    );
}
