import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom';

const Productitem = ({ id, image, name, price, stock }) => {
  const { currency } = useContext(ShopContext);

  const isOutOfStock = stock <= 0;

  return (
    <Link
      to={isOutOfStock ? "#" : `/product/${id}`}
      className={`cursor-pointer text-gray-700 ${
        isOutOfStock ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />

        {isOutOfStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1">
            Out of Stock
          </span>
        )}
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};


export default Productitem