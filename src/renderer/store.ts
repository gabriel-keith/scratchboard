import { Store, createStore, applyMiddleware } from 'redux';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';
import promise from 'redux-promise-middleware';

import { StoreState } from 'common/store/state';
import storeReducers from 'common/store/reducers';

const initialState = getInitialStateRenderer();

export const store: Store<StoreState> = createStore(
	storeReducers,
	initialState,
	applyMiddleware(forwardToMain, promise),
);

replayActionRenderer(store);
