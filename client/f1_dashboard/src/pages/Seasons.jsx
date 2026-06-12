import { seasons } from '../data/seasondata'
const Seasons = () => {
 
  return (
    <div className='min-h-screen bg-[#131318] px-0 py-6 text-white sm:px-0 sm:py-8'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='mb-6 px-4 text-2xl font-bold sm:px-6'>Season Winners</h1>

        <div className='overflow-hidden border-y border-zinc-800 sm:rounded-xl sm:border'>
          <div className='grid grid-cols-1 gap-2 bg-zinc-900 px-4 py-4 text-sm font-semibold uppercase text-zinc-400 sm:grid-cols-4 sm:gap-0 sm:px-6'>
            <p>Year</p>
            <p>Champion</p>
            <p>Team</p>
            <p>Nationality</p>
          </div>

          {seasons.map((season) => (
            <div
              key={season.year}
              className='grid grid-cols-1 gap-2 border-t border-zinc-800 bg-[#0a0a0f] px-4 py-4 sm:grid-cols-4 sm:gap-0 sm:px-6'
            >
              <p className='text-zinc-500 sm:text-zinc-200'>{season.year}</p>
              <p className='font-medium sm:font-normal'>{season.champion}</p>
              <p className='text-zinc-300'>{season.team}</p>
              <p className='text-zinc-300'>{season.nationality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Seasons
