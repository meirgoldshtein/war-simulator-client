import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchAttacks } from '../redux/slices/attackSlice';
import { CountdownTimer } from './Timer';
interface Attack {
    rocket: string;
    timeToHit: number;
    launchTime: string;
    status: string;
    _id: string
}
export default function IDFTable() {
  
    const attacks = useSelector((state: any) => state.attacks)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAttacks())
        const refreshInterval = setInterval(() => {
            dispatch(fetchAttacks())
        }, 30000);

        return () => clearInterval(refreshInterval);
    }, []);

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
                        <h3>{item.status}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
