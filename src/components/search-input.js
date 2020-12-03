import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from './../actions';

const SearchInput = (searchData) => {
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState('');
    const dispatch = useDispatch();
    const onSearch = ()=>{
        dispatch(actions.loaderInit(true));
        dispatch(actions.searchDataList(search));
    }
    console.log("rendersearch")
    return (
        <div className="search-box">
            <input
                  type='text'
                  name='search'
                  placeholder='Search'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={e => setFocus(e.target.search)}
                />
            <button data-testid="search-data" type="button" className="btn-primary" onClick={onSearch}>Search</button>
        </div>
    );
}
export default React.memo(SearchInput);
