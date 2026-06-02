import { Link } from 'react-router'
import { useState, useEffect } from 'react'

const Standings = () => {
  const [year, setYear] = useState('')
  const [raceWinner, setRaceWinner] = useState([])

  useEffect(() => {
    if (!year) {
      setRaceWinner([])
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
    <div className='min-h-screen bg-[#131318] px-6 py-10 text-white'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='mb-2 text-sm uppercase tracking-[0.3em] text-zinc-500'>
              Race Winners Archive
            </p>
            <h1 className='text-3xl font-bold'>Grand Prix Winners</h1>
            <p className='mt-2 max-w-2xl text-sm text-zinc-400'>
              Choose a season to see the winner of each race  
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='rounded-xl border border-zinc-800 bg-[#0a0a0f] px-4 py-3'>
              <label className='mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500'>
                Season Year
              </label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type='number'
                placeholder='2025'
                className='w-36 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none transition focus:border-red-500'
              />
            </div>

            <Link
              to='/'
              className='rounded-md bg-[#e10600] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ff2a24]'
            >
              Back
            </Link>
          </div>
        </div>

        <div className='overflow-hidden rounded-xl border border-zinc-800'>
          <div className='grid grid-cols-[0.7fr_2fr_1.6fr_1.3fr] bg-zinc-900 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400'>
            <p>Round</p>
            <p>Grand Prix</p>
            <p>Winner</p>
            <p>Team</p>
          </div>

          {raceWinner.length > 0 ? (
            raceWinner.map((champ) => (
              <div
                key={champ.round}
                className='grid grid-cols-[0.7fr_2fr_1.6fr_1.3fr] items-center border-t border-zinc-800 bg-[#0a0a0f] px-6 py-4'
              >
                <p className='text-zinc-500'>{champ.round}</p>
                <p className='font-medium text-white'>{champ.raceName}</p>
                <p className='text-zinc-200'>{champ.winner}</p>
                <p className='text-zinc-300'>{champ.team}</p>
              </div>
            ))
          ) : (
            <div className='border-t border-zinc-800 bg-[#0a0a0f] px-6 py-10 text-center text-zinc-500'>
              {year
                ? 'No race winner data available for that season.'
                : 'Enter a season year to load the race winners table.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Standings
