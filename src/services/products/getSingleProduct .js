import AxiosClient from "../AxiosClient";

export default async function getSingleProductApi() {
    return AxiosClient.get(`/api/v1/product/get-product/${params.slug}`).then(
        (res) => res.data
    );
}