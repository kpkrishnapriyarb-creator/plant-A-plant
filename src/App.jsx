import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// User components
import Login from "./component/user/Login";
import Register from "./component/user/Register";
import Carousel from "./component/user/Carousel";
import Home from "./component/user/Home";
import Gallery from "./component/user/Gallery";
import Contact from "./component/user/Contact";
import Footer from "./component/Footer";
import Cart from "./component/user/Cart";
import Shop from "./component/user/Shop";
import UserNavBar from "./component/user/UserNavBar";

// Admin components
import AdminLogin from "./component/admin/AdminLogin";
import AdminRegister from "./component/admin/AdminRegister";
import AdminHome from "./component/admin/AdminHome";
import AddPlant from "./component/admin/AddPlant";
import ManagePlant from "./component/admin/ManagePlant";
import ViewOrder from "./component/admin/ViewOrder";
import AdminGallery from "./component/admin/AdminGallery";
import AdminNavbar from "./component/admin/AdminNavBar";
import AdminMessage from "./component/admin/AdminMessage";
import AboutUs from "./component/user/AboutUs";
import CareTips from "./component/user/CareTips";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin/login" ||
    location.pathname === "/admin/register";

  return (
    <>
      {!hideNavbar &&
        (location.pathname.startsWith("/admin") ? (
          <AdminNavbar />
        ) : (
          <UserNavBar />
        ))}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/caretips" element={<CareTips />} />


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/add" element={<AddPlant />} />
        <Route path="/admin/manage" element={<ManagePlant />} />
        <Route path="/admin/vieworder" element={<ViewOrder />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/message" element={<AdminMessage />} />
      </Routes>

      {!hideNavbar && !location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
