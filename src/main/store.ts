import { Store, createStore, applyMiddleware } from 'redux';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import promise from 'redux-promise';
import ElectronStore from 'electron-store';

import { StoreState } from 'common/store/state';
import { storeReducers } from 'common/store/reducers';
import { ProjectConfig } from 'common/data/projects';

const electronStore = new ElectronStore();

const PROJECT_CONFIG_KEY = 'PROJECT_CONFIG_V2';
const NICKNAME_KEY = 'NICKNAME';

const initState = loadInitState();
console.log('Init State:', initState);

export const store: Store<StoreState> = createStore(
	storeReducers,
	initState,
	applyMiddleware(
		triggerAlias,
		promise,
		forwardToRenderer
	)
);

replayActionMain(store);

// load data
function loadInitState(): StoreState {
	return {
		org: {
			scratchOrgs: {},
			users: {},
			nicknames: electronStore.get(NICKNAME_KEY, {})
		},
		project: {
			projectMap: electronStore.get(PROJECT_CONFIG_KEY, {})
		}
	};
}

// save data
let currentProjects: {[orgName: string]: ProjectConfig} | undefined;
let currentNicknames: {[username: string]: string} | undefined;

store.subscribe(() => {
	const previousProjects = currentProjects;
	const previousNicknames = currentNicknames;

	const state = store.getState();
	console.log('StateChange:', state);

	currentProjects = state.project.projectMap;
	currentNicknames = state.org.nicknames;

	if (currentProjects && currentProjects !== previousProjects) {
		electronStore.set(PROJECT_CONFIG_KEY, currentProjects);
	}
	if (currentNicknames && currentNicknames !== previousNicknames) {
		electronStore.set(NICKNAME_KEY, currentNicknames);
	}
});
