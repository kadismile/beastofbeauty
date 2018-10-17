import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Home.css'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './_reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'


const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(thunk)/*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
));



store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

