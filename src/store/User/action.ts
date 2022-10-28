import { 
  GET_USER_SUCCESSFULLY, 
  REQUESET_FOR_GET_USER, 
  USER_REQUEST_UNSUCCESSFULLY } from "./actionType"
import axios from "axios";
import { Dispatch } from "redux";
// import { State } from "../masterReducer";
import { AppState, AppThunk } from "../storeType";


interface actionReturnType <Payload> {
  type:string,
  payload?:Payload
}

type userStructure = [
    {
      id:number,
      name: string,
      email: string
    }
  ]
type user = {
    id:number,
    name: string,
    email: string
}

type ThunkType = () => AppThunk | Promise<any>

export const requestForGetUser:() => actionReturnType <any> = () => {
  return {
     type: REQUESET_FOR_GET_USER
  }
}

export const getUserSuccessfully: (userData:userStructure) => actionReturnType<userStructure> = (userData) => {
  return {
    type: GET_USER_SUCCESSFULLY,
    payload: userData
  }
}

export const getUserFailed: () => actionReturnType<[]> = () => {
  return {
    type: USER_REQUEST_UNSUCCESSFULLY,
    payload: []
  }
}


//fetch user details  (thunk operation)
const getAllUserDetails: ThunkType = () => async (dispatch:Dispatch<any>, getState:AppState) => {
  try {
    console.log(getState()) //this  function will return the global state
    dispatch(requestForGetUser ()) //request for getting data 
    const {
      data,
      status
    } = await axios.get (
      `https://jsonplaceholder.typicode.com/users`
    )
    if (status == 200) { 
      const finalData: userStructure | any = [];
      data.forEach ((user:any) => {
        const struct:user = {
          id: user.id,
          email: user.email,
          name: user.name
        }
          finalData.push (struct)
      }) 
      // console.log(finalData)
      dispatch(getUserSuccessfully (finalData))
    }else {
      dispatch (getUserFailed ())
    }
  }catch (err) {
    console.log(err)
  }
}

export {
  getAllUserDetails
}

