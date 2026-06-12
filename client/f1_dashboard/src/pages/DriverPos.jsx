import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import F1Logo from '../components/F1Logo'

const teamColors = {
  'McLaren': '#FF8000',
  'Ferrari': '#E8002D',
  'Red Bull': '#3671C6',
  'Mercedes': '#27F4D2',
  'Aston Martin': '#229971',
  'Alpine': '#FF87BC',
  'Williams': '#64C4FF',
  'Haas F1 Team': '#B6BABD',
  'RB F1 Team': '#6692FF',
  'Kick Sauber': '#52E252',
}

const DriverDetails = () => {
  const [teamData, setteamData] = useState(null)
  const [year, setyear] = useState('')

  useEffect(() => {
    if (!year || String(year).length !== 4) return

    const getTeamHistory = async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/driverposition/${year}`)
      const data = await response.json()
      setteamData(data)
    }

    getTeamHistory()
  }, [year])

  const standings = teamData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings?.[0]
  const teamColor = teamColors[standings?.Constructor?.name] ?? '#71717a'

  return (
    <div className='min-h-screen bg-[#131318] px-4 text-white sm:px-6'>
      <div className='flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between'>
        <span className='flex items-center gap-3 text-xl font-semibold'>
          <Link to={'/'}><F1Logo height={30} /></Link>
          <p>Constructor Standings</p>
        </span>
        <Link to={'/'} className='inline-flex w-fit items-center rounded-md bg-[#e10600] px-4 py-2 text-sm font-medium text-white'>
          Back
        </Link>
      </div>

      <div className='mt-10 flex flex-col items-center gap-4'>
        <p className='text-xs uppercase tracking-widest text-zinc-500'>Select a Season</p>
        <div className='flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-zinc-800 bg-black p-4 sm:w-fit sm:flex-row sm:items-center sm:gap-6 sm:px-8'>
          <span className='font-semibold text-base'>Enter Year:</span>
          <input
            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-base focus:border-[#e8192c]/60 focus:outline-none sm:w-40'
            value={year}
            placeholder='e.g. 2024'
            onChange={(e) => setyear(Number(e.target.value))}
            type='number'
          />
        </div>
      </div>

      <div className='flex flex-col items-center gap-6 py-10'>
        {String(year).length === 4 && (
          <div
            className='w-full max-w-2xl rounded-2xl border bg-zinc-900 p-6 sm:p-10'
            style={{ borderColor: `${teamColor}40` }}
          >
            <div className='mb-8 flex flex-col gap-4 border-b border-zinc-700 pb-6 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-3'>
                <div
                  className='h-3 w-3 rounded-full'
                  style={{ backgroundColor: teamColor }}
                />
                <h1 className='text-xl font-semibold capitalize sm:text-2xl'>
                  {standings?.Constructor?.name}
                </h1>
              </div>
              <span className='rounded-md border border-zinc-700 px-3 py-1 text-sm text-zinc-400'>
                {year || '-'}
              </span>
            </div>

            <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
              {[
                { label: 'Points', value: standings?.points ?? '-' },
                { label: 'Position', value: standings?.position ? `P${standings.position}` : '-' },
                { label: 'Wins', value: standings?.wins ?? '-' },
              ].map(({ label, value }) => (
                <div key={label} className='rounded-xl border border-zinc-700 bg-zinc-800 p-5 sm:p-6'>
                  <p className='mb-2 text-sm text-zinc-500'>{label}</p>
                  <p className='text-3xl font-semibold leading-none text-white sm:text-4xl'>{value}</p>
                </div>
              ))}
            </div>

            <p className='border-t border-zinc-700 pt-6 text-sm text-zinc-500'>
              Constructors Championship · {year ? `Season ${year}` : 'Enter a year above'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriverDetails
