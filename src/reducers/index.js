import tableList from './table-list';
import loading from './loader';

import {combineReducers} from 'redux';
const allReducers = combineReducers({
    dataListStore : tableList,
    loadingStore: loading
})

export default allReducers;
