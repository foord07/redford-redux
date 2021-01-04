import * as types from './action-types';

export const getDataList = () => {
  return dispatch => {
    return fetch('https://sheetlabs.com/ACME/getDomain/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
    .then(res=>{
        if (!res.ok) {return Promise.reject(res);}
        return res.json();
    })
    .then(res => {
        dispatch({
            type: types.GET_DATA_LIST,
            payload: res
        });
        dispatch(loaderInit(false));

    }).catch(err=>{
        dispatch({
            type: types.ERROR_APPLICATION,
            payload: Object.assign({},{"status":err.status,"statusText": err.statusText})
        });
        dispatch(loaderInit(false));
    })
  }
}

export const searchDataList = (data) => {
  return dispatch => {
    const url = "https://sheetlabs.com/ACME/getDomain?domain="+data+"*";
    return fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
    .then(res=>{
        if (!res.ok) {return Promise.reject(res);}
        return res.json();
    })
    .then(res => {
        dispatch({
            type: types.SEARCH_DATA,
            payload: res
        });
        dispatch(loaderInit(false));

    }).catch(err=>{
        dispatch({
            type: types.ERROR_APPLICATION,
            payload: Object.assign({},{"status":"","statusText": err.toString()})
        });
        dispatch(loaderInit(false));
    })
  }
}
export const loaderInit = (showLoader) => {
    const typeCheck = showLoader? types.SHOW_LOADER : types.HIDE_LOADER;
    return {
        type: typeCheck,
        payload: true
    }
};
