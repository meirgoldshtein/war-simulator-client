import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text" placeholder='Username' />
      <input type="password" placeholder='Password' />
      <button>Confirm</button>
      <Link to='/register'>Don't have an account? register</Link>
    </div>
  )
}
