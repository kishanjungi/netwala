import React from 'react'

const Newsletterbox = () => {

    const onSubmmitHandler=(event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center' >
        <p className='text-2xl font-medium text-grey-800'>Subscribe Now & get 20% off</p>
        <p className='text-grey-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum in praesentium laudantium reprehenderit! Incidunt ab, eum amet sapiente debitis quod quam ipsum cupiditate dolorem nobis. Hic dignissimos tenetur dolorum.
        </p>
        <form onSubmit={onSubmmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input  className='w-full sm:flex-1 outline-none' type="email" placeholder='enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletterbox