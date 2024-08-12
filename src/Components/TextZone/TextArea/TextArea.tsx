import React, {ChangeEvent, useEffect, useState} from "react";
import s from './TextArea.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../../Redux/redux-store";
import {deleteLetter, startNewWord, switchIsStartTyping, typeLetter} from "../../../Redux/textAreaReduser";
import {selectCurrentLetterStatus} from "../../../Redux/resultSelectors";
import {downLettersAmount, upLettersAmount} from "../../../Redux/resultReduser";
type TextAreaPropsType = {
    clickAnotherPhrase: boolean
}
export const TextArea: React.FC<TextAreaPropsType> = ({clickAnotherPhrase}) => {
    const [typedText, setTypedText] = useState('')
    const [typedLetter, setTypedLetter] = useState('')
    const dispatch: AppDispatchType = useDispatch()
    const currentLetterStatus = useSelector(selectCurrentLetterStatus)
    // обнуляем textarea при смене фразы
    useEffect(() => {
        setTypedText('')
        setTypedLetter('')
        dispatch(switchIsStartTyping(false))
    }, [clickAnotherPhrase])
    const typeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let actualText = e.currentTarget.value
        let actualTypedTextLength = actualText.length
        let actualLetter = actualText[actualTypedTextLength - 1]
        // условие начала печати: было - 0 символов, стало - 1
        if(actualTypedTextLength === 1 && typedText === '') dispatch(switchIsStartTyping(true))
        // удалили символ
        if(actualTypedTextLength < typedText.length) {
            // не позволяем вернуться к предыдущему слову
            if(typedLetter !== ' ') {
                setTypedText(actualText)
                setTypedLetter(actualLetter)
                dispatch(deleteLetter(actualLetter))
                dispatch(downLettersAmount(currentLetterStatus))
            }
        }
        else {
            // напечатали символ
            if(actualLetter !== ' ') {
                setTypedText(actualText)
                setTypedLetter(actualLetter)
                dispatch(typeLetter(actualLetter))
                dispatch(upLettersAmount(currentLetterStatus))
            }
            // начали новое слово
            else if(typedLetter !== ' ') {
                setTypedText(actualText)
                setTypedLetter(actualLetter)
                dispatch(startNewWord())
            }
        }
    }
    return (
        <textarea placeholder="..." autoFocus onChange={typeText} className={s.textArea} value={typedText}></textarea>
    )
}