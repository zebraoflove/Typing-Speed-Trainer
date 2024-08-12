import s from './Settings.module.css'
import ms from './../../App.module.css'
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../Redux/redux-store";
import {actions} from "../../Redux/settingsReduser";
import {selectTimer} from "../../Redux/settingsSelectors";
import {selectIsStartTyping} from "../../Redux/textAreaSelectors";
import {selectIsTestFinished} from "../../Redux/resultSelectors";

export const Settings = () => {
    const dispatch: AppDispatchType = useDispatch()
    const isStartTyping = useSelector(selectIsStartTyping)
    const initialTime = useSelector(selectTimer)
    const isTestFinished = useSelector(selectIsTestFinished)
    const [timer, setTimer] = useState(initialTime)
    const onChangeTimerOn15 = () => {
        setTimer(15)
        dispatch(actions.changeTimer(15))
    }
    const onChangeTimerOn30 = () => {
        setTimer(30)
        dispatch(actions.changeTimer(30))
    }
    const onChangeTimerOn45 = () => {
        setTimer(45)
        dispatch(actions.changeTimer(45))
    }
    const onChangeTimerOn60 = () => {
        setTimer(60)
        dispatch(actions.changeTimer(60))
    }
    return (
        <div className={s.settings}>
            {!isStartTyping && !isTestFinished && <span className={ms.hintBottom} data-hint="set timer">
                <button className={s.timer} disabled={timer === 15} onClick={onChangeTimerOn15}>15</button>
                <button className={s.timer} disabled={timer === 30} onClick={onChangeTimerOn30}>30</button>
                <button className={s.timer} disabled={timer === 45} onClick={onChangeTimerOn45}>45</button>
                <button className={s.timer} disabled={timer === 60} onClick={onChangeTimerOn60}>60</button>
            </span>}
            {isTestFinished && <div className={s.resultsTitle}>RESULTS</div>}
        </div>
    )
}