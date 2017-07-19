import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux'
import {BrowserRouter, browserHistory} from 'react-router'

import './index.css';


const store = createStore(
		rootReducer,
		composeWithDevTools(
				applyMiddleware(thunk)
			)
	)

ReactDOM.render(
	<BrowserRouter history={browserHistory}>
		<Provider store={store}>
		  <App />
		</Provider>
	</BrowserRouter>,
  document.getElementById('root')
);
