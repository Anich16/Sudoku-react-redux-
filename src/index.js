import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import SudokuReducer from './redux/SudokuReducer';
import {AppContainer} from "./redux/AppContainer";

let store = createStore(SudokuReducer);

store.subscribe(() => {
	let state = store.getState();
	renderAll(state)
});

let renderAll = () => {
	ReactDOM.render(<AppContainer state={store.getState()}
								  store={store}/>,
		document.getElementById('root'));
};

renderAll();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
