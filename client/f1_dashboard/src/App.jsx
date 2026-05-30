import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router'
import Drivers from './pages/Drivers'
import DriverPos from './pages/DriverPos'
import Seasons from './pages/Seasons'
import Standings from './pages/Standings'
import DriverDetails from './pages/DriverDetails'
import Navbar from './components/Navbar'

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
        </Routes>
   

      

    </>
  )
}

export default App
