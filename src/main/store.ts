import { Store, createStore, applyMiddleware } from 'redux';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import promise from 'redux-promise';

import { StoreState } from 'common/store/state';
import { storeReducers } from 'common/store/reducers';

export const store: Store<StoreState> = createStore(
	storeReducers,
	applyMiddleware(
		triggerAlias,
		promise,
		forwardToRenderer
	)
);

replayActionMain(store);
