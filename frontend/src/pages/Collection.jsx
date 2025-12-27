import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem  from '../components/Productitem';


const collection = () => {

  const {products,search,showSearch} =useContext(ShopContext);
  const [showFilter,setshowFilter]=useState(false);
  const [filterproducts,setFitlerproducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subCategory,setsubCategory]=useState([]);
  const [sortType,setSortType]=useState('relevant');

  const toggelCategory=(e)=>{

    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggelsubCategory=(e)=>{
    if (subCategory.includes(e.target.value)) {
      setsubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setsubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter=()=>{

    let productsCopy=products.slice();

    if (showSearch && search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy=productsCopy.filter(item=> category.includes(item.category))
    }
    if(subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFitlerproducts(productsCopy);
    
  }

  const sortProduct=()=>{
    let fpCopy=filterproducts.slice();
     switch (sortType){
      case 'low-high':
        setFitlerproducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
       
      case 'high-low':
        setFitlerproducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;

      default:
       applyFilter();
       break; 
     }


  }

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products  ])

  useEffect(()=>{
    sortProduct();    
  },[sortType])

  return (
   <div className='flex flex-col sm:flex-row gap-1 sm:gap-19 pt-10 border-t'>

    {/* Filter options */}
    {/* <div className='min-w-60'>
      <p onClick={()=>{setshowFilter(!showFilter)}} className='my-2 text-2xl flex items-center cursor-pointer gap-2'>Filter
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ?'rotate-90  ':''}`} alt="" />
      </p> */}
      {/* Category filter */}
      {/* <div className={`border border-grey-300 pl-5 py-3 mt-6 ${showFilter?'':"hidden"} sm:block`}>
        <p className='mb-3 text-xm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-grey-700'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Men'} onChange={toggelCategory} />Men
          </p>
             <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Women'}  onChange={toggelCategory}/>Women
          </p>
             <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggelCategory}/>Kids
          </p>
        </div>
      </div> */}
      {/* subCategory filter */}
      {/* <div className={`border border-grey-300 pl-5 py-3 my-5 ${showFilter?'':"hidden"} sm:block`}>
        <p className='mb-3 text-xm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-grey-700'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggelsubCategory}/>Topwear
          </p>
             <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggelsubCategory}/>Bottomwear
          </p>
             <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggelsubCategory}/>Winterwear
          </p>
        </div>
      </div>
    </div> */}

    {/* Right side  */}

    <div className='flex-1 '>

      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={"ALL"} text2={"COLLECTION"}></Title>

        {/* product */}

        <select  onChange={(e)=>setSortType(e.target.value)} className='border-1 border-grey-300 text-sm px-2'>
          <option value="relavant">Sort by: Relavant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div> 

      {/* Map products */}

      <div className='grid grid cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterproducts.map((item,index)=>(
            <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
          ))
        }
      </div>

    </div>
    </div>
  )
}

export default collection