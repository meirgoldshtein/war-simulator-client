import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { fetchAttacks, launchAttack } from '../redux/slices/attackSlice'

export default function AmmoBar() {
    const user = useSelector((state: any) => state.user.user)

    const dispatch = useAppDispatch()
    const [location, setLocation] = useState('North')
    const [ammo, setAmmo] = useState('')
    const lounchBtn = async () => {
        await dispatch(launchAttack({name:ammo, location}))
        dispatch(fetchAttacks())
        console.log("lounched")
    }
    return (
        <div className='AmmoBar'>
            <h3>Available Ammo</h3>
            <h3>{user?.organization}</h3>

            <div className="cards">
                {user?.resources?.map((item: any, index: number) => {
                    return (
                        <div className="ammo-card" key={index} onClick={() => setAmmo(item.name)}>
                            <h3>{item.name}</h3>
                            <p>amount: {item.amount}</p>
                        </div>
                    )
                })}
                <select name="" id="" onChange={(e) => setLocation(e.target.value)}>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="West Bank">West Bank</option>
                    <option value="Center">Center</option>
                </select>
                <div className="launch">
                    <p>{ammo ? ammo : "plese select an ammo"}</p>
                    <button className='launchBtn' onClick={async () => await lounchBtn()}>Launch To : {location}</button>
                </div>
            </div>

        </div>
    )
}
