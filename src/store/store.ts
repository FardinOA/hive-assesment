import masterReducer from "./masterReducer"
import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import {createWrapper } from "next-redux-wrapper"
import {Action} from 'redux';


type MakeStore = () => any


const makeStore:MakeStore= () => configureStore ({
    reducer: masterReducer
})


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});
export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
