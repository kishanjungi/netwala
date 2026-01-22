import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import BulkOrder from './pages/BulkOrder.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Prouduct from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import Placeorder from './pages/Placeorder.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';




function App() {


  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <LoadingSpinner/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/collection" element={<Collection/>}></Route>
        <Route path='/bulkorders' element={<BulkOrder/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        {/* <Route path="contact" element={<Contact/>}></Route> */}
        <Route path="/product/:productId" element={<Prouduct/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path="/placeorder" element={<Placeorder/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path="/verify-email/:token" element={<VerifyEmail/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes> 
      <WhatsAppFloat/>
      <Footer/>
    </div>
  )
} 

export default App
