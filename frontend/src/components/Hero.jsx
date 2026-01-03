import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate=useNavigate();

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 bg-[#0b3c5d]">

      {/* LEFT SIDE CONTENT */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-10 h-[2px] bg-white"></span>
            <p className="font-medium text-sm md:text-base text-white">
              Durable • Strong
            </p>
          </div>

          <h1 className="prata-regular text-3xl lg:text-5xl leading-relaxed text-white mb-3">
            High-Quality Trawl Fishing Nets
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base text-white">
              Trusted by Fishermen
            </p>
            <span className="w-10 h-[2px] bg-white"></span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE HERO IMAGE */}
      <div className="relative group w-full sm:w-1/2 overflow-hidden">

        {/* Image */}
        <img
          src={assets.hero_img}
          alt="Trawl Fishing Nets"
          className="w-full h-full object-cover transition duration-500
                     group-hover:scale-105 group-hover:brightness-50"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center
                     text-center px-6
                     opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                     transition duration-500"
        >
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Premium Trawl Fishing Nets
          </h2>

          <p className="text-gray-200 text-sm md:text-base mb-4">
            Built for deep sea & coastal fishing
          </p>
          <button
            onClick={()=>navigate("/collection")}
            className="bg-orange-500 hover:bg-orange-600 text-white
                             px-6 py-2 rounded-md font-medium transition">
            Explore Nets
          </button>
        </div>
      </div>

    </div>
  )
}

export default Hero
