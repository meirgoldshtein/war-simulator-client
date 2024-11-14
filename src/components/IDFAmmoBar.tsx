import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { fetchAttacks } from '../redux/slices/attackSlice'

export default function IDFAmmoBar() {
    const user = useSelector((state: any) => state.user.user)

    const dispatch = useAppDispatch()
    const [ammo, setAmmo] = useState('')
    const lounchBtn = async () => {
        // await dispatch(launchDefense({name:ammo, location}))
        dispatch(fetchAttacks())
        console.log("intercepted")
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

                <div className="launch">
                    <p>{ammo ? ammo : "plese select an ammo"}</p>
                    <button className='launchBtn' onClick={async () => await lounchBtn()}>יירט</button>
                </div>
            </div>

        </div>
    )
}
