// import { HYDRATE } from "next-redux-wrapper"
import {combineReducers } from "redux"
import userReducer, { userState } from "./User/reducer"
import testReducer, { State as TestState } from  "./Test/reducer"



//this will be the mother state type
export type State = {
  user: userState,
  test: TestState
}


//this will be the master reducer
const rootReducer = combineReducers<State>({
  user: userReducer,
  test: testReducer,
})

export default rootReducer



