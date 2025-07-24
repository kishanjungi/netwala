import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productitem from './Productitem';

const BestSeller = () => {
    
    const { products } =useContext(ShopContext);
    const [bestSeller,setbestSeller]=useState([]);
    
    useEffect(()=>{
        const bestProducts=products.filter((item)=>(item.bestseller));
        setbestSeller(bestProducts.slice(0,5));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={'SELLERS'}></Title>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit accusantium quod perferendis vitae distinctio optio iste dolorem vero! Velit repellendus aliquam cupiditate expedita voluptatum quasi hic et. Dolorem, a totam?
            </p>
        </div>
        {/* render best seller products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
      {
        bestSeller.map((item,index)=>(
          <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}></Productitem>
        ))
      }
    </div>
    </div>
    
  )
}

export default BestSeller

