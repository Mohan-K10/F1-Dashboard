import { Link } from 'react-router'
import { useState, useEffect } from 'react'

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

const getTeamData = (teamName) => {
  if (!teamName) return { color: '#71717a', logo: '' }
  const teamKey = Object.keys(teamInfo).find(k => teamName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(teamName.toLowerCase()))
  return teamKey ? teamInfo[teamKey] : { color: '#71717a', logo: '' }
}

const Standings = () => {
  const [year, setYear] = useState('')
  const [raceWinner, setRaceWinner] = useState([])
  const displayRaceWinner = year ? raceWinner : []

  useEffect(() => {
    if (!year) {
      return
    }

    const winners = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/racewinner/${year}`)
        const data = await response.json()

        if (Array.isArray(data)) {
          setRaceWinner(data)
        } else {
          setRaceWinner([])
        }
      } catch (error) {
        console.log('Failed to fetch winners api', error)
      }
    }

    winners()
  }, [year])

  return (
    <div className='min-h-screen bg-black px-4 py-6 text-white sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#e10600]'>
              Race Winners Archive
            </p>
            <h1 className='text-4xl font-black tracking-wide'>Grand Prix Winners</h1>
            <p className='mt-2 max-w-2xl text-sm font-medium text-zinc-400'>
              Choose a season to see the winner of each race  
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='rounded-2xl border border-zinc-800 bg-[#0a0a0f] px-5 py-3 shadow-lg'>
              <label className='mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500'>
                Season Year
              </label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value === '' ? '' : Number(e.target.value))}
                type='number'
                placeholder='e.g. 2024'
                className='w-40 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-white outline-none transition focus:border-[#e10600]'
              />
            </div>

            <Link
              to='/'
              className='rounded-full bg-[#e10600] px-6 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-[#c90500] sm:py-3 shadow-lg'
            >
              Back
            </Link>
          </div>
        </div>

        <div className='overflow-hidden rounded-3xl border border-zinc-800/50 bg-black/40 backdrop-blur-md shadow-2xl shadow-[#e10600]/5'>
          <div className='min-w-[720px]'>
            <div className='grid grid-cols-[0.7fr_2fr_1.6fr_1.3fr] gap-4 bg-zinc-900/80 px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-500 sm:px-8'>
              <p>Round</p>
              <p>Grand Prix</p>
              <p>Winner</p>
              <p>Team</p>
            </div>

          <div className='flex flex-col'>
          {displayRaceWinner.length > 0 ? (
            displayRaceWinner.map((champ) => {
              const team = getTeamData(champ.team);
              return (
                <div
                  key={champ.round}
                  className='group grid grid-cols-[0.7fr_2fr_1.6fr_1.3fr] items-center gap-4 border-t border-zinc-800/50 bg-transparent px-6 py-4 transition-colors hover:bg-[var(--team-color)] sm:px-8'
                  style={{ '--team-color': team.color }}
                >
                  <p className='font-mono text-lg font-bold text-zinc-500 transition-colors group-hover:text-white/90 group-hover:drop-shadow-md'>{champ.round}</p>
                  <p className='text-lg font-semibold text-white transition-colors group-hover:drop-shadow-md'>{champ.raceName}</p>
                  <p className='text-base font-medium text-zinc-300 transition-colors group-hover:text-white group-hover:drop-shadow-md'>{champ.winner}</p>
                  <div className='flex items-center gap-3'>
                    {team.logo ? (
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 p-1.5 transition-transform group-hover:scale-110 group-hover:bg-white/20 shadow-sm'>
                        <img src={team.logo} alt={champ.team} className='max-h-full max-w-full object-contain' onError={(e) => {e.target.style.display='none'}} />
                      </div>
                    ) : (
                      <div className='h-10 w-10 shrink-0 rounded-full bg-white/10 group-hover:bg-white/20' />
                    )}
                    <p className='font-bold tracking-wide transition-colors group-hover:!text-white group-hover:drop-shadow-md' style={{ color: team.color }}>{champ.team}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='border-t border-zinc-800/50 bg-transparent px-6 py-12 text-center text-zinc-500'>
              <p className='text-lg'>
              {year
                ? 'No race winner data available for that season.'
                : 'Enter a season year to load the race winners table.'}
              </p>
            </div>
          )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Standings
