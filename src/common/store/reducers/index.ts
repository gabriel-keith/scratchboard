import { combineReducers } from 'redux';
import { orgReducer } from './org';

export const storeReducers = combineReducers({
	org: orgReducer
});
