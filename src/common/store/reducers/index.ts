import { combineReducers } from 'redux';
import { orgReducer } from './org';
import { projectReducer } from './project';

export const storeReducers = combineReducers({
	org: orgReducer,
	project: projectReducer
});
