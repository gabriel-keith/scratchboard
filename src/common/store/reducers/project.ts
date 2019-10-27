import { ProjectConfig } from '../../data/projects';

import { ProjectState, createDefaultProjectState } from '../state/project';
import { ProjectAction, ADD_PROJECT, REMOVE_PROJECT } from '../actions/project';

export function projectReducer(state: ProjectState = createDefaultProjectState(), action: ProjectAction) {
	let projects: {[orgName: string]: ProjectConfig};

	switch (action.type) {
		case ADD_PROJECT:
			projects = {
				...state.projectMap,
				[action.payload.orgName]: action.payload
			};

			return {
				...state,
				projects
			};
		case REMOVE_PROJECT:
			projects = { ...state.projectMap };
			delete projects[action.payload.orgName];

			return {
				...state,
				projects
			};
		default:
			return state;
	}
}