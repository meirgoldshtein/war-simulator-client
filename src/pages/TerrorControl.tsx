import React, { useEffect } from 'react'
import AmmoBar from '../components/AmmoBar'
import TableControl from '../components/TableControl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function TerrorControl() {
  const role = useSelector((state: any) => state.user.role)
  const navigate = useNavigate()
  useEffect(() => {
    if (role === 'IDF') {
      console.log("navigate to idf control")
      navigate('/idf/control')}
  }, [role])
  console.log(role)
  return (
    <div className='TerrorControl'>
      <h1>TerrorControl</h1>
      <AmmoBar/>
      <TableControl/>
    </div>
  )
}
