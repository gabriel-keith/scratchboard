import { ProjectConfig } from '../../data/projects';

import { ProjectState, createDefaultProjectState } from '../state/project';
import { ProjectAction, ADD_PROJECT, REMOVE_PROJECT } from '../actions/project';

export function projectReducer(state: ProjectState = createDefaultProjectState(), action: ProjectAction): ProjectState {
	let projects: {[orgName: string]: ProjectConfig};

	if (!action.payload) {
		return state;
	}

	switch (action.type) {
		case ADD_PROJECT:
			projects = {
				...state.projectMap,
				[action.payload.orgName]: action.payload
			};

			return {
				...state,
				projectMap: projects
			};
		case REMOVE_PROJECT:
			projects = { ...state.projectMap };
			delete projects[action.payload.orgName];

			return {
				...state,
				projectMap: projects
			};
		default:
			return state;
	}
}
