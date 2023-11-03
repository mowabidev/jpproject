import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Users from './content/Users'
import Subscription from './content/Subscription'
import Dashbord from './content/Dashbord'
import Loan from './content/Loan'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/membres" element={<Users />} />
        <Route path="/souscriptions" element={<Subscription />} />
        <Route path="/prets" element={<Loan />} />
    </Routes>
  )
}

export default Router
