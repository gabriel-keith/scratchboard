import { Store, createStore, applyMiddleware } from 'redux';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import promise from 'redux-promise-middleware';
import ElectronStore from 'electron-store';

import { StoreState } from 'common/store/state';
import storeReducers from 'common/store/reducers';
import { ProjectConfig } from 'common/data/projects';
import { createDefaultErrorState } from 'common/store/state/error';
import { SettingsState, createDefaultSettings } from 'common/store/state/settings';

const electronStore = new ElectronStore();

const PROJECT_CONFIG_KEY = 'PROJECT_CONFIG_V2';
const NICKNAME_KEY = 'NICKNAME';
const SETTINGS_KEY = 'SETTINGS';

// load data
function loadInitState(): StoreState {
	return {
		org: {
			scratchOrgs: {},
			users: {},
			nicknames: electronStore.get(NICKNAME_KEY, {}),
		},
		project: {
			projectMap: electronStore.get(PROJECT_CONFIG_KEY, {}),
		},
		error: createDefaultErrorState(),
		settings: electronStore.get(SETTINGS_KEY, createDefaultSettings()),
	};
}

const initState = loadInitState();

const store: Store<StoreState> = createStore(
	storeReducers,
	initState,
	applyMiddleware(triggerAlias, promise, forwardToRenderer),
);
replayActionMain(store);

// save data
let currentProjects: Record<string, ProjectConfig> | undefined;
let currentNicknames: Record<string, string> | undefined;
let currentSettings: SettingsState | undefined;

store.subscribe(() => {
	const previousProjects = currentProjects;
	const previousNicknames = currentNicknames;
	const previousSettings = currentSettings;

	const state = store.getState();

	currentProjects = state.project.projectMap;
	currentNicknames = state.org.nicknames;
	currentSettings = state.settings;

	if (currentProjects && currentProjects !== previousProjects) {
		electronStore.set(PROJECT_CONFIG_KEY, currentProjects);
	}
	if (currentNicknames && currentNicknames !== previousNicknames) {
		electronStore.set(NICKNAME_KEY, currentNicknames);
	}
	if (currentSettings && currentSettings !== previousSettings) {
		electronStore.set(SETTINGS_KEY, currentSettings);
	}
});

export default store;
