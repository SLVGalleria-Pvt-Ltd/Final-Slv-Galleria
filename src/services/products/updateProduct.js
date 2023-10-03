// createproductapi.js
import AxiosClient from "../AxiosClient";

export default async function updateProductApi(
    name,
    description,
    price,
    quantity,
    photo,
    categories,
    id
) {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("categories", categories);

    return AxiosClient.put(`/api/v1/product/update-product/${id}`,
        productData
    ).then(
        (res) => res.data
    );
}