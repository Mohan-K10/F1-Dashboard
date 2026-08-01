import F1Logo from './F1Logo'
import { Link } from "react-router"


const Navbar = () => {
  return (
    <div className='sticky top-4 z-50 mx-auto max-w-7xl flex flex-col gap-4 rounded-3xl border border-[#e10600]/30 bg-black/80 backdrop-blur-md px-4 py-4 shadow-[0_0_15px_rgba(225,6,0,0.15)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8'>
        <Link to={'/'} className='shrink-0 hover:opacity-80 transition-opacity'>
          <F1Logo height={28}/>
        </Link>
        <div className='flex flex-wrap items-center gap-3 text-sm text-white sm:gap-4 md:text-base font-medium tracking-wide'>
            <Link className='rounded-full px-5 py-2 transition hover:bg-[#e10600]/10 hover:text-[#e10600]' to={'/standings'}>Standings</Link>
            <Link className='rounded-full px-5 py-2 transition hover:bg-[#e10600]/10 hover:text-[#e10600]' to={'/drivers'}>Drivers</Link>
            <Link className='rounded-full px-5 py-2 transition hover:bg-[#e10600]/10 hover:text-[#e10600]' to={'/positions'}>TopConstructor</Link>
        </div>

    </div>
  )
}

export default Navbar
