import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { DRIVER_SLUGS } from '../data/driverSlugs'
import F1Logo from '../components/F1Logo'

const teamInfo = {
  'McLaren': { color: '#FF8700' },
  'Ferrari': { color: '#E8002D' },
  'Red Bull': { color: '#3671C6' },
  'Mercedes': { color: '#27F4D2' },
  'Aston Martin': { color: '#229971' },
  'Alpine': { color: '#FF87BC' },
  'Williams': { color: '#64C4FF' },
  'Haas F1 Team': { color: '#B6BABD' },
  'RB F1 Team': { color: '#6692FF' },
  'Kick Sauber': { color: '#52E252' },
}

const getTeamColor = (constructorName) => {
  if (!constructorName) return 'white'
  const teamKey = Object.keys(teamInfo).find(k => constructorName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(constructorName.toLowerCase()))
  return teamKey ? teamInfo[teamKey].color : 'white'
}

const Compare = () => {
  const { driver1, driver2 } = useParams()
  const [year, setYear] = useState('')
  const [driver1Data, setDriver1Data] = useState(null)
  const [driver2Data, setDriver2Data] = useState(null)

  const slug1 = DRIVER_SLUGS[driver1]
  const slug2 = DRIVER_SLUGS[driver2]

  useEffect(() => {
    if (!slug1 || !slug2) {
      return
    }

    const fetchBoth = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`https://racinghub.net/api/v1/drivers/${slug1}/seasons`),
          fetch(`https://racinghub.net/api/v1/drivers/${slug2}/seasons`),
        ])
        const [data1, data2] = await Promise.all([res1.json(), res2.json()])
        setDriver1Data(data1)
        setDriver2Data(data2)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBoth()
  }, [slug1, slug2])

  const driver1Season = driver1Data?.find((season) => season.year === Number(year))
  const driver2Season = driver2Data?.find((season) => season.year === Number(year))

  const commonYears =
    driver1Data && driver2Data
      ? driver1Data.map((season) => season.year).filter((seasonYear) =>
          driver2Data.some((season) => seasonYear === season.year)
        )
      : []

  const d1Color = getTeamColor(driver1Season?.constructors_name?.[0])
  const d2Color = getTeamColor(driver2Season?.constructors_name?.[0])

  return (
    <div className='min-h-screen bg-black px-4 py-4 text-white sm:px-6 sm:py-6'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col gap-4 rounded-3xl border border-[#e10600]/30 bg-black/80 px-4 py-3 backdrop-blur-md shadow-[0_0_15px_rgba(225,6,0,0.15)] sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
          <Link to={'/drivers'} className='w-fit hover:opacity-80 transition-opacity'>
            <F1Logo height={24} />
          </Link>
          <Link to={'/drivers'} className='inline-flex w-fit items-center rounded-full bg-[#e10600] px-5 py-2 text-sm font-semibold transition hover:bg-[#c90500]'>
            Back
          </Link>
        </div>

        {commonYears.length > 0 && (
          <div className='mt-6 overflow-hidden rounded-3xl border border-zinc-800/50 bg-[#0a0a0f] shadow-2xl'>
            <div className='flex flex-col items-center justify-center gap-3 border-b border-zinc-800/50 bg-zinc-900/30 p-4 sm:flex-row sm:gap-4 sm:p-5'>
              <span className='text-sm font-bold uppercase tracking-widest text-zinc-400'>Select Year:</span>
              <select
                className='w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2 text-white transition focus:border-[#e10600]/60 focus:outline-none sm:w-56'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value=''>Pick a year</option>
                {commonYears.map((seasonYear) => (
                  <option key={seasonYear} value={seasonYear}>
                    {seasonYear}
                  </option>
                ))}
              </select>
            </div>

            {driver1Season && driver2Season && (
              <div className='p-4 sm:p-6'>
                <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 gap-y-4 text-center sm:gap-x-8 sm:gap-y-5'>
                  
                  {/* Header Row */}
                  <div className='text-3xl font-black tracking-wide sm:text-4xl' style={{ color: d1Color }}>{driver1}</div>
                  <div className='text-xs font-bold uppercase tracking-widest text-zinc-500 sm:text-sm'>Stat</div>
                  <div className='text-3xl font-black tracking-wide sm:text-4xl' style={{ color: d2Color }}>{driver2}</div>

                  {/* Stat Rows */}
                  {[
                    { label: 'Championship Position', v1: `P${driver1Season.position}`, v2: `P${driver2Season.position}` },
                    { label: 'Points', v1: driver1Season.points, v2: driver2Season.points },
                    { label: 'Race Wins', v1: driver1Season.race_wins, v2: driver2Season.race_wins },
                    { label: 'Pole Positions', v1: driver1Season.pole_positions, v2: driver2Season.pole_positions },
                    { label: 'Constructor', v1: driver1Season.constructors_name.join(', '), v2: driver2Season.constructors_name.join(', ') },
                  ].map((row, i) => (
                    <div key={row.label} className='col-span-3 grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-8 group'>
                      <div className='flex h-full items-center justify-center rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-3 transition-colors group-hover:bg-zinc-800/80 sm:p-4'>
                        <span className='text-lg font-semibold text-white sm:text-2xl'>{row.v1}</span>
                      </div>
                      <div className='w-24 text-xs font-medium tracking-wide text-zinc-400 sm:w-40 sm:text-sm'>{row.label}</div>
                      <div className='flex h-full items-center justify-center rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-3 transition-colors group-hover:bg-zinc-800/80 sm:p-4'>
                        <span className='text-lg font-semibold text-white sm:text-2xl'>{row.v2}</span>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}

            {year && !driver1Season && !driver2Season && (
              <div className='py-12 text-center'>
                <p className='text-base text-zinc-500'>One or both drivers have no data for {year}.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Compare
