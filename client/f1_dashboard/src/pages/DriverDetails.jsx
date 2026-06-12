import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
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
  const { teamId } = useParams()
  const [teamData, setteamData] = useState(null)
  const [year, setyear] = useState('')

  useEffect(() => {
    if (!year || String(year).length !== 4 || !teamId) return

    const getTeamHistory = async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/driverdetail/${year}/${teamId}`)
      const data = await response.json()
      setteamData(data)
    }

    getTeamHistory()
  }, [teamId, year])

  const standings = teamData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings?.[0]
  const standingsName = standings?.Constructor?.name
  const teamColor = teamColors[standingsName] ?? '#71717a'

  return (
    <div className='min-h-screen bg-zinc-900 px-4 py-6 text-white sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col gap-4 rounded-3xl border border-zinc-700 bg-black px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex items-center gap-3 text-xl font-semibold'>
            <Link to={'/'}><F1Logo height={30} /></Link>
            <p>Constructor Standings</p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <span className='text-sm text-gray-400'>Enter the Year:</span>
            <input
              className='w-full rounded-xl border border-gray-700 bg-zinc-900 px-4 py-3 text-base text-white focus:border-red-500 focus:outline-none sm:w-44'
              value={year}
              placeholder='e.g. 2024'
              onChange={(e) => setyear(e.target.value)}
              type='number'
            />
            <Link to={'/drivers'} className='inline-flex w-fit items-center rounded-md bg-red-700 px-4 py-3 text-white'>
              Back
            </Link>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-8 py-10'>
          {String(year).length === 4 ? (
            <div
              className='w-full rounded-3xl border bg-black p-6 sm:p-12'
              style={{ borderColor: `${teamColor}40` }}
            >
              {standings ? (
                <>
                  <div className='mb-10 flex flex-col gap-4 border-b border-gray-800 pb-6 sm:flex-row sm:items-center'>
                    <div className='flex items-center gap-4'>
                      <div className='h-4 w-4 shrink-0 rounded-full bg-gray-400' />
                      <h1 className='text-2xl font-medium capitalize text-white sm:text-4xl'>
                        {standingsName}
                      </h1>
                    </div>
                    <span className='text-sm text-gray-400 border border-gray-700 px-4 py-1.5 rounded-full sm:ml-auto'>
                      {year || '-'}
                    </span>
                  </div>

                  <div className='mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8'>
                    {[
                      { label: 'Points', value: standings?.points ?? '-' },
                      { label: 'Position', value: standings?.position ? `P${standings.position}` : '-' },
                      { label: 'Wins', value: standings?.wins ?? '-' },
                    ].map(({ label, value }) => (
                      <div key={label} className='rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8'>
                        <p className='mb-3 text-sm text-gray-500'>{label}</p>
                        <p className='text-4xl font-medium leading-none text-white sm:text-5xl'>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className='border-t border-gray-800 pt-6'>
                    <p className='text-base text-gray-500'>
                      Constructors Championship · Season {year}
                    </p>
                  </div>
                </>
              ) : (
                <div className='py-12 text-center text-gray-400'>
                  <p className='text-xl font-medium'>No data available</p>
                  <p className='mt-2'>This team did not participate in the year {year}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default DriverDetails
