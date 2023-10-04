import AxiosClient from "../AxiosClient";

export default async function deleteCategoryApi() {
    return AxiosClient.delete(`/api/v1/category/delete-category/${pId}`).then(
        (res) => res.data
    );
}