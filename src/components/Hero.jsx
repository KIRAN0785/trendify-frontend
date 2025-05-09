import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 sm:px-12 py-16 bg-gradient-to-br from-gray-50 to-gray-200 min-h-[80vh] gap-12 lg:gap-20">
      
      {/* Left Side - Text */}
      <div className="w-full lg:w-[45%] text-center lg:text-left animate-fade-up space-y-6">
        {/* Section label */}
        <div className="flex justify-center lg:justify-start items-center gap-3 text-[#414141]">
          <span className="w-8 h-[2px] bg-[#414141]"></span>
          <p className="text-sm sm:text-base font-medium tracking-wide">OUR BESTSELLERS</p>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight">
          Latest Arrivals
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-700 font-medium">
          Elevate your everyday style with our handpicked favorites.
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Discover what’s trending this season — from timeless staples to bold new looks.
          Our curated collection is designed for modern living and effortless fashion.
        </p>

        {/* Call to Action */}
       
          <Link to = "/collection">
        
        <div className="flex justify-center lg:justify-start items-center gap-4 mt-4">
          <button  className="bg-[#414141] text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-[#313131] transition duration-300">
            Shop Now
          </button></div>
          </Link>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-[45%] flex justify-center">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full max-w-md sm:max-w-lg rounded-xl shadow-xl object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
