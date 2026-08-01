import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import F1Logo from '../components/F1Logo'

const teamInfo = {
  'McLaren': { color: '#FF8700', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png' },
  'Ferrari': { color: '#E8002D', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png' },
  'Red Bull': { color: '#3671C6', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png' },
  'Mercedes': { color: '#27F4D2', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png' },
  'Aston Martin': { color: '#229971', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png' },
  'Alpine': { color: '#FF87BC', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png' },
  'Williams': { color: '#64C4FF', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png' },
  'Haas F1 Team': { color: '#B6BABD', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png' },
  'RB F1 Team': { color: '#6692FF', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png' },
  'Kick Sauber': { color: '#52E252', logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png' },
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
  const team = teamInfo[standings?.Constructor?.name]
  const teamColor = team?.color ?? '#71717a'

  return (
    <div className='min-h-screen bg-black px-4 text-white sm:px-6'>
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
        <div className='flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-zinc-800 bg-[#0a0a0f] p-4 sm:w-fit sm:flex-row sm:items-center sm:gap-6 sm:px-8'>
          <span className='font-semibold text-base'>Enter Year:</span>
          <input
            className='w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-base focus:border-[#e8192c]/60 focus:outline-none sm:w-40'
            value={year}
            placeholder='e.g. 2024'
            onChange={(e) => setyear(e.target.value === '' ? '' : Number(e.target.value))}
            type='number'
          />
        </div>
      </div>

      <div className='flex flex-col items-center gap-6 py-10'>
        {String(year).length === 4 && (
          <div
            className='w-full max-w-2xl rounded-2xl border bg-[#0a0a0f] p-6 sm:p-10 shadow-2xl'
            style={{ borderColor: `${teamColor}40`, boxShadow: `0 0 40px ${teamColor}10` }}
          >
            <div className='mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-4'>
                {team?.logo ? (
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 p-2'>
                    <img src={team.logo} alt={standings?.Constructor?.name} className='max-h-full max-w-full object-contain' onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                ) : (
                  <div
                    className='h-4 w-4 rounded-full'
                    style={{ backgroundColor: teamColor }}
                  />
                )}
                <h1
                  className='text-2xl font-bold capitalize transition-colors duration-300 sm:text-3xl'
                  style={{ '--hover-color': teamColor }}
                  onMouseEnter={(e) => e.target.style.color = teamColor}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
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
                <div key={label} className='rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5 sm:p-6 transition-colors hover:bg-zinc-800'>
                  <p className='mb-2 text-sm text-zinc-500'>{label}</p>
                  <p className='text-3xl font-semibold leading-none text-white sm:text-4xl'>{value}</p>
                </div>
              ))}
            </div>

            <div className='flex items-center justify-center gap-2 border-t border-zinc-800 pt-6 text-sm text-zinc-500'>
              <F1Logo height={12} />
              <p>
                Constructors Championship · {year ? `Season ${year}` : 'Enter a year above'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriverDetails
