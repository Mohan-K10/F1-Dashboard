import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
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
    <div className='bg-[#131318] min-h-screen text-white px-6'>

      
      <div className='flex justify-between px-20 pt-6  items-center'>
        <span className='mb-6 text-xl font-semibold items-center gap-3 flex'>
          <Link to={'/'}><F1Logo height={30} /></Link>
          <p>Constructor Standings</p>
        </span>
        <Link to={'/'} className='bg-[#e10600] h-fit p-2 px-4 mb-6 rounded-md'>Back</Link>
      </div>

      
      <div className='flex flex-col items-center gap-2 mt-10'>
        <p className='text-zinc-500 text-xs uppercase tracking-widest'>Select a Season</p>
        <div className='flex gap-6 items-center w-fit mx-auto bg-black border border-zinc-800 p-4 px-8 rounded-2xl'>
          <span className='font-semibold text-base'>Enter Year:</span>
          <input
            className='border border-zinc-700 p-2 px-4 bg-zinc-900 rounded-md text-base w-40 focus:outline-none focus:border-[#e8192c]/60'
            value={year}
            placeholder='e.g. 2024'
            onChange={(e) => setyear(Number(e.target.value))}
            type="number"
          />
        </div>
      </div>

     
      <div className='flex flex-col items-center gap-6 py-10'>
        {String(year).length === 4 && (
          <div
            className='bg-zinc-900 border rounded-2xl w-full max-w-2xl p-10'
            style={{ borderColor: `${teamColor}40` }}
          >
            
            <div className='flex items-center justify-between border-b border-zinc-700 pb-6 mb-8'>
              <div className='flex items-center gap-3'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: teamColor }}
                />
                <h1 className='text-2xl font-semibold capitalize'>
                  {standings?.Constructor?.name}
                </h1>
              </div>
              <span className='text-sm text-zinc-400 border border-zinc-700 px-3 py-1 rounded-md'>
                {year || '—'}
              </span>
            </div>

          
            <div className='grid grid-cols-3 gap-4 mb-8'>
              {[
                { label: 'Points', value: standings?.points ?? '—' },
                { label: 'Position', value: standings?.position ? `P${standings.position}` : '—' },
                { label: 'Wins', value: standings?.wins ?? '—' },
              ].map(({ label, value }) => (
                <div key={label} className='bg-zinc-800 border border-zinc-700 rounded-xl p-6'>
                  <p className='text-sm text-zinc-500 mb-2'>{label}</p>
                  <p className='text-4xl font-semibold text-white leading-none'>{value}</p>
                </div>
              ))}
            </div>

          
            <p className='text-sm text-zinc-500 border-t border-zinc-700 pt-6'>
              Constructors Championship · {year ? `Season ${year}` : 'Enter a year above'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriverDetails