import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById('root'));
=======
ReactDOM.render(
        <Provider store={store} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
>>>>>>> cdf5301c5859532bde8204ff738b468b5ef30cdf
