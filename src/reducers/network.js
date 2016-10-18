import {Map} from 'immutable'
import * as actions from '../actions/networkActions'


const DEF_STATE = Map({
  networkId: null,
});


export default function network(state = DEF_STATE, action) {

  console.log(state);
  console.log(action);

  switch (action.type) {
    case actions.SET_ID:
      return Map({
        networkId: action.networkId
      });

    default:
      return state
  }
}
