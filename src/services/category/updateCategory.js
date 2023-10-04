import AxiosClient from "../AxiosClient";

export default async function updateCategoryApi() {
    return AxiosClient.put(`/api/v1/category/update-category/${selected._id}`).then(
        (res) => res.data
    );
}