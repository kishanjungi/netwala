import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatesProducts from '../components/RelatesProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className='border-t-2 pt-10 transition ease-in duration-500 opacity-100'>

      <div className='flex flex-col sm:flex-row gap-4 sm:gap-12'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2'>
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className='h-20 sm:h-16 cursor-pointer flex-shrink-0'
                alt=""
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%] flex justify-center items-center'>
            <img
              src={image}
              className='w-full max-w-md object-contain'
              alt=""
            />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>

          {/* Rating */}
          <div className='flex items-center mt-2 gap-1'>
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_dull_icon} className='w-3' alt="" />
            <p className='pl-2'>(122)</p>
          </div>

          {/* Price */}
          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>

          {/* Stock Status */}
          <p className="mt-2 text-sm font-medium">
            {productData.stock > 0 ? (
              <span className="text-green-600">
                In Stock ({productData.stock} available)
              </span>
            ) : (
              <span className="text-red-600">
                Out of Stock
              </span>
            )}
          </p>

          {/* Description */}
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description}
          </p>
          <p className='mt-2 text-gray-500 md:w-4/5'>
            {productData.description1}
          </p>
          <p className='mt-2 text-gray-500 md:w-4/5'>
            {productData.description2}
          </p>
          <p className='mt-2 text-gray-500 md:w-4/5'>
            {productData.description3}
          </p>
          <p className='mt-2 text-gray-500 md:w-4/5'>
            {productData.description4}
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={productData.stock <= 0}
            className={`mt-10 px-8 py-3 text-sm text-white
              ${productData.stock <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black active:bg-gray-700'}
            `}
          >
            {productData.stock <= 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original products</p>
            <p>Cash on delivery available</p>
            <p>Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description / Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p>
            Commodi, culpa, iste sit voluptas veritatis nobis facere.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatesProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
