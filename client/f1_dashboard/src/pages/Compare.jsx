import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { DRIVER_SLUGS } from '../data/driverSlugs'
import F1Logo from '../components/F1Logo'

const Compare = () => {
  const { driver1, driver2 } = useParams()
  const [year, setYear] = useState('')
  const [Driver1data, setDriver1data] = useState(null)
  const [Driver2data, setDriver2data] = useState(null)
  

  const slug1 = DRIVER_SLUGS[driver1]
  const slug2 = DRIVER_SLUGS[driver2]

  useEffect(() => {
    //If there are no params passed then useEffect will not Render
    if (!slug1 || !slug2) {
      setError(`No slug found for: ${!slug1 ? driver1 : driver2}`)
      setLoading(false)
      return
    }

    const fetchboth = async () => {
      try {
        //Delivers the data from api through fetching by using Promise() 
        const [res1, res2] = await Promise.all([
          fetch(`https://racinghub.net/api/v1/drivers/${slug1}/seasons`),
          fetch(`https://racinghub.net/api/v1/drivers/${slug2}/seasons`)
        ])
        //passing data in json format to drivers hooks
        const [data1, data2] = await Promise.all([res1.json(), res2.json()])
        setDriver1data(data1)
        setDriver2data(data2)
      } catch (error) {
        //If api fails this block will execute
        setError('Failed to fetch driver data')
        console.error(error)
      } 
    }

    fetchboth()
  }, [slug1, slug2])

  //matching year from the given year(input)
  const driver1_season = Driver1data?.find((y) => y.year === Number(year))
  const driver2_season = Driver2data?.find((y) => y.year === Number(year))


  //Matching years of both drivers to compare in particular season
  const commonYears =
    Driver1data && Driver2data
      ? Driver1data.map((s) => s.year).filter((y) =>
        Driver2data.some((s) => y === s.year)
      )
      : []

 

  return (
    <div className='bg-[#131318] min-h-screen text-white p-6 px-30'>

      <div className='flex justify-between px-12 border border-zinc-800 p-4 rounded-4xl items-center mx-10 bg-black py-6'>
        <Link to={'/drivers'}><F1Logo height={30}/></Link>
        <Link to={'/drivers'} className='bg-[#e10600] p-2 rounded-md'>&larr; Back</Link>
      </div>


      {/* If there is year then this block of code will execute */}
      {commonYears.length > 0 && (
        <div className='mb-7 border border-zinc-800 w-fit px-8 py-6 my-10 rounded-3xl bg-black flex items-center gap-10 mx-10'>
          <span className='mr-2'>Select Year:</span>
          <select
            className='bg-zinc-800 text-white px-3 py-1 rounded'
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            <option value=''> Pick a year </option>
            {commonYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {/* If both drivers have same year and both are true(i.e same years) then this block of code will Execute */}

      {driver1_season && driver2_season && (
        <div className='grid grid-cols-3 gap-4 text-center border border-zinc-700 py-10 rounded-3xl mx-10 bg-black'>
          <div className='font-bold text-red-400'>{driver1}</div>
          <div className='font-bold text-zinc-400'>Stat</div>
          <div className='font-bold text-blue-400'>{driver2}</div>

          <div>{driver1_season.position}</div>
          <div className='text-zinc-400'>Championship Position</div>
          <div>{driver2_season.position}</div>

          <div>{driver1_season.points}</div>
          <div className='text-zinc-400'>Points</div>
          <div>{driver2_season.points}</div>

          <div>{driver1_season.race_wins}</div>
          <div className='text-zinc-400'>Race Wins</div>
          <div>{driver2_season.race_wins}</div>

          <div>{driver1_season.pole_positions}</div>
          <div className='text-zinc-400'>Pole Positions</div>
          <div>{driver2_season.pole_positions}</div>

          <div>{driver1_season.constructors_name.join(', ')}</div>
          <div className='text-zinc-400'>Constructor</div>
          <div>{driver2_season.constructors_name.join(', ')}</div>
        </div>
      )}

      {/* If any of this condition is false then this block of code will Execute */}
      {year && !driver1_season && !driver2_season  && (
        <p className='text-zinc-400'>One or both drivers have no data for {year}.</p>
      )}
    </div>
  )
}

export default Compare