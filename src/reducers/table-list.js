import * as actions from '../actions/action-types';

export default function(state = {}, {type,payload}) {
  switch (type) {
    case actions.GET_DATA_LIST:
        return {
            ...state,
            responseData: payload

        };
    case actions.SEARCH_DATA:
        return {
            ...state,
            responseData: payload
        };
    case actions.ERROR_APPLICATION:
        return {
            ...state,
            responseData: payload
        };
    default:
      return state;
  }
}
