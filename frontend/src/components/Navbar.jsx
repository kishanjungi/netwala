import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Profilecard from './Profilecard';

const navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useContext(ShopContext);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setCartItems({});
    navigate('/login');

  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">

      <Link to='/'>  <img src={assets.logo} className="w-36 " alt="" /></Link>

      <ul className="hidden sm:flex gap-5 text-sm text-grey-700">
        <NavLink to='/' className="flex flex-col items-center gap-1 ">
          <p>HOME</p>
          <hr className='w-2/4 border h-[1.5px] bg-grey-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1 ">
          <p>PRODUCTS</p>
          <hr className='w-2/4 border h-[1.5px] bg-grey-700 hidden' />
        </NavLink>
        <NavLink to='/bulkorders' className="flex flex-col items-center gap-1 ">
          <p>BULK-ORDERS</p>
          <hr className='w-2/4 border h-[1.5px] bg-grey-700 hidden' />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1 ">
          <p>ABOUT-US</p>
          <hr className='w-2/4 border h-[1.5px] bg-grey-700 hidden' />
        </NavLink>
        {/* <NavLink to='/contact' className="flex flex-col items-center gap-1 ">
            <p>CONTACT</p>
            <hr className='w-2/4 border h-[1.5px] bg-grey-700 hidden' />
          </NavLink> */}

      </ul>
      <div className="flex items-center gap-5">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

        <div className="relative">
  <img
    src={assets.profile_icon}
    className="w-5 cursor-pointer"
    alt=""
    onClick={() => {
      if (!token) {
        navigate('/login');
      } else {
        setProfileOpen(prev => !prev);
      }
    }}
  />

  {token && profileOpen && (
    <div className="absolute right-0 pt-4 z-50">
      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-grey-200 rounded shadow">
        <p
          onClick={() => {
            setShowProfileCard(true);
            setProfileOpen(false);
          }}
          className="cursor-pointer hover:text-blue-700 transition"
        >
          My Profile
        </p>

        <p
          onClick={() => {
            navigate('/orders');
            setProfileOpen(false);
          }}
          className="cursor-pointer hover:text-blue-700 transition"
        >
          Order
        </p>

        <p
          onClick={() => {
            logout();
            setProfileOpen(false);
          }}
          className="cursor-pointer hover:text-blue-700 transition"
        >
          Logout
        </p>
      </div>
    </div>
  )}

  {/* ✅ PROFILE CARD RENDER */}
  {showProfileCard && user && <Profilecard user={user} />}
</div>


        <Link to='/cart' className="relative inline-block">
          <img src={assets.cart_icon} className="w-6 h-6" alt="cart" />
          <span className="absolute -bottom-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {
              getCartCount()
            }
          </span>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
      </div>

      {/* sidebar */}


      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} z-50`}>
        <div className='flex flex-col text-grey-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'>PRODUCTS</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/bulkorders'>BULK-ORDERS</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>ABOUT</NavLink>
          {/* <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to='/contact'>CONTACT</NavLink> */}
        </div>
      </div>
    </div>
  )
}

export default navbar