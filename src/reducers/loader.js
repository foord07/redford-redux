import * as types from '../actions/action-types';

export default function(state = false, {type,payload}) {
  switch (type) {
    case types.SHOW_LOADER:
        return true;
    case types.HIDE_LOADER:
        return false;
    default:
      return state;
  }
}
