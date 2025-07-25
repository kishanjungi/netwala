import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import Productitem  from '../components/Productitem';
 

const RelatesProducts = ({category,subCategory}) => {
  
    const {products}=useContext(ShopContext);
    const [related,setRelated]=useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice();
            
            productsCopy=productsCopy.filter((item)=>category === item.category);
            productsCopy=productsCopy.filter((item)=>subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5));

        }
    },[products])

    return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}></Title>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
            {related.map((item,index)=>(
                <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}></Productitem>
            ))}
        </div>
    </div>
  )
}

export default RelatesProducts