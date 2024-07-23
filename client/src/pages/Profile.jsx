import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  const fileRef = useRef(null)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='h-24 w-24 rounded-full self-center mt-2 object-cover cursor-pointer' src={currentUser.avtar} alt="Profile" />
        <input className='border p-3 rounded-lg' type="text" placeholder='Username' id='username' />
        <input className='border p-3 rounded-lg' type="email" placeholder='Email' id='email'/>
        <input className='border p-3 rounded-lg' type="password" placeholder='Password' id='password'/>

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-85'>Update</button>
      </form>
      <div className='flex justify-between text-red-700 mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
