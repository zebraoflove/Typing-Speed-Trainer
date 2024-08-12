import React from "react";
import s from './Text.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    selectTextAreaLetter,
    selectTextAreaLetterIndex,
    selectTextAreaWordIndex
} from "../../../Redux/textAreaSelectors";
import {AppDispatchType} from "../../../Redux/redux-store";
import {actions} from "../../../Redux/resultReduser";
type WordConditionType = "active" | "notActive" | "last"
type LetterConditionType = "unused" | "correct" | "wrong"
type TextPropsType = {
    text: string
    onFinishTest: () => void
}
const space = " "
export const Text: React.FC<TextPropsType> = React.memo(({text, onFinishTest}) => {
    // разбиваем текст на слова
    let words = text.split(space)
    const wordsAmount = words.length
    return (
        <text className={s.text}>
            {words.map((w, index) => <Word key={index} word={w} wIndex={index} wordsAmount={wordsAmount} onFinishTest={onFinishTest}/>)}
        </text>
    )
})
type WordPropsType = {
    word: string
    wIndex: number
    wordsAmount: number
    onFinishTest: () => void
}
const Word: React.FC<WordPropsType> = React.memo(({word, wIndex, wordsAmount, onFinishTest}) => {
    const TAWordIndex = useSelector(selectTextAreaWordIndex)
    // разбиваем слово на буквы
    const letters = word.split('')
    const lettersAmount = letters.length
    // определяем тип слова
    let wCondition: WordConditionType = "notActive"
    // проверка на достижение конца текста
    if(wordsAmount - 1 === wIndex && TAWordIndex > wIndex) {
        onFinishTest()
    }
    if(wordsAmount - 1 === wIndex && TAWordIndex === wIndex) {
        wCondition = 'last'
    } else {
        if(TAWordIndex === wIndex) {
            wCondition = "active"
        }
        else wCondition = "notActive"
    }
    return (
        <text>
            {letters.map((l, index) => <Letter key={index} letter={l} lIndex={index} wCondition={wCondition} lettersAmount={lettersAmount} onFinishTest={onFinishTest}/>)}
            {space}
        </text>
    )
})
type LetterPropsType = {
    letter: string
    lIndex: number
    wCondition: WordConditionType
    lettersAmount: number
    onFinishTest: () => void
}
const Letter: React.FC<LetterPropsType> = React.memo(({letter, lIndex, wCondition, lettersAmount, onFinishTest}) => {
    const dispatch: AppDispatchType = useDispatch()
    const TALetterIndex = useSelector(selectTextAreaLetterIndex)
    const TALetter = useSelector(selectTextAreaLetter)
    // определяем тип буквы
    let letterCondition: LetterConditionType = "unused"
    if (wCondition !== 'notActive') {
        if(TALetterIndex >= lettersAmount) {
            dispatch(actions.changeCurrentLetterStatus('extra'))
        }
        if(TALetter !== '' && TALetterIndex === lIndex) {
            if(letter === TALetter) {
                letterCondition = 'correct'
                dispatch(actions.changeCurrentLetterStatus('correct'))
            }
            else {
                letterCondition = 'wrong'
                dispatch(actions.changeCurrentLetterStatus('wrong'))
            }
        }
    }
    // проверка на достижение конца текста
    if (wCondition === 'last' && letterCondition !== 'unused' && lIndex === lettersAmount - 1) {
        onFinishTest()
    }
    return (
        <text className={letterCondition !== 'unused' ? (letterCondition === 'correct' ? s.correct : s.wrong) : s.unused}>{letter}</text>
    )
})