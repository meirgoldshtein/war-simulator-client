import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { fetchAttacks } from '../redux/slices/attackSlice'
import IDFTable from './IDFTable'

export default function IDFAmmoBar() {
    const user = useSelector((state: any) => state.user.user)

    const dispatch = useAppDispatch()
    const [ammo, setAmmo] = useState('')

    return (
        <>
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

                <div className="launch">
                    <p>{ammo ? ammo : "plese select an ammo"}</p>
                    
                </div>
            </div>

        </div>
        <IDFTable ammoName={ ammo}/>
        </>

    )
}
