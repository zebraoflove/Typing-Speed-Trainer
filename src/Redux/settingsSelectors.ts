import {AppStateType} from "./redux-store";

export const selectTimer = (state: AppStateType) => {
    return state.settings.timer
}