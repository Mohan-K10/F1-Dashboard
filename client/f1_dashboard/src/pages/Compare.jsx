import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { DRIVER_SLUGS } from '../data/driverSlugs'
import F1Logo from '../components/F1Logo'

const Compare = () => {
  const { driver1, driver2 } = useParams()
  const [year, setYear] = useState('')
  const [driver1Data, setDriver1Data] = useState(null)
  const [driver2Data, setDriver2Data] = useState(null)

  const slug1 = DRIVER_SLUGS[driver1]
  const slug2 = DRIVER_SLUGS[driver2]

  useEffect(() => {
    if (!slug1 || !slug2) {
      return
    }

    const fetchBoth = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`https://racinghub.net/api/v1/drivers/${slug1}/seasons`),
          fetch(`https://racinghub.net/api/v1/drivers/${slug2}/seasons`),
        ])
        const [data1, data2] = await Promise.all([res1.json(), res2.json()])
        setDriver1Data(data1)
        setDriver2Data(data2)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBoth()
  }, [slug1, slug2])

  const driver1Season = driver1Data?.find((season) => season.year === Number(year))
  const driver2Season = driver2Data?.find((season) => season.year === Number(year))

  const commonYears =
    driver1Data && driver2Data
      ? driver1Data.map((season) => season.year).filter((seasonYear) =>
          driver2Data.some((season) => seasonYear === season.year)
        )
      : []

  return (
    <div className='min-h-screen bg-[#131318] px-4 py-6 text-white sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-black px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
          <Link to={'/drivers'} className='w-fit'>
            <F1Logo height={30} />
          </Link>
          <Link to={'/drivers'} className='inline-flex w-fit items-center rounded-md bg-[#e10600] px-4 py-2 text-sm font-medium'>
            Back
          </Link>
        </div>

        {commonYears.length > 0 && (
          <div className='my-6 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-black px-4 py-4 sm:my-10 sm:flex-row sm:items-center sm:gap-6 sm:px-6'>
            <span className='text-sm sm:text-base'>Select Year:</span>
            <select
              className='w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white sm:w-auto'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value=''>Pick a year</option>
              {commonYears.map((seasonYear) => (
                <option key={seasonYear} value={seasonYear}>
                  {seasonYear}
                </option>
              ))}
            </select>
          </div>
        )}

        {driver1Season && driver2Season && (
          <div className='grid grid-cols-1 gap-4 rounded-3xl border border-zinc-700 bg-black p-4 text-center sm:p-6 md:grid-cols-3'>
            <div className='font-bold text-red-400'>{driver1}</div>
            <div className='font-bold text-zinc-400'>Stat</div>
            <div className='font-bold text-blue-400'>{driver2}</div>

            <div>{driver1Season.position}</div>
            <div className='text-zinc-400'>Championship Position</div>
            <div>{driver2Season.position}</div>

            <div>{driver1Season.points}</div>
            <div className='text-zinc-400'>Points</div>
            <div>{driver2Season.points}</div>

            <div>{driver1Season.race_wins}</div>
            <div className='text-zinc-400'>Race Wins</div>
            <div>{driver2Season.race_wins}</div>

            <div>{driver1Season.pole_positions}</div>
            <div className='text-zinc-400'>Pole Positions</div>
            <div>{driver2Season.pole_positions}</div>

            <div>{driver1Season.constructors_name.join(', ')}</div>
            <div className='text-zinc-400'>Constructor</div>
            <div>{driver2Season.constructors_name.join(', ')}</div>
          </div>
        )}

        {year && !driver1Season && !driver2Season && (
          <p className='text-zinc-400'>One or both drivers have no data for {year}.</p>
        )}
      </div>
    </div>
  )
}

export default Compare
