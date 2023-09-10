import React, { useState, useEffect } from 'react'
import { SignUp, Login, Homepage, PlayerDetail } from './pages'  
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <div>
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<Login />} />
      <Route path={'/homepage'} element={ <Homepage />} />
      <Route path="/players/:playerId" element={<PlayerDetail />} />
    </Routes>
  </div>
  )
}

export default App