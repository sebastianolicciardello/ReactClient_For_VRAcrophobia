import React, { useState, useEffect } from 'react'
import { SignUp, Login, Homepage, PlayerDetail } from './pages'  
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  const [backendData, setBackendData] = useState([{}])
  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  // useEffect to avoid to lose token on refresh 
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

    // token? to avoid to access the page without token
  return (
    <div>
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<Login setToken={setToken}/>} />
      <Route path={'/homepage'} element={ <Homepage />} />
      <Route path="/players/:playerId" element={<PlayerDetail />} />
    </Routes>
  </div>
  )
}

export default App