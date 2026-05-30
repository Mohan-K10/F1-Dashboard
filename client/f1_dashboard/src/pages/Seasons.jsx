import { useEffect } from 'react'
import { seasons } from '../data/seasondata'
import { useState } from 'react'
const Seasons = () => {
 
  return (
    <div className='min-h-screen bg-[#131318]  px-6 py-10 text-white'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='mb-6 text-2xl font-bold'>Season Winners</h1>

        <div className='overflow-hidden rounded-xl border border-zinc-800'>
          <div className='grid grid-cols-4 bg-zinc-900 px-6 py-4 text-sm font-semibold uppercase text-zinc-400'>
            <p>Year</p>
            <p>Champion</p>
            <p>Team</p>
            <p>Nationality</p>
          </div>

          {seasons.map((season) => (
            <div
              key={season.year}
              className='grid grid-cols-4 border-t border-zinc-800 px-6 py-4 bg-[#0a0a0f]'
            >
              <p>{season.year}</p>
              <p>{season.champion}</p>
              <p>{season.team}</p>
              <p>{season.nationality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Seasons