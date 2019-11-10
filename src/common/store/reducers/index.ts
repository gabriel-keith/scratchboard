import { combineReducers } from 'redux';
import orgReducer from './org';
import projectReducer from './project';
import settingsReducer from './settings';
import errorReducer from './error';

const storeReducers = combineReducers({
	org: orgReducer,
	project: projectReducer,
	error: errorReducer,
	settings: settingsReducer,
});

export default storeReducers;
