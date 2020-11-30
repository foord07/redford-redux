import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from './actions';
import {TableListing,Loader,SearchInput,Header} from './components';

const App = () => {
    const dataList = useSelector(state => state.dataListStore.responseData);
    const isLoading = useSelector(state => state.loadingStore);
    const dispatch = useDispatch();
    React.useEffect(() => {
         dispatch(actions.loaderInit(true));
         dispatch(actions.getDataList());
    }, [dispatch]);

     return (
         <React.Fragment>
            <Header/>
             <div className="container">
                {isLoading ? <Loader/> :
                    <React.Fragment>
                        <SearchInput/>
                        <TableListing tableDataProp={dataList}/>
                    </React.Fragment>
                }
             </div>
         </React.Fragment>
     )
};
export default App;
