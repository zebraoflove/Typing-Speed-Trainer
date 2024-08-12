import {phraseType} from "../Types/types";
import {AppDispatchType, InferActionsTypes} from "./redux-store";
let initialState = {
    phrases: [
        {
            id: 0,
            text: "you will certainly have a hard time doing this assignment but the result will make you very happy"
        },
        {
            id: 1,
            text: "when i go to a cyclist these days the rider is always busy i surely think it will be like this today"
        },
        {
            id: 2,
            text: "you undoubtedly need to take notes while reading this book otherwise it will be extremely difficult to understand"
        },
        {
            id: 3,
            text: "i liked to sit up front and ride the fast ones all day long i liked it when they brushed right up against the buildings north of the loop"
        },
        {
            id: 4,
            text: "when making coffee you undoubtedly should put the coffee after the water otherwise the coffee grains may be boiled in the water"
        },
        {
            id: 5,
            text: "as he crossed toward the pharmacy at the corner he involuntarily turned his head because of a burst of light that had ricocheted from his temple"
        }
    ] as phraseType[],
    actualPhrase: {
        id: 0,
        text: "you will certainly have a hard time doing this assignment but the result will make you very happy"
    } as phraseType
}
type InitialStateType = typeof initialState
export const actions = {
    changeActualPhrase: (id: number) => ({type: "TST/TEXT/CHANGE-ACTUAL-PHRASE", id} as const)
}
type ActionType = InferActionsTypes<typeof actions>
export const textReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TST/TEXT/CHANGE-ACTUAL-PHRASE": {
            return {
                ...state,
                actualPhrase: state.phrases[action.id]
            }
        }
        default: {
            return state
        }
    }
}
export const getNewPhrase = (id: number, phrasesAmount: number) => (dispatch: AppDispatchType) => {
    if(id < phrasesAmount - 1) id = id + 1
    else id = 0
    dispatch(actions.changeActualPhrase(id))
}