import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { fetchAttacks, updateAttack } from '../redux/slices/attackSlice'
interface CountdownProps {
    initialMinutes: number;
    launchTime: string;
    status: string;
    id: string
}

export function CountdownTimer({ initialMinutes, launchTime, status ,id }: CountdownProps) {
    const calculateInitialTimeLeft = () => {
        const launchDateTime = new Date(launchTime);
        const now = new Date();
        const elapsedMinutes = (now.getTime() - launchDateTime.getTime()) / (1000 * 60);
        const remainingMinutes = initialMinutes - elapsedMinutes;
        
        if (remainingMinutes <= 0) return 0;
        
        return Math.floor(remainingMinutes * 60);
    };

    const [timeLeft, setTimeLeft] = useState<number>(calculateInitialTimeLeft());
const dispatch = useAppDispatch()
    useEffect(() => {
        if (status !== 'LAUNCHED') return;

        setTimeLeft(calculateInitialTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    dispatch(updateAttack({id, status:'HIT'}))
                    dispatch(fetchAttacks())
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [status, initialMinutes, launchTime]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <h3 >
            {timeLeft === 0 ? "0m" : `${minutes}:${seconds.toString().padStart(2, '0')}`}
        </h3>
    );
}