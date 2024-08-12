import {AppStateType} from "./redux-store";
export const selectIsTestFinished = (state: AppStateType) => {
    return state.result.isTestFinished
}
export const selectAllLetters = (state: AppStateType) => {
    return state.result.allLetters
}
export const selectCorrectLetters = (state: AppStateType) => {
    return state.result.correctLetters
}
export const selectWrongLetters = (state: AppStateType) => {
    return state.result.wrongLetters
}
export const selectExtraLetters = (state: AppStateType) => {
    return state.result.extraLetters
}
export const selectCurrentLetterStatus = (state: AppStateType) => {
    return state.result.currentLetterStatus
}
export const selectWastedTime = (state: AppStateType) => {
    return state.result.wastedTime
}