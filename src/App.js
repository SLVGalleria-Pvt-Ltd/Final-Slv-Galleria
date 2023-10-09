import React, { useEffect } from "react";
import CircularProgressIndicator from "./common/Loadable/CircularProgressIndicator";
import Routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import getAllProductsApi from "./services/products/getAllProducts";
import { useQueryGetAllProducts } from "./reactQuery/Products";
import { addAllProducts } from "./redux/slice/ProductSlice";
import AxiosClient from "./services/AxiosClient";

const App = () => {
  const adminValue = useSelector((state) => state.admin.value);
  const adminId = adminValue?._id;
  const token = localStorage.getItem("auth");

  // useEffect(() => {
  //   if (!getAllProduct.isLoading) {
  //     dispatch(addAllProducts(getAllProduct?.data));
  //   }
  // }, [getAllProduct]);

  useEffect(() => {
    if (adminId && token) {
      AxiosClient.defaults.headers["Authorization"] = token;
    }
  }, [adminId, token]);

  return (
    <>
      <CircularProgressIndicator loading={false} />
      <Toaster />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
