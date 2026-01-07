import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
          <div >
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-grey-600'>
              Netwala Firm is a trusted manufacturer of trawl fishing nets with over 20 years of experience in the fishing industry. We specialize in producing strong, reliable nets and continuously develop new net designs based on specific requirements and special requests from fishermen.
            </p>
          </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-grey-600'>
          <NavLink onClick={() => window.scrollTo(0, 0)} to='/'>HOME</NavLink>
          <NavLink onClick={() => window.scrollTo(0, 0)} to='/collection'>PRODUCTS</NavLink>
          <NavLink onClick={() => window.scrollTo(0, 0)} to='/bulkorders'>BULK-ORDERS</NavLink>
          <NavLink onClick={() => window.scrollTo(0, 0)} to='/about'>ABOUT</NavLink>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'> GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-grey-600'>
            <li>+91-992-543-6667</li>
            <li>contact@kishan.jungi.tech@gmail.com</li>
          </ul>
        </div>

        </div>

        <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2026 @netwala.com-All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer