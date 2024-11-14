import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  const user = useSelector((state: any) => state.user.user)
  return (
    <div className='nav-container'>
      
        <NavLink to='/' className='nav-item'>Home</NavLink>
        {!user && <NavLink to='/login' className='nav-item'>Login</NavLink>}
        {user && <NavLink to='/logout' className='nav-item'>Logout</NavLink>}
        <NavLink to='/register' className='nav-item'>Register</NavLink>
        <NavLink to='/idf/control' className='nav-item'>Control Bar</NavLink>
        <NavLink to='/store' className='nav-item'>Store</NavLink>
    </div>
  )
}
