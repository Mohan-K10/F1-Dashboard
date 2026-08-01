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

  const teamInfo = {
    'McLaren': { color: '#FF8700', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png' },
    'Ferrari': { color: '#E8002D', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png' },
    'Red Bull Racing': { color: '#3671C6', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png' },
    'Mercedes': { color: '#27F4D2', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png' },
    'Aston Martin': { color: '#229971', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png' },
    'Alpine': { color: '#FF87BC', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png' },
    'Williams': { color: '#64C4FF', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png' },
    'Haas F1 Team': { color: '#B6BABD', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png' },
    'Racing Bulls': { color: '#6692FF', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png' },
    'Audi': { color: '#52E252', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png' },
    'Cadillac': { color: '#FFFFFF', logo: '' },
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
    <div className='min-h-screen bg-black px-4 py-6 text-white sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-5xl'>
        <div className='my-4 flex flex-col gap-4 rounded-3xl border border-[#e10600]/30 bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(225,6,0,0.15)] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
          <span className='flex items-center gap-3 text-xl font-semibold'>
            <Link to={'/'} className='hover:opacity-80 transition-opacity'><F1Logo height={30} /></Link>
            <p className='font-black uppercase tracking-widest'>Drivers</p>
          </span>
          <div className='flex flex-wrap items-center gap-3 font-medium'>
            <button
              onClick={() => {
                setCompareMode(!compareMode)
                setselectedDrivers([]) // clear on toggle
              }}
              className={`h-fit rounded-full px-5 py-2 transition ${compareMode
                ? 'bg-[#e10600] text-white hover:bg-[#c90500]'
                : 'hover:bg-[#e10600]/10 hover:text-[#e10600]'
                }`}
            >
              {compareMode ? 'Cancel Compare' : 'Compare Drivers'}
            </button>
            <Link to={'/'} className='rounded-full px-5 py-2 transition hover:bg-[#e10600]/10 hover:text-[#e10600]'>Back</Link>
          </div>

        </div>

        <div className='overflow-hidden rounded-2xl border border-zinc-800/50 bg-black/40 backdrop-blur-md shadow-2xl shadow-[#e10600]/5 mt-8'>
          <div className='min-w-[720px]'>
            <div className='grid grid-cols-[2fr_2fr_1fr] gap-4 bg-zinc-900/80 px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-500 sm:px-6'>
              <p>Driver</p>
              <p>Team</p>
              {compareMode ? <p className='text-right'>Select</p> : <p className='text-right'>Details</p>}

            </div>

            <div className='flex flex-col'>
            {drivers.map((driver) => {
              const tInfo = teamInfo[driver.team_name] || { color: '#666', logo: '' };
              return (
              <div
                key={driver.driver_number}
                className='group grid grid-cols-[2fr_2fr_1fr] items-center gap-4 border-t border-zinc-800/50 bg-transparent px-6 py-4 transition-all hover:bg-[var(--team-color)] sm:px-6'
                style={{ '--team-color': tInfo.color }}
                >
                <p className='text-lg font-semibold group-hover:text-white group-hover:drop-shadow-md'>{driver.full_name}</p>
                <div className='flex items-center gap-3'>
                  {tInfo.logo ? (
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 p-1.5 transition-transform group-hover:scale-110 group-hover:bg-white/20 shadow-sm'>
                      <img src={tInfo.logo} alt={driver.team_name} className='max-h-full max-w-full object-contain' onError={(e) => {e.target.style.display='none'}} />
                    </div>
                  ) : (
                    <div className='h-10 w-10 shrink-0 rounded-full bg-white/10 group-hover:bg-white/20' />
                  )}
                  <span className='font-bold tracking-wide transition-colors group-hover:!text-white group-hover:drop-shadow-md' style={{ color: tInfo.color }}>{driver.team_name}</span>
                </div>
                <div className='text-right'>
                  {compareMode ?

                  <button onClick={() => toggleDriverSelection(driver)} className='rounded-full border border-zinc-800 bg-zinc-900/80 px-5 py-2 text-sm font-semibold transition hover:bg-white hover:text-black group-hover:border-white/50 group-hover:bg-black/50 group-hover:text-white'>
                    {selectedDrivers.some((d) => (d.driver_number === driver.driver_number)) ? <>&#x2713; Selected</> : "Select"}

                  </button> :
                  
                    <Link
                    to={`/driverdetails/${teamById[driver.team_name]}`}
                    className='inline-block rounded-full border border-[#e8192c]/40 bg-[#e8192c]/15 px-5 py-2 text-sm font-semibold text-[#ff4d5e] transition hover:bg-[#e8192c]/30 group-hover:border-white group-hover:bg-white group-hover:text-black'
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
