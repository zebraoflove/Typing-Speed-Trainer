import {AppStateType} from "./redux-store";

export const selectActualPhrase = (state: AppStateType) => {
    return state.text.actualPhrase
}
export const selectActualPhraseId = (state: AppStateType) => {
    return state.text.actualPhrase.id
}
export const selectAllPhrasesAmount = (state: AppStateType) => {
    return state.text.phrases.length
}