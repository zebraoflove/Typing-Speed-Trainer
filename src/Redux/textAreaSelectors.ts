import {AppStateType} from "./redux-store";
export const selectTextAreaWordIndex = (state: AppStateType) => {
    return state.textArea.currentWordIndex
}
export const selectTextAreaLetterIndex = (state: AppStateType) => {
    return state.textArea.currentLetterIndex
}
export const selectTextAreaLetter = (state: AppStateType) => {
    return state.textArea.currentLetter
}
export const selectIsStartTyping = (state: AppStateType) => {
    return state.textArea.isStartTyping
}