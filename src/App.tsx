import React from 'react'

import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import TerrorControl from './pages/TerrorControl'

function App() {


  return (
    <div className="App">
      <NavBar />
      <div className="body">
      <Routes>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="control" element={<TerrorControl/>} />

      </Routes>
      
      </div>
    </div>
  )
}

export default App
