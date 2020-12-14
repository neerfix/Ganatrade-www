import { applyMiddleware, compose, createStore } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../_reducers/rootReducer";
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();

const loggerMiddleware = createLogger();

export const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		loggerMiddleware
	)
);
