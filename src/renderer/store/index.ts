import { createStore, applyMiddleware, combineReducers } from 'redux';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';

import { orgReducer } from 'common/store/reducers/org';

const initialState = getInitialStateRenderer();
const ScratchBoardApp = combineReducers({
	org: orgReducer
});

export const store = createStore(
	ScratchBoardApp,
	initialState,
	applyMiddleware(
		forwardToMain
	)
);

replayActionRenderer(store);
