import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Users from './content/Users'
import Subscription from './content/Subscription'
import Dashbord from './content/Dashbord'
import Loan from './content/Loan'
import View from './content/View'
import Saving from './content/Saving'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/membres" element={<Users />} />
        <Route path="/souscriptions" element={<Subscription />} />
        <Route path="/prets" element={<Loan />} />
        <Route path="/epargne" element={<Saving />} />
        <Route path="membres/view/:id" element={<View />} />
    </Routes>
  )
}

export default Router
