import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { fetchLogin } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigat = useNavigate()
    const user = useSelector((state: any) => state.user)
    const dispatch = useAppDispatch()
    const confirnLogin = () => {
        dispatch(fetchLogin({ username, password }))
    }
    useEffect(() => {
      console.log(user)
      if(user.user){
        navigat('/idf/control')
      }
    },[user])
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={confirnLogin}>Confirm</button>
      <Link to='/register'>Don't have an account? register</Link>
    </div>
  )
}
