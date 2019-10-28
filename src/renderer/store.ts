import { Store, createStore, applyMiddleware } from 'redux';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';
import promise from 'redux-promise';

import { StoreState } from 'common/store/state';
import { storeReducers } from 'common/store/reducers';

const initialState = getInitialStateRenderer();
console.log(initialState);

export const store: Store<StoreState> = createStore(
	storeReducers,
	initialState,
	applyMiddleware(
		forwardToMain,
		promise
	)
);

replayActionRenderer(store);
