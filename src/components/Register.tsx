import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='register'>
      <h1>Register</h1>
      <input type="text" placeholder='Username' />
      <input type="password" placeholder='Password' />
      <button>Confirm</button>
      <Link to='/login'>Already have an account? connect</Link>
    </div>
    )
}
