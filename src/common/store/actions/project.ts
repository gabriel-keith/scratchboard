import { Action } from 'redux';
import { createAliasedAction } from 'electron-redux';
import { fetchProjectConfig } from 'common/api/project';
import { ProjectConfig } from 'common/data/projects';

export const ADD_PROJECT_REQUEST = 'ADD_PROJECT';

export const ADD_PROJECT_FULFILLED = 'ADD_PROJECT_FULFILLED';

export const REMOVE_PROJECT_ACTION = 'REMOVE_PROJECT';

export type ProjectAction = AddProjectFulfilled | RemoveProjectAction;

export interface AddProjectFulfilled extends Action {
	type: typeof ADD_PROJECT_FULFILLED;
	payload: ProjectConfig;
}

export interface RemoveProjectAction extends Action {
	type: typeof REMOVE_PROJECT_ACTION;
	payload: {
		projectDir: string;
	};
}

export const addProject = createAliasedAction(ADD_PROJECT_REQUEST, (projectDir: string) => ({
	type: ADD_PROJECT_REQUEST,
	payload: fetchProjectConfig(projectDir),
}));

export function removeProject(projectDir: string): RemoveProjectAction {
	return {
		type: REMOVE_PROJECT_ACTION,
		payload: { projectDir },
	};
}
