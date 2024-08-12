import {AppDispatchType, InferActionsTypes} from "./redux-store";
import {wayChangingType} from "../Types/types";

let initialState = {
    currentWordIndex: 0,
    currentLetterIndex: -1,
    currentLetter: '' as string,
    isStartTyping: false
}
type InitialStateType = typeof initialState
export const actions = {
    changeCurrentLetter: (letter: string) => ({type: "TST/TEXT-AREA/CHANGE-CURRENT-LETTER", letter} as const),
    changeCurrentLetterIndex: (way: wayChangingType) => ({type: "TST/TEXT-AREA/CHANGE-CURRENT-LETTER-INDEX", way} as const),
    changeCurrentWordIndex: (way: wayChangingType) => ({type: "TST/TEXT-AREA/CHANGE-CURRENT-WORD-INDEX", way} as const),
    switchIsStartTyping: (isStart: boolean) => ({type: "TST/TEXT-AREA/SWITCH-IS-START-TYPING", isStart} as const)
}
type ActionType = InferActionsTypes<typeof actions>
export const textAreaReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TST/TEXT-AREA/SWITCH-IS-START-TYPING": {
            if(state.isStartTyping !== action.isStart) {
                return {
                    ...state,
                    isStartTyping: action.isStart
                }
            }
            else return state
        }
        case "TST/TEXT-AREA/CHANGE-CURRENT-LETTER": {
            return {
                ...state,
                currentLetter: action.letter
            }
        }
        case "TST/TEXT-AREA/CHANGE-CURRENT-LETTER-INDEX": {
            if(action.way === 'up') {
                return  {
                    ...state,
                    currentLetterIndex: state.currentLetterIndex + 1
                }
            }
            if(action.way === 'down') {
                    return  {
                        ...state,
                        currentLetterIndex: state.currentLetterIndex - 1
                    }
                }
            if(action.way === 'null') {
                return  {
                    ...state,
                    currentLetterIndex: -1
                }
            }
            else return state
        }
        case "TST/TEXT-AREA/CHANGE-CURRENT-WORD-INDEX": {
            if(action.way === 'up') {
                return  {
                    ...state,
                    currentWordIndex: state.currentWordIndex + 1
                }
            }
            if(action.way === 'null') {
                return  {
                    ...state,
                    currentWordIndex: 0
                }
            }
            else return state
        }
        default: {
            return state
        }
    }
}
export const nullText = () => (dispatch: AppDispatchType) => {
    dispatch(actions.changeCurrentLetter(''))
    dispatch(actions.changeCurrentWordIndex('null'))
    dispatch(actions.changeCurrentLetterIndex('null'))
}
export const typeLetter = (actualLetter: string) => (dispatch: AppDispatchType) => {
    dispatch(actions.changeCurrentLetterIndex("up"))
    dispatch(actions.changeCurrentLetter(actualLetter))
}
export const deleteLetter = (actualLetter: string) => (dispatch: AppDispatchType) => {
    dispatch(actions.changeCurrentLetterIndex("down"))
    dispatch(actions.changeCurrentLetter(actualLetter))
}
export const startNewWord = () => (dispatch: AppDispatchType) => {
    dispatch(actions.changeCurrentLetterIndex("null"))
    dispatch(actions.changeCurrentWordIndex("up"))
    dispatch(actions.changeCurrentLetter(''))
}
export const switchIsStartTyping = (isStart: boolean) => (dispatch: AppDispatchType) => {
    dispatch(actions.switchIsStartTyping(isStart))
}