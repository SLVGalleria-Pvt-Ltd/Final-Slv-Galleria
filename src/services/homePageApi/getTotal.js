import AxiosClient from "../AxiosClient";

export default async function getTotalApi() {
    return AxiosClient.get(`/api/v1/product/product-count`).then(
        (res) => res.data
    );
}