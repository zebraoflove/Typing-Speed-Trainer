import s from './ResultWindow.module.css'
import ms from './../../App.module.css'
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {
    selectAllLetters,
    selectCorrectLetters,
    selectExtraLetters,
    selectWastedTime,
    selectWrongLetters
} from "../../Redux/resultSelectors";
import {startTest} from "../../Redux/resultReduser";
import {AppDispatchType} from "../../Redux/redux-store";
import reload from '../Common/img/reload.png'
export const ResultWindow = () => {
    const dispatch: AppDispatchType = useDispatch()
    const allLetters = useSelector(selectAllLetters)
    const correctLetters = useSelector(selectCorrectLetters)
    const wrongLetters = useSelector(selectWrongLetters)
    const extraLetters = useSelector(selectExtraLetters)
    let wastedTime = useSelector(selectWastedTime)
    let accuracy = (correctLetters / allLetters * 100).toFixed(1)
    // выставляем точность - 0, при отсутствии введенных символов
    if(allLetters === 0) accuracy = '0'
    // устанавливаем минимально-возможное время прохождения теста - 1 секунда
    if(wastedTime <= 0) wastedTime = 1
    let LPM = correctLetters / wastedTime * 60
    // в среднем английское слово состоит из 5 букв
    const WPM = (LPM / 5).toFixed(1)
    const onAnotherTest = () => {
        dispatch(startTest())
    }
    return (
        <div>
            <div className={s.result}>
                <div className={s.lettersResult}>
                    <div className={s.resultCell}>
                        <div className={s.resultAmount}>{correctLetters}</div>
                        <div className={s.resultDescription}>correct</div>
                    </div>
                    <div className={s.separator}>/</div>
                    <div className={s.resultCell}>
                        <div className={s.resultAmount}>{wrongLetters}</div>
                        <div className={s.resultDescription}>wrong</div>
                    </div>
                    <div className={s.separator}>/</div>
                    <div className={s.resultCell}>
                        <div className={s.resultAmount}>{extraLetters}</div>
                        <div className={s.resultDescription}>extra</div>
                    </div>
                </div>
                <div className={s.speedResult}>
                    <div className={s.resultCell}>
                        <div className={s.resultAmount}>{accuracy}%</div>
                        <div className={s.resultDescription}>accuracy</div>
                    </div>
                    <div className={s.resultCell}>
                        <div className={s.resultAmount}>{WPM}</div>
                        <div className={s.resultDescription}>WPM</div>
                    </div>
                </div>
            </div>
            <img alt='another' src={reload} className={ms.arrowButton} onClick={onAnotherTest}/>
        </div>
    )
}