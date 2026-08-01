import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
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
  const constructorName = standings?.Constructor?.name || ''
  const teamKey = Object.keys(teamInfo).find(k => constructorName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(constructorName.toLowerCase()))
  const team = teamKey ? teamInfo[teamKey] : null
  const teamColor = team?.color ?? '#71717a'

  return (
    <div className='min-h-screen bg-black px-4 py-6 text-white sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col gap-4 rounded-3xl border border-[#e10600]/30 bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(225,6,0,0.15)] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex items-center gap-3 text-xl font-semibold'>
            <Link to={'/'} className='hover:opacity-80 transition-opacity'><F1Logo height={30} /></Link>
            <p className='font-black uppercase tracking-widest'>Constructor Standings</p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center font-medium'>
            <span className='text-sm text-zinc-400'>Enter the Year:</span>
            <input
              className='w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-base text-white focus:border-[#e8192c]/60 focus:outline-none sm:w-44'
              value={year}
              placeholder='e.g. 2024'
              onChange={(e) => setyear(e.target.value === '' ? '' : Number(e.target.value))}
              type='number'
            />
            <Link to={'/drivers'} className='inline-flex w-fit items-center rounded-full bg-[#e10600] px-5 py-2.5 text-white transition hover:bg-[#c90500]'>
              Back
            </Link>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-8 py-10'>
          {String(year).length === 4 ? (
            <div
              className='w-full rounded-3xl border bg-[#0a0a0f] p-6 sm:p-12 shadow-2xl'
              style={{ borderColor: `${teamColor}40`, boxShadow: `0 0 40px ${teamColor}10` }}
            >
              {standings ? (
                <>
                  <div className='mb-10 flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center'>
                    <div className='flex items-center gap-4'>
                      {team?.logo ? (
                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 p-2'>
                          <img src={team.logo} alt={constructorName} className='max-h-full max-w-full object-contain' onError={(e) => {e.target.style.display='none'}} />
                        </div>
                      ) : (
                        <div
                          className='h-4 w-4 rounded-full'
                          style={{ backgroundColor: teamColor }}
                        />
                      )}
                      <h1 
                        className='text-2xl font-bold capitalize text-white transition-colors duration-300 sm:text-4xl'
                        style={{ '--hover-color': teamColor }}
                        onMouseEnter={(e) => e.target.style.color = teamColor}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                      >
                        {constructorName}
                      </h1>
                    </div>
                    <span className='rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-400 sm:ml-auto'>
                      {year || '-'}
                    </span>
                  </div>

                  <div className='mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8'>
                    {[
                      { label: 'Points', value: standings?.points ?? '-' },
                      { label: 'Position', value: standings?.position ? `P${standings.position}` : '-' },
                      { label: 'Wins', value: standings?.wins ?? '-' },
                    ].map(({ label, value }) => (
                      <div key={label} className='rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 sm:p-8 transition-colors hover:bg-zinc-800'>
                        <p className='mb-3 text-sm text-zinc-500'>{label}</p>
                        <p className='text-4xl font-medium leading-none text-white sm:text-5xl'>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className='flex items-center justify-center gap-2 border-t border-zinc-800 pt-6 text-sm text-zinc-500'>
                    <F1Logo height={12} />
                    <p>
                      Constructors Championship · Season {year}
                    </p>
                  </div>
                </>
              ) : (
                <div className='py-12 text-center text-zinc-400'>
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
