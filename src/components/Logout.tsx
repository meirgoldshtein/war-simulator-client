import React from 'react'
import { useAppDispatch } from '../redux/store'
import { logout } from '../redux/slices/userSlice'

export default function Logout() {
    localStorage.removeItem('token')
    const dispatch = useAppDispatch()
    dispatch(logout())
  return (
    
    <div>{
        
    }</div>
  )
}
