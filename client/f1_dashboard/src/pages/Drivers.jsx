import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import F1Logo from '../components/F1Logo'

const Drivers = () => {
  const [drivers, setdrivers] = useState([])
  const [selectedDrivers, setselectedDrivers] = useState([])
  const [compareMode, setCompareMode] = useState(false)
  // const [compareDriver, setcompareDriver] = useState(false)
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

  const toggleDriverSelection = (driver) => {
    const isSelected = selectedDrivers.some((item) => (
      item.driver_number === driver.driver_number
    ))

    if (isSelected) {
      setselectedDrivers(selectedDrivers.filter((item) => item.driver_number !== driver.driver_number))
    } else {
      console.log(driver)
      if (selectedDrivers.length < 2) {
        setselectedDrivers([...selectedDrivers, driver])
      }
    }

  }

  useEffect(() => {
    const getdrivers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/drivers`);
        if (!response.ok) {
          throw new Error('Failed to load drivers')
        }
        const data = await response.json()
        setdrivers(Array.isArray(data) ? data : [])
      } catch (error) {
        console.log(error)
        setdrivers([])
      }
    }
    getdrivers()
  }, [])

  return (
    <div className='min-h-screen bg-[#131318] px-4 py-6 text-white sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-5xl'>
        <div className='my-4 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-black px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
          <span className='flex items-center gap-3 text-xl font-semibold'>
            <Link to={'/'}><F1Logo height={30} /></Link>
            <p>Drivers</p>
          </span>
          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => {
                setCompareMode(!compareMode)
                setselectedDrivers([]) // clear on toggle
              }}
              className={`h-fit p-2 px-4 rounded-md border  ${compareMode
                ? 'bg-[#e10600] border-[#e10600] text-white cursor-pointer'
                : 'bg-transparent border-zinc-600 text-zinc-300 hover:border-zinc-400 cursor-pointer'
                }`}
            >
              {compareMode ? 'Cancel Compare' : 'Compare Drivers'}
            </button>
            <Link to={'/'} className='bg-[#e10600] h-fit p-2 px-4 rounded-md'>Back</Link>
          </div>

        </div>

        <div className='overflow-x-auto border-y border-zinc-800 sm:rounded-xl sm:border'>
          <div className='min-w-[720px]'>
            <div className='grid grid-cols-[2fr_2fr_1fr] bg-zinc-900 px-4 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400 sm:px-6'>
              <p>Driver</p>
              <p>Team</p>
              {compareMode ? <p className='text-right'>Select</p> : <p className='text-right'>Details</p>}

            </div>

            {drivers.map((driver) => {
              return (
              <div
                key={driver.driver_number}
                className='grid grid-cols-[2fr_2fr_1fr] items-center border-t border-zinc-800 bg-[#0a0a0f] px-4 py-4 sm:px-6'
                >
                <p className='text-base font-medium'>{driver.full_name}</p>
                <p className='flex items-center gap-2 text-zinc-300'>
                  <span
                    className='inline-block h-2 w-2 rounded-full'
                    style={{ backgroundColor: teamColors[driver.team_name] ?? '#666' }}
                    />
                  {driver.team_name}
                </p>
                <div className='text-right'>
                  {compareMode ?

                  <button onClick={() => toggleDriverSelection(driver)} className='rounded-md border border-zinc-800 px-4 py-1.5 text-sm cursor-pointer hover:bg-[#e10600] '>
                    {selectedDrivers.some((d) => (d.driver_number === driver.driver_number)) ? <>&#x2713; Selected</> : "Select"}

                  </button> :
                  
                    <Link
                    to={`/driverdetails/${teamById[driver.team_name]}`}
                    className='bg-[#e8192c]/15 border border-[#e8192c]/40 text-[#ff4d5e] px-4 py-1.5 rounded-md text-sm hover:bg-[#e8192c]/25 transition-colors'
                    >
                      View More
                    </Link>

  }

                </div>
              </div>
  )
  })}
          </div>
        </div>
        {selectedDrivers.length === 2 && (
          <div className='fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-4 shadow-2xl shadow-black/40 sm:left-1/2 sm:w-fit sm:-translate-x-1/2 sm:flex-row sm:items-center sm:gap-5 sm:px-6'>

            <span className='flex flex-wrap gap-x-3 gap-y-1'>
              <p>{selectedDrivers[0].full_name}</p>
              <p className='text-zinc-400'>vs</p>
              <p>{selectedDrivers[1].full_name}</p>
            </span>

            <Link to={`/compare/${selectedDrivers[0].name_acronym.toUpperCase()}/${selectedDrivers[1].name_acronym.toUpperCase()}`}
             className='rounded-full border border-zinc-700 px-4 py-2 text-center transition hover:border-zinc-500'>
              &rarr; Compare
              </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drivers
