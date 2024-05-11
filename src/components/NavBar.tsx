import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'

const NavBar = () => {
  return (
  
    <div className=' sm:px-16 px-8 py-8 absolute z-10 w-full '>
      <nav className='  flex justify-center mx-2 z-10'>
        <div className='flex gap-20 my-2'>
          <div className='flex justify-center' >Logo </div>
          <ul className=' bg-transparent flex gap-10 px-20 rounded-md shadow-xl ring-1 ring-slate-500'>
            
            <li className='my-2 p-2 font-sans focus  ring-1 ring-purple-600 active:ring-black hover:ring-1 hover:ring-slate-200 hover:scale-105 rounded-md shadow-md'><Link href="/">Home</Link></li>
            <li className='my-2 p-2 font-sans focus ring-1 ring-purple-600 active:ring-black hover:ring-1 hover:ring-slate-200 hover:scale-105 rounded-md shadow-md'><Link href="/about"> About</Link></li>
         </ul>
         <ModeToggle></ModeToggle>
        </div>


      </nav>
    </div>
    
  )
}

export default NavBar