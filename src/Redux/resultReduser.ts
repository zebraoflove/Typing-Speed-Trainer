import {AppDispatchType, InferActionsTypes} from "./redux-store";
import {letterStatus, wayChangingType} from "../Types/types";
let initialState = {
    allLetters: 0,
    correctLetters: 0,
    wrongLetters: 0,
    extraLetters: 0,
    currentLetterStatus: 'null' as letterStatus,
    isTestFinished: false,
    wastedTime: 0
}
type InitialStateType = typeof initialState
export const actions = {
    changeWastedTime: (wastedTime: number) => ({type: "TST/RESULT/CHANGE-WASTED-TIME", wastedTime} as const),
    switchIsTestFinished: (isTestFinished: boolean) => ({type: "TST/RESULT/SWITCH-IS-TEST-FINISHED", isTestFinished} as const),
    changeAllLetters: (way: wayChangingType) => ({type: "TST/RESULT/CHANGE-ALL-LETTERS", way} as const),
    changeCorrectLetters: (way: wayChangingType) => ({type: "TST/RESULT/CHANGE-CORRECT-LETTERS", way} as const),
    changeWrongLetters: (way: wayChangingType) => ({type: "TST/RESULT/CHANGE-WRONG-LETTERS", way} as const),
    changeExtraLetters: (way: wayChangingType) => ({type: "TST/RESULT/CHANGE-EXTRA-LETTERS", way} as const),
    changeCurrentLetterStatus: (currentLetterStatus: letterStatus) => ({type: "TST/RESULT/CHANGE-CURRENT-LETTER-STATUS", currentLetterStatus} as const)
}
type ActionType = InferActionsTypes<typeof actions>
export const resultReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TST/RESULT/CHANGE-WASTED-TIME": {
            return {
                ...state,
                wastedTime: action.wastedTime
            }
        }
        case "TST/RESULT/CHANGE-CURRENT-LETTER-STATUS": {
            return {
                ...state,
                currentLetterStatus: action.currentLetterStatus
            }
        }
        case "TST/RESULT/SWITCH-IS-TEST-FINISHED": {
            return {
                ...state,
                isTestFinished: action.isTestFinished
            }
        }
        case "TST/RESULT/CHANGE-ALL-LETTERS": {
            switch (action.way) {
                case "down": {
                    return  {
                        ...state,
                        allLetters: state.allLetters - 1
                    }
                }
                case "up": {
                    return  {
                        ...state,
                        allLetters: state.allLetters + 1
                    }
                }
                case "null": {
                    return  {
                        ...state,
                        allLetters: 0
                    }
                }
                default: return state
            }
        }
        case "TST/RESULT/CHANGE-CORRECT-LETTERS": {
            switch (action.way) {
                case "down": {
                    return  {
                        ...state,
                        correctLetters: state.correctLetters - 1
                    }
                }
                case "up": {
                    return  {
                        ...state,
                        correctLetters: state.correctLetters + 1
                    }
                }
                case "null": {
                    return  {
                        ...state,
                        correctLetters: 0
                    }
                }
                default: return state
            }
        }
        case "TST/RESULT/CHANGE-WRONG-LETTERS": {
            switch (action.way) {
                case "down": {
                    return  {
                        ...state,
                        wrongLetters: state.wrongLetters - 1
                    }
                }
                case "up": {
                    return  {
                        ...state,
                        wrongLetters: state.wrongLetters + 1
                    }
                }
                case "null": {
                    return  {
                        ...state,
                        wrongLetters: 0
                    }
                }
                default: return state
            }
        }
        case "TST/RESULT/CHANGE-EXTRA-LETTERS": {
            switch (action.way) {
                case "down": {
                    return  {
                        ...state,
                        extraLetters: state.extraLetters - 1
                    }
                }
                case "up": {
                    return  {
                        ...state,
                        extraLetters: state.extraLetters + 1
                    }
                }
                case "null": {
                    return  {
                        ...state,
                        extraLetters: 0
                    }
                }
                default: return state
            }
        }
        default: {
            return state
        }
    }
}
export const nullResult = () => (dispatch: AppDispatchType) => {
    dispatch(actions.changeAllLetters('null'))
    dispatch(actions.changeCorrectLetters('null'))
    dispatch(actions.changeWrongLetters('null'))
    dispatch(actions.changeExtraLetters('null'))
}
export const startTest = () => (dispatch: AppDispatchType) => {
    dispatch(nullResult())
    dispatch(actions.switchIsTestFinished(false))
}
export const finishTest = (wastedTime: number) => (dispatch: AppDispatchType) => {
    dispatch(actions.changeWastedTime(wastedTime))
    dispatch(actions.switchIsTestFinished(true))
}
export const upLettersAmount = (letterStatus: letterStatus) => (dispatch: AppDispatchType) => {
    switch (letterStatus) {
        case "correct": {
            dispatch(actions.changeAllLetters('up'))
            dispatch(actions.changeCorrectLetters('up'))
            break
        }
        case "wrong": {
            dispatch(actions.changeAllLetters('up'))
            dispatch(actions.changeWrongLetters('up'))
            break
        }
        case "extra": {
            dispatch(actions.changeAllLetters('up'))
            dispatch(actions.changeExtraLetters('up'))
            break
        }
    }
}
export const downLettersAmount = (letterStatus: letterStatus) => (dispatch: AppDispatchType) => {
    switch (letterStatus) {
        case "correct": {
            dispatch(actions.changeAllLetters('down'))
            dispatch(actions.changeCorrectLetters('down'))
            break
        }
        case "wrong": {
            dispatch(actions.changeAllLetters('down'))
            dispatch(actions.changeWrongLetters('down'))
            break
        }
        case "extra": {
            dispatch(actions.changeAllLetters('down'))
            dispatch(actions.changeExtraLetters('down'))
            break
        }
    }
}