import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Core layout (load immediately)
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Collection = lazy(() => import("./pages/Collection.jsx"));
const BulkOrder = lazy(() => import("./pages/BulkOrder.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Placeorder = lazy(() => import("./pages/Placeorder.jsx"));
const Verify = lazy(() => import("./pages/Verify.jsx"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));

// Optional UI (lazy)
const WhatsAppFloat = lazy(() => import("./components/WhatsAppFloat.jsx"));

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      
      {/* Toast notifications */}
      <ToastContainer />

      {/* Always-visible layout */}
      <Navbar />
      <SearchBar />

      {/* Page loader */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/bulkorders" element={<BulkOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>

        {/* Non-critical UI */}
        <WhatsAppFloat />
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
