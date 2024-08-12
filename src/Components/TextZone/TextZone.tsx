import React, {useEffect, useState} from "react";
import s from './TextZone.module.css'
import ms from './../../App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {selectActualPhrase, selectAllPhrasesAmount} from "../../Redux/textSelectors";
import {Text} from "./Text/Text";
import {TextArea} from "./TextArea/TextArea";
import {AppDispatchType} from "../../Redux/redux-store";
import {finishTest, nullResult, upLettersAmount} from "../../Redux/resultReduser";
import {getNewPhrase} from "../../Redux/textReduser";
import {Timer} from "../Common/Timer/Timer";
import {selectTimer} from "../../Redux/settingsSelectors";
import {nullText} from "../../Redux/textAreaReduser";
import {selectIsStartTyping} from "../../Redux/textAreaSelectors";
import {selectCurrentLetterStatus} from "../../Redux/resultSelectors";
import round from "../Common/img/reload.png"
export const TextZone: React.FC = () => {
    const dispatch: AppDispatchType = useDispatch()
    const isStartTyping = useSelector(selectIsStartTyping)
    const initialTimer = useSelector(selectTimer)
    const [timer, setTimer] = useState(initialTimer)
    const [time, setTime] = useState(timer)
    const [clickAnotherPhrase, setClickAnotherPhrase] = useState(false)
    const phrasesAmount = useSelector(selectAllPhrasesAmount)
    const phrase = useSelector(selectActualPhrase)
    const currentLetterStatus = useSelector(selectCurrentLetterStatus)
    const text = phrase.text
    // синхронизируем начальное значение таймера
    useEffect(() => {
        setTimer(initialTimer)
    }, [initialTimer])
    // синхронизируем таймер
    useEffect(() => {
        setTime(timer)
    }, [timer])
    // проверяем подошёл ли таймер к концу
    useEffect(() => {
        if(time <= 0) {
            onFinishTest()
        }
    }, [time])
    // зануляем текст и статистику, получаем новую фразу
    useEffect(() => {
        dispatch(nullResult())
        dispatch(nullText())
        dispatch(getNewPhrase(phrase.id, phrasesAmount))
    }, [clickAnotherPhrase])
    const onFinishTest = () => {
        dispatch(upLettersAmount(currentLetterStatus))
        dispatch(finishTest(timer-time))
        dispatch(nullText())
    }
    const onClickAnotherPhrase = () => {
        setTime(initialTimer)
        setClickAnotherPhrase(!clickAnotherPhrase)
    }
    return (
        <div className={s.textZone}>
            <Text text={text} onFinishTest={onFinishTest}/>
            {isStartTyping && time > 0 && <Timer initialTime={time} onChange={setTime} clickAnotherPhrase={clickAnotherPhrase}/>}
            <TextArea clickAnotherPhrase={clickAnotherPhrase}/>
            <img alt='another' src={round} className={ms.arrowButton} onClick={onClickAnotherPhrase}/>
        </div>
    )
}