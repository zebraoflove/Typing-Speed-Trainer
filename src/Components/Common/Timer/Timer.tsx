import React, {useEffect, useState} from "react";
import s from "./Timer.module.css"
type TimerProps = {
    initialTime: number
    onChange: (actualTime: number) => void
    clickAnotherPhrase: boolean
}
export const Timer: React.FC<TimerProps> = (props) => {
    const [time, setTime] = useState(props.initialTime)
    // синхронизируем начальное значение таймера
    useEffect(() => {
        setTime(props.initialTime)
    }, [props.initialTime])
    // синхронизируем таймер
    useEffect(() => {
        props.onChange(time)
    }, [time])
    //
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000)
        return () => {
            clearInterval(intervalID)
        }
    }, [props.clickAnotherPhrase])
    return (
        <div className={s.timer}>{time}</div>
    )
}