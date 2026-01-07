import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-grey-700'>
        <div >
            <img src={assets.durable_icon} className='w-12 m-auto md-5' alt="" />
            <p className='mt-5 font-semibold'>Strong and Durable Material</p>
            {/* <p className='text-grey-400'>We offer hassel free exchange policy</p> */}
        </div>
        <div >
            <img src={assets.deepsea_icon} className='w-12 m-auto md-5' alt="" />
            <p className='mt-5 font-semibold'>Suitable for Deep Sea Fishing</p>
            {/* <p className='text-grey-400'>We provide 7 days return policy</p> */}
        </div>
        <div >
            <img src={assets.trust_icon} className='w-12 m-auto md-5' alt="" />
            <p className='mt-5 font-semibold'>Trusted By Indian Fishermen</p>
            {/* <p className='text-grey-400'> We provide 24/7 customer support</p> */}
        </div>
    </div>
  )
}

export default OurPolicy