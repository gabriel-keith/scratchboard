import { ProjectConfig } from '../../data/projects';

import { ProjectState, createDefaultProjectState } from '../state/project';
import { ProjectAction, ADD_PROJECT_FULFILLED, REMOVE_PROJECT_ACTION } from '../actions/project';

export default function projectReducer(
	state: ProjectState = createDefaultProjectState(),
	action: ProjectAction,
): ProjectState {
	let projects: Record<string, ProjectConfig>;

	switch (action.type) {
		case ADD_PROJECT_FULFILLED:
			projects = {
				...state.projectMap,
				[action.payload.projectDir]: action.payload,
			};
			console.log(action.payload);

			return {
				...state,
				projectMap: projects,
			};
		case REMOVE_PROJECT_ACTION:
			projects = { ...state.projectMap };
			delete projects[action.payload.projectDir];

			return {
				...state,
				projectMap: projects,
			};
		default:
			return state;
	}
}
