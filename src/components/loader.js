import React from 'react'
import loaderGif from '../assets/images/loader.gif';

const Loader = () => {

    return (
        <div className="loading-box">
            <img width="30" height="30" src={loaderGif} alt="loader"/>
            <h3>Loading data... Please wait...</h3>
        </div>
    );
}
export default React.memo(Loader);
