import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router'
import Drivers from './pages/Drivers'
import DriverPos from './pages/DriverPos'
import Seasons from './pages/Seasons'
import Standings from './pages/Standings'
import DriverDetails from './pages/DriverDetails'
import Compare from './pages/Compare'

function App() {


  return (
    <>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/drivers' element={<Drivers />} />
          <Route path='/positions' element={<DriverPos />} />
          <Route path='/seasons' element={<Seasons />} />
          <Route path='/standings' element={<Standings />} />
          <Route path='/driverdetails/:teamId' element={<DriverDetails/>}/>
          <Route path='/compare/:driver1/:driver2' element={<Compare/>}/>
        </Routes>
   

      

    </>
  )
}

export default App
