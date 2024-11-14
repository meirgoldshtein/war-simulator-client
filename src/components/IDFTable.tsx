import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchAttacks, launchDefense } from '../redux/slices/attackSlice';
import { CountdownTimer } from './Timer';
interface Attack {
    rocket: string;
    timeToHit: number;
    launchTime: string;
    status: string;
    _id: string
}
interface IDFTableProps {
    ammoName: string
}
export default function IDFTable(ammoInfo: IDFTableProps) {
  
    const attacks = useSelector((state: any) => state.attacks)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAttacks())
        const refreshInterval = setInterval(() => {
            dispatch(fetchAttacks())
        }, 500);

        return () => clearInterval(refreshInterval);
    }, []);

    const [target, setTarget] = useState('')
    const lounchBtn = async () => {
        await dispatch(launchDefense({ammo_id:target, DefName:ammoInfo.ammoName}))
        dispatch(fetchAttacks())

    }

    return (
        <div className='TableControl'>
            <div className="titles">
                <h2>Rocket</h2>
                <h2>Time To Hit</h2>
                <h2>Status</h2>
            </div>
            <div className="detailes">
                {attacks.attacks?.map((item: Attack, index: number) => (
                    <div className="attack-row" key={index}>
                        <h3>{item.rocket}</h3>
                        {item.status === 'LAUNCHED' ? (
                            <CountdownTimer 
                                initialMinutes={item.timeToHit} 
                                launchTime={item.launchTime}
                                status={item.status}
                                id={item._id}
                            />
                        ) : (
                            <h3>{"0m"}</h3>
                        )}
                        {
                            item.status === 'LAUNCHED' ? (
                                <button onClick={
                                    () =>{setTarget(item._id)
                                        lounchBtn()
                                    }}>יירט</button>
                            ) : (
                                <h3>{item.status}</h3>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}
