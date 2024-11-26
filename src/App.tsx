
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
import Logout from './components/Logout';
import Home from './components/Home';
import { useEffect } from 'react';

const URL = import.meta.env.VITE_SERVER;
export const socket = io(URL || `http://localhost:3000`);

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.emit("authenticate", localStorage.getItem("token") as string);
    socket.on('auth_error', () => {

    })
    socket.on('joined_room', () => {

    })
    socket.on('intercept', (attack: any) => {
      dispatch(updateInterceptFromSocket(attack));
    });
    socket.on('newLaunch', (attack: any) => {
      dispatch(addAttackFromSocket(attack));
    })
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="terror/control" element={<TerrorControl />} />
          <Route path="idf/control" element={<IdfControl />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  )
}

export default App