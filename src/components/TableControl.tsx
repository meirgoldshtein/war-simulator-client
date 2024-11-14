import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { fetchAttacks } from '../redux/slices/attackSlice'

export default function TableControl() {
    const attacks = useSelector((state: any) => state.attacks.attacks)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAttacks())
    },[])
  return (
    <div className='TableControl'>
        
        <div className="titles">
            <h2>Rocket</h2>
            <h2>Time To Hit</h2>
            <h2>Status</h2>
        </div>
        <div className="detailes">
            {attacks.map((item: any, index: number) => {
                return (
                    <div className="attack=row" key={index}>
                        <h3>{item.name}</h3>
                        <h3>{item.timeToHit}</h3>
                        <h3>{item.status}</h3>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
