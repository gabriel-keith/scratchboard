import { Store, createStore, applyMiddleware } from 'redux';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import promise from 'redux-promise';
import ElectronStore from 'electron-store';

import { StoreState } from 'common/store/state';
import { storeReducers } from 'common/store/reducers';
import { ProjectConfig } from 'common/data/projects';
import { createDefaultOrgsState } from 'common/store/state/org';
import { createDefaultProjectState } from 'common/store/state/project';

const electronStore = new ElectronStore();

const PROJECT_CONFIG_KEY = 'projectConfigs';

function loadInitState(): StoreState {
	return {
		org: createDefaultOrgsState(),
		project: {
			projectMap: electronStore.get(PROJECT_CONFIG_KEY, createDefaultProjectState())
		}
	};
}

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

// watch projects
let currentProjects: {[orgName: string]: ProjectConfig} | undefined;

store.subscribe(() => {
	const previousProjects = currentProjects;
	currentProjects = store.getState().project.projectMap;
	console.log('StateChange:', store.getState());

	if (currentProjects && currentProjects !== previousProjects) {
		electronStore.set(PROJECT_CONFIG_KEY, currentProjects);
	}
});
