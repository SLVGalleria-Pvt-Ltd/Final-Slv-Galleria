import { Route, Routes as Switch, useLocation } from "react-router-dom";
import Services from "../pages/SLVMore/Services";
import About from "../pages/SLVMore/About";
import Contact from "../pages/SLVMore/Contact";
import Cart from "../pages/User/Cart";
import Home from "../pages/Main/Home";
import Shop from "../pages/ShowProducts/Shop";
import Login from "../pages/Main/Login";
import SignUp from "../pages/Main/SignUp";
import Profile from "../pages/User/Profile";
import Orders from "../pages/User/Orders";
import SingleProduct from "../pages/ShowProducts/SingleProduct";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProduct from "../pages/admin/AdminProduct";
import NavBar3 from "../components/NavBar/NavBar3";
import HomeNavBar from "./NavBar/HomeNavBar";
import UserNavBar from "./NavBar/UserNavBar";
import AdminCategory from "../pages/admin/AdminCategory";

const Routes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin/dashboard");

  return (
    <>
      <HomeNavBar />
      <UserNavBar />
      {isAdminPage ? <NavBar3 /> : <></>}
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shop/:slug" element={<SingleProduct />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/product" element={<AdminProduct />} />
        <Route path="/admin/dashboard/category" element={<AdminCategory />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Switch>
    </>
  );
};

export default Routes;
