import React, { useEffect } from 'react'
import io from 'socket.io-client';
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import TerrorControl from './pages/TerrorControl'
import { useAppDispatch } from './redux/store'
import { addAttackFromSocket, updateInterceptFromSocket } from './redux/slices/attackSlice'
import IdfControl from './pages/IdfControl';

export const socket = io('http://localhost:3000');

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.emit("authenticate", localStorage.getItem("token") as string);
    socket.on('auth_error', (messege: any) => {
      console.log(messege)
    })
    socket.on('joined_room', (room: any) => {
      console.log(`Joined room ${room}`)
    })
    socket.on('intercept', (attack: any) => {
      dispatch(updateInterceptFromSocket(attack));
    });
    socket.on('newLaunch', (attack: any) => {
      console.log("from socket", attack)
      dispatch(addAttackFromSocket(attack));
    })
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="body">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="terror/control" element={<TerrorControl />} />
          <Route path="idf/control" element={<IdfControl />} />
        </Routes>
      </div>
    </div>
  )
}

export default App