import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore,compose,applyMiddleware } from 'redux';
import allReducer from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const middleware = [
    thunk
];
const enhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const store = createStore(
  allReducer,
  enhancers
);

// store.subscribe(() => {
//     console.log('Store changed', store.getState());
// })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
