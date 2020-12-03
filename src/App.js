import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from './actions';
import {TableListing,SearchInput,Header} from './components';

const App = () => {
    const dataList = useSelector(state => state.dataListStore.responseData);
    const dispatch = useDispatch();
    React.useEffect(() => {
         dispatch(actions.loaderInit(true));
         dispatch(actions.getDataList());
    }, [dispatch]);

     return (
         <React.Fragment>
            <Header/>
             <div className="container">
                 <SearchInput/>
                 <TableListing tableDataProp={dataList}/>
             </div>
         </React.Fragment>
     )
};
export default React.memo(App);
