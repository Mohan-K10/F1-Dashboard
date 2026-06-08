import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import F1Logo from '../components/F1Logo'

const Drivers = () => {
  const [drivers, setdrivers] = useState([])
  const [selectedDrivers, setselectedDrivers] = useState([])
  const [compareMode, setCompareMode] = useState(false)
  const [driverCode, setdriverCode] = useState(null)
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
    <div className='min-h-screen bg-[#131318]  px-6 py-10 text-white'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex justify-between px-20 bg-black pt-6 my-4 rounded-3xl border border-zinc-800 items-center'>
          <span className='mb-6 text-xl font-semibold items-center gap-3 flex'>
            <Link to={'/'}><F1Logo height={30} /></Link>
            <p>Drivers</p>
          </span>
          <div className='flex gap-3 mb-6'>
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

        <div className='overflow-hidden rounded-xl border border-zinc-800'>
          <div className='grid grid-cols-[2fr_2fr_1fr] bg-zinc-900 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400'>
            <p>Driver</p>
            <p>Team</p>
            {compareMode ? <p className='text-right'>Select</p> : <p className='text-right'>Details</p>}

          </div>

          {drivers.map((driver) => {
            return (
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
                {compareMode ?

                <button onClick={() => toggleDriverSelection(driver)} className=' px-4 py-1.5 text-sm border border-zinc-800 rounded-md cursor-pointer hover:bg-[#e10600] '>
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
        {selectedDrivers.length === 2 && (
          <div className='fixed bottom-6 bg-zinc-900 p-4 rounded-4xl flex gap-5 items-center left-1/2 -translate-x-1/2 px-6 border border-zinc-800'>

            <span className='flex gap-3'>
              <p>{selectedDrivers[0].full_name}</p>
              <p className='text-zinc-400'>vs</p>
              <p>{selectedDrivers[1].full_name}</p>
            </span>

            <Link to={`/compare/${selectedDrivers[0].name_acronym.toUpperCase()}/${selectedDrivers[1].name_acronym.toUpperCase()}`}
             className='border border-zinc-700 p-3 rounded-3xl  hover:border-zinc-500'>
              &rarr; Compare
              </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drivers
