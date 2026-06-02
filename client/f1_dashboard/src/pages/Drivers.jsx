import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import F1Logo from '../components/F1Logo'

const Drivers = () => {
  const [drivers, setdrivers] = useState([])

  const teamById = {
    McLaren: 'mclaren',
    Mercedes: 'mercedes',
    Ferrari: 'ferrari',
    'Red Bull Racing': 'red_bull',
    'Aston Martin': 'aston_martin',
    Alpine: 'alpine',
    Williams: 'williams',
    'Haas F1 Team': 'haas',
    'Racing Bulls': 'rb',
    Audi: 'sauber',
    Cadillac: 'cadillac',
  }

  const teamColors = {
    'McLaren': '#FF8000',
    'Ferrari': '#E8002D',
    'Red Bull Racing': '#3671C6',
    'Mercedes': '#27F4D2',
    'Aston Martin': '#229971',
    'Alpine': '#FF87BC',
    'Williams': '#64C4FF',
    'Haas F1 Team': '#B6BABD',
    'Racing Bulls': '#6692FF',
    'Audi': '#999999',
    'Cadillac': '#FFFFFF',
  }

  useEffect(() => {
    const getdrivers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/drivers`);
        const data = await response.json()
        setdrivers(data)
      } catch (error) {
        console.log(error)
      }
    }
    getdrivers()
  }, [])

  return (
    <div className='min-h-screen bg-[#131318]  px-6 py-10 text-white'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex justify-between px-20 bg-black pt-6 my-4 rounded-3xl border border-zinc-800 items-center'>
          <span className='mb-6 text-xl font-semibold items-center gap-3 flex'>
            <Link to={'/'}><F1Logo height={30} /></Link>
            <p>Drivers</p>
          </span>
          <Link to={'/'} className='bg-[#e10600] h-fit p-2 px-4 mb-6 rounded-md '>Back</Link>
        </div>

        <div className='overflow-hidden rounded-xl border border-zinc-800'>
          <div className='grid grid-cols-[2fr_2fr_1fr] bg-zinc-900 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400'>
            <p>Driver</p>
            <p>Team</p>
            <p className='text-right'>Details</p>
          </div>

          {drivers.map((driver) => (
            <div
              key={driver.driver_number}
              className='grid grid-cols-[2fr_2fr_1fr] items-center border-t border-zinc-800 px-6 py-4 bg-[#0a0a0f] '
            >
              <p className='text-base font-medium'>{driver.full_name}</p>
              <p className='flex items-center gap-2 text-zinc-300'>
                <span
                  className='h-2 w-2 rounded-full inline-block'
                  style={{ backgroundColor: teamColors[driver.team_name] ?? '#666' }}
                />
                {driver.team_name}
              </p>
              <div className='text-right'>
                <Link
                  to={`/driverdetails/${teamById[driver.team_name]}`}
                  className='bg-[#e8192c]/15 border border-[#e8192c]/40 text-[#ff4d5e] px-4 py-1.5 rounded-md text-sm hover:bg-[#e8192c]/25 transition-colors'
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Drivers