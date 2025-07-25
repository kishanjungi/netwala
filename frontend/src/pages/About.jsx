import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Newsletterbox from '../components/Newsletterbox';

const about = () => {


  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}></Title>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eius magnam, ut mollitia quisquam animi dolorem harum in dolore eos illum porro! Optio sint quam quidem quae dicta nobis velit.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla reprehenderit modi aliquid adipisci quo repudiandae, saepe ut in distinctio suscipit harum sit deserunt minus nihil numquam, est non, doloremque hic.</p>
        <b className='text-gray-800'>Our Misssion</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quam vitae recusandae consectetur accusantium reprehenderit autem architecto tenetur dolores tempora et eligendi eum aut illum deleniti velit odio corrupti doloribus.</p>
        </div>
      </div>
      <div className='text-Xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm: py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi temporibus explicabo voluptatibus tempore accusantium. Iure esse cumque quia eveniet assumenda voluptatum. Culpa, magnam inventore! Quibusdam debitis nostrum numquam ratione quis.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm: py-20 flex flex-col gap-5'>
          <b>Convenince:</b>
          <p className='text-gray-600' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi temporibus explicabo voluptatibus tempore accusantium. Iure esse cumque quia eveniet assumenda voluptatum. Culpa, magnam inventore! Quibusdam debitis nostrum numquam ratione quis.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm: py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          < p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi temporibus explicabo voluptatibus tempore accusantium. Iure esse cumque quia eveniet assumenda voluptatum. Culpa, magnam inventore! Quibusdam debitis nostrum numquam ratione quis.</p>
        </div>
      </div>
      <Newsletterbox></Newsletterbox>


    </div>
  )
}

export default about