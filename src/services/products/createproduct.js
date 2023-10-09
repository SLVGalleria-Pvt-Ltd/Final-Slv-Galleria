// createproductapi.js
import AxiosClient from "../AxiosClient";

export default async function createproductapi({
  name,
  description,
  price,
  quantity,
  photo,
  category,
}) {
  const productData = new FormData();
  productData.append("name", name);
  productData.append("description", description);
  productData.append("price", price);
  productData.append("quantity", quantity);
  productData.append("photo", photo);
  productData.append("category", category);
  console.log("tgerte4te", productData);

  return AxiosClient.post(`/api/v1/product/create-product`, productData).then(
    (res) => res.data
  );
}

// //create product function
// const handleCreate = async (e) => {
//   e.preventDefault();
//   try {
//     const productData = new FormData();
//     productData.append("name", name);
//     productData.append("description", description);
//     productData.append("price", price);
//     productData.append("quantity", quantity);
//     productData.append("photo", photo);
//     productData.append("category", category);
//     const { data } = axios.post(
//       "/api/v1/product/create-product",
//       productData
//     );
//     if (data?.success) {
//       toast.error(data?.message);
//     } else {
//       toast.success("Product Created Successfully");
//       navigate("/dashboard/admin/products");
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("something went wrong");
//   }
// };
