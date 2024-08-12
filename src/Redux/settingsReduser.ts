import {InferActionsTypes} from "./redux-store";
let initialState = {
    timer: 30
}
type InitialStateType = typeof initialState
export const actions = {
    changeTimer: (time: number) => ({type: "TST/RESULT/CHANGE-TIMER", time} as const)
}
type ActionType = InferActionsTypes<typeof actions>
export const settingsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TST/RESULT/CHANGE-TIMER": {
            return {
                ...state,
                timer: action.time
            }
        }
        default: {
            return state
        }
    }
}