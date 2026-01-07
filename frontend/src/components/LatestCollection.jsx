import React, { useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import Title from './Title';
import Productitem from './Productitem';

const LatestCollection = () => {
    const { products }=useContext(ShopContext);
    const [latestProduct,setlatestProduct]=useState([]);

    useEffect(()=>{
      setlatestProduct(products.slice(0,10));
    },[products])
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'TRAWL NETS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
        We introduce our latest range of trawl fishing nets, developed based on real fishing conditions and industry experience. Each net is tested for strength and durability to ensure reliable performance, longer service life, and better results at sea.
        </p>  
      </div>

    {/* render product */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
      {
        latestProduct.map((item,index)=>(
          <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}></Productitem>
        ))
      }
    </div>
    </div>
  )
}
      
export default LatestCollection