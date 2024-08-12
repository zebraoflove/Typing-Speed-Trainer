import {combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {textReducer} from "./textReduser";
import {textAreaReducer} from "./textAreaReduser";
import {resultReducer} from "./resultReduser";
import {settingsReducer} from "./settingsReduser";

let reducers = combineReducers({
    text: textReducer,
    textArea: textAreaReducer,
    result: resultReducer,
    settings: settingsReducer
})
type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>
const store = configureStore({reducer: reducers})
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, any>
export default store