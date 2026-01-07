import React from 'react'

const WhatsAppFloat = () => {
  const whatsappLink =
    "https://wa.me/919925436667?text=Hello%20I%20am%20interested%20in%20bulk%20order%20or%20custom%20size%20trawl%20fishing%20nets"

  return (
    <div className="fixed bottom-5 right-5 z-50 group">

      {/* Tooltip */}
      <div className="absolute right-16 bottom-1/2 translate-y-1/2
                      bg-black text-white text-sm px-3 py-1 rounded
                      opacity-0 group-hover:opacity-100
                      transition whitespace-nowrap">
        Chat with us on WhatsApp
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full
                   bg-[#25D366] hover:bg-[#1ebe5d]
                   flex items-center justify-center
                   shadow-lg transition transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M19.11 17.2c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17-.35.22-.65.07a8.2 8.2 0 0 1-2.41-1.49 9.03 9.03 0 0 1-1.66-2.07c-.17-.3 0-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35z"/>
          <path d="M16.02 3.2c-7.07 0-12.82 5.75-12.82 12.82 0 2.26.6 4.37 1.64 6.2L3.2 28.8l6.78-1.78a12.76 12.76 0 0 0 6.04 1.53h.01c7.07 0 12.82-5.75 12.82-12.82S23.1 3.2 16.02 3.2zm0 22.15c-1.96 0-3.88-.53-5.55-1.53l-.4-.24-4.02 1.06 1.07-3.92-.26-.4a9.97 9.97 0 0 1-1.53-5.32c0-5.52 4.49-10.01 10.01-10.01 5.52 0 10.01 4.49 10.01 10.01 0 5.52-4.49 10.01-10.01 10.01z"/>
        </svg>
      </a>

    </div>
  )
}

export default WhatsAppFloat
