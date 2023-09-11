import React, { useContext } from 'react';
import { SignUp, Login, Homepage, PlayerDetail } from './pages'  
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './components/AuthContext';

function App() {

  const { username } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
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