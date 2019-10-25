import { combineReducers, createStore, applyMiddleware } from 'redux';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';

import { orgReducer } from '../../common/store/reducers/org';

const ScratchBoardApp = combineReducers({
	org: orgReducer
});

export const store = createStore(
	ScratchBoardApp,
	applyMiddleware(
		triggerAlias,
		forwardToRenderer
	)
);

replayActionMain(store);
