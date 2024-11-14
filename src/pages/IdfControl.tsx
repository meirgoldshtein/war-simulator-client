import React, { useEffect } from 'react'
import AmmoBar from '../components/AmmoBar'
import TableControl from '../components/TableControl'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import IDFAmmoBar from '../components/IDFAmmoBar'
import IDFTable from '../components/IDFTable'

export default function IdfControl() {
  const role = useAppSelector((state: any) => state.user.role)
  const navigate = useNavigate()
  useEffect(() => {
    if (role === 'TERRORIST') {
      navigate('/terror/control')}
  }, [role])
  return (
    <div className='TerrorControl'>
      <h1>TerrorControl</h1>
      <IDFAmmoBar/>
      <IDFTable/>
    </div>
  )
}
