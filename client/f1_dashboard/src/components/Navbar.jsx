import F1Logo from './F1Logo'
import { Link } from "react-router"


const Navbar = () => {
  return (
    <div className='flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-[#0a0a0f] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8'>
        <Link to={'/'} className='shrink-0'>
          <F1Logo height={28}/>
        </Link>
        <div className='flex flex-wrap items-center gap-3 text-sm text-white sm:gap-4 md:text-base'>
            <Link className='rounded-full border border-zinc-800 px-4 py-2 transition hover:border-zinc-500 hover:bg-white/5' to={'/standings'}>Standings</Link>
            <Link className='rounded-full border border-zinc-800 px-4 py-2 transition hover:border-zinc-500 hover:bg-white/5' to={'/drivers'}>Drivers</Link>
            <Link className='rounded-full border border-zinc-800 px-4 py-2 transition hover:border-zinc-500 hover:bg-white/5' to={'/positions'}>TopConstructor</Link>
        </div>

    </div>
  )
}

export default Navbar
