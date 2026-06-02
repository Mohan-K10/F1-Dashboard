import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'

const DriverDetails = () => {
  const { teamId } = useParams()
  const [teamData, setteamData] = useState(null)
  const [year, setyear] = useState('')

  useEffect(() => {
    if(!year || String(year).length !== 4) return;
    const getTeamHistory = async () => {
      if(!year || !teamId) return;
      const response = await fetch(`${import.meta.env.VITE_URL}/driverdetail/${year}/${teamId}`)
      const data = await response.json()
      setteamData(data)
    }
    

    getTeamHistory()
  }, [teamId, year])

  const standings = teamData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings?.[0]
  const standingsname = teamData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings?.[0].Constructor.name

  return (
    <div className='bg-zinc-900 min-h-screen px-30 py-20'>

      <div className='flex justify-between items-center gap-4 bg-black px-30 p-4 rounded-3xl border border-zinc-700'>
        <div className='flex items-center  gap-10'>

        <span className='text-base text-gray-400'>Enter the Year :</span>
        <input
          className='bg-zinc-900 border border-gray-700 text-white text-base px-5 py-3 rounded-xl focus:outline-none focus:border-red-500 w-44'
          value={year}
          placeholder='e.g. 2024'
          onChange={(e) => setyear(e.target.value)}
          type="number"
          />
      </div>
          <Link to={'/drivers'} className='bg-red-700 text-white p-3 px-4 rounded-md'> &larr; Back</Link>
          </div>
      <div className='flex flex-col items-center justify-center gap-8 p-10 '>
      {String(year).length === 4 ? <>
      
      <div className='bg-black border border-red-900 rounded-3xl p-12 w-full max-w-3xl'>

       {standings ? <>
       
        <div className='flex items-center gap-4 mb-12'>
          <div className='w-4 h-4 rounded-full bg-gray-400 shrink-0' />
          <h1 className='text-4xl font-medium text-white capitalize'>
            {standingsname}
          </h1>
          <span className='ml-auto text-sm px-4 py-1.5 rounded-full border border-gray-700 text-gray-400'>
            {year || '—'}
          </span>
        </div>

      
        <div className='grid grid-cols-3 gap-8 mb-12'>
          {[
            { label: 'Points',   value: standings?.points   ?? '—' },
            { label: 'Position', value: standings?.position ? `P${standings.position}` : '—' },
            { label: 'Wins',     value: standings?.wins     ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className='bg-zinc-900 rounded-2xl p-8'>
              <p className='text-sm text-gray-500 mb-3'>{label}</p>
              <p className='text-5xl font-medium text-white leading-none'>
                {value}
              </p>
            </div>
          ))}
        </div>

        
        <div className='border-t border-gray-800 my-8' />

       
        <p className='text-base text-gray-500'>
          Constructors Championship · {year ? `Season ${year}` : 'Enter a year above'}
        </p>
          </> : <>
          <div className='text-center text-gray-400 py-12'>
    <p className='text-xl font-medium'>No data available</p>
    <p className='mt-2'>
      This team did not participate in the year {`${year}`}
    </p>
  </div></>}

      </div>
              </> : ""}
              </div>
    </div>
  )
}

export default DriverDetails