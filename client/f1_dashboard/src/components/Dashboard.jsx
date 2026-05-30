import Navbar from './Navbar'
import Seasons from '../pages/Seasons'


const Dashboard = () => {
  return (
    <div className='bg-[#131318] min-h-screen flex justify-center items-center'>
        <div className='min-h-screen w-[90vw] mx-auto rounded-md '>
            <Navbar/>
            <Seasons/>
            
        </div>
    </div>
  )
}

export default Dashboard