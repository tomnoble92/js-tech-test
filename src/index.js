import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createBrowserHistory from './components/history/history'

ReactDOM.render(<Router history={createBrowserHistory}><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
