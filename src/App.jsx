import { useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'
import Dashbord from './content/Dashbord'

function App() {

  return (
    <>
      <Sidebar />
      <Navbar />
      <Dashbord />
    </>
  )
}

export default App
