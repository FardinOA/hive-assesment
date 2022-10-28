import { HYDRATE } from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

import {
  GET_USER_SUCCESSFULLY,
  REQUESET_FOR_GET_USER,
  USER_REQUEST_UNSUCCESSFULLY,
} from './actionType';

// declare the main state type
export type userState = {
  user:
    | [
        {
          id?: number;
          name?: string;
          email?: string;
        }
      ]
    | [];
  isLoading: boolean;
};

// initialize the user's initial state
const initialUserState: userState = {
  user: [],
  isLoading: false,
};

// the main user reducer function
const userReducer: (state: any, action: AnyAction) => any = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { 
        ...state, 
        ...action.payload.user //here action.payload will contain the new updated state
      }; // here state contains the particular state and action.payload contains the full global store after update. So we need to set that store for our client site
    
      case REQUESET_FOR_GET_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_SUCCESSFULLY: {
      // console.log(`Hello i am from reducer`)
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    case USER_REQUEST_UNSUCCESSFULLY: {
      return {
        ...state,
        isLoading: false,
        user: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
