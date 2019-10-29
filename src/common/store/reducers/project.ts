import { ProjectConfig } from '../../data/projects';

import { ProjectState, createDefaultProjectState } from '../state/project';
import { ProjectAction, ADD_PROJECT, REMOVE_PROJECT } from '../actions/project';

export function projectReducer(state: ProjectState = createDefaultProjectState(), action: ProjectAction): ProjectState {
	let projects: {[projectDir: string]: ProjectConfig};

	switch (action.type) {
		case ADD_PROJECT:
			if (!action.payload) {
				return state;
			}

			projects = {
				...state.projectMap,
				[action.payload.projectDir]: action.payload
			};

			return {
				...state,
				projectMap: projects
			};
		case REMOVE_PROJECT:
			projects = { ...state.projectMap };
			delete projects[action.payload.projectDir];

			return {
				...state,
				projectMap: projects
			};
		default:
			return state;
	}
}
