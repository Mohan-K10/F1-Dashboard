import React from 'react'
import F1Logo from './F1Logo'
import { Link } from "react-router"


const Navbar = () => {
  return (
    <div className='flex justify-between px-30 py-6 bg-[#0a0a0f] my-5 rounded-4xl'>
        <Link to={'/'}><F1Logo height={30}/></Link>
        <p className='text-white flex gap-20'>

            <Link to={'/standings'}>Standings</Link>
            <Link to={'/drivers'}>Drivers</Link>
            <Link to={'/positions'}>TopConstructor</Link>
        </p>

    </div>
  )
}

export default Navbar