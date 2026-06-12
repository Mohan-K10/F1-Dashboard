import Navbar from './Navbar'
import Seasons from '../pages/Seasons'


const Dashboard = () => {
  return (
    <div className='min-h-screen bg-[#131318] px-4 py-4 text-white sm:px-6 lg:px-8'>
        <div className='mx-auto min-h-screen w-full max-w-7xl'>
            <Navbar/>
            <Seasons/>
            
        </div>
    </div>
  )
}

export default Dashboard
