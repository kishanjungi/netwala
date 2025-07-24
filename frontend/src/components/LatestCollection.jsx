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
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ea, autem delectus repellat facere molestias placeat cumque quidem voluptatum ut iusto sunt distinctio necessitatibus explicabo atque illum qui hic unde.
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