import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
  <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>

<div className='-mt-5'>
    <div className='flex items-center gap-2 '>
    <img src={assets.logo} className='mb-5' alt="" />
    <h2 className="text-2xl font-bold text-gray-800">TrendifyNow</h2>
    </div>
     <p className='w-full md:w-2/3 text-gray-600'>
     TrendifyNow brings you the latest trends with top-notch quality and fast delivery.
    Our mission is to make fashion accessible, affordable, and stylish for everyone.
    Stay connected for updates, exclusive offers, and new arrivals!
    </p>
</div>
<div>
    <p className='text-xl font-medium mb-5'>EXPLORE</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy policy</li>
        
    </ul>
</div>
<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+1-212-456-7890</li>
        <li>contact@TrendifyNow.com</li>
    </ul>
</div>
    </div>
    <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ TrendifyNow.com - All Right Reserved </p>
    </div>
    </div>
  )
}

export default Footer