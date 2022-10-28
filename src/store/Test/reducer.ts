import { HYDRATE } from 'next-redux-wrapper';
import type { AnyAction } from 'redux';

export interface State {
  tick: string;
}

const initialState: State = {
  tick: 'init',
};
// create your reducer
const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload.testReducer }; // here state contains the particular state and action.payload contains the full global store after update. So we need to set that store for our client site
    case 'TICK':
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

export default reducer;
