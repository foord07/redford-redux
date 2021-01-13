import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from './actions';
import {TableListing,SearchInput} from './components';

const App = () => {
    const dataList = useSelector(state => state.dataListStore.responseData);
    const dispatch = useDispatch();
    React.useEffect(() => {
         dispatch(actions.loaderInit(true));
         dispatch(actions.getDataList());
    }, [dispatch]);

     return (
             <div className="container">
                 <SearchInput/>
                 <TableListing tableDataProp={dataList}/>
             </div>
     )
};
export default React.memo(App);
