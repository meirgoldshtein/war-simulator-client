import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='nav-container'>
      
        <NavLink to='/' className='nav-item'>Home</NavLink>
        <NavLink to='/login' className='nav-item'>Login</NavLink>
        <NavLink to='/register' className='nav-item'>Register</NavLink>
        <NavLink to='/control' className='nav-item'>Control Bar</NavLink>
        <NavLink to='/store' className='nav-item'>Store</NavLink>
    </div>
  )
}
