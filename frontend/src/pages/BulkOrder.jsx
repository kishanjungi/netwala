import React from 'react'
import { assets } from '../assets/assets'

const BulkOrder = () => {
  const whatsappLink =
    "https://wa.me/919925436667?text=Hello%20I%20want%20to%20place%20a%20bulk%20order%20or%20custom%20size%20trawl%20fishing%20nets"

  return (
    <div
      className="relative min-h-[80vh] flex items-center justify-center z-10"
      style={{
        backgroundImage: `url(${assets.hero_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-center px-6 bg-white/90
                      p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold text-[#0b3c5d] mb-4">
          Bulk Orders & Custom Size Nets
        </h1>

        <p className="text-gray-700 mb-6">
          Looking for bulk quantity or custom-size trawl fishing nets?
          Contact us directly on WhatsApp for pricing, specifications,
          and delivery across Gujarat.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2
                     bg-green-600 hover:bg-green-700
                     text-white px-6 py-3
                     rounded-md font-medium transition"
        >
          Contact Us on WhatsApp
        </a>

      </div>
    </div>
  )
}

export default BulkOrder
