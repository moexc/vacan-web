import { FC, useEffect, useState } from "react";

type Time = {
    days: number
    hours: number
    minutes: number
    seconds: number
}
const initTime = {days: 0, hours: 0, minutes: 0, seconds: 0}

const TimeCountDown: FC<{
    overTime: number
    className: string
}> = ({overTime, className}) => {

    const [time, setTime] = useState<Time>(initTime)

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = overTime - now
            const newVal: Time = initTime
            newVal.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            newVal.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            newVal.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            newVal.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTime(() => ({...newVal}))
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    },[overTime])
    return (
        <div className={className}>
            {time.days > 0 && <span>{time.days}日</span>}
            {time.hours > 0 && <span>{time.hours}时</span>}
            {(time.hours > 0 || time.minutes > 0) && <span>{time.minutes}分</span>}
            {(time.hours > 0 || time.minutes > 0 || time.seconds > 0) && <span>{time.seconds}秒</span>}
        </div>
    )
}

export default TimeCountDown