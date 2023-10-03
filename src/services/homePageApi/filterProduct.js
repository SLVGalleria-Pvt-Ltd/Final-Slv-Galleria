import AxiosClient from "../AxiosClient";

export default async function filterProductApi() {
    return AxiosClient.get(`/api/v1/product/product-filter`,
        {
            checked,
            radio,
        }).then(
            (res) => res.data
        );
}