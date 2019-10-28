import { Action } from 'redux';
import { createAliasedAction } from 'electron-redux';
import { fetchProjectConfig } from 'common/api/project';
import { ProjectConfig } from 'common/data/projects';

export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export type ProjectAction = AddProjectAction | RemoveProjectAction;

export interface AddProjectAction extends Action {
	type: typeof ADD_PROJECT;
	payload?: ProjectConfig;
	error?: string;
}

export interface RemoveProjectAction extends Action {
	type: typeof REMOVE_PROJECT;
	payload: {
		orgName: string
	};
}

export const addProject = createAliasedAction(
	ADD_PROJECT,
	(projectDir: string) => ({
		type: ADD_PROJECT,
		payload: fetchProjectConfig(projectDir)
	})
);

export function removeProject(orgName: string): RemoveProjectAction {
	return {
		type: REMOVE_PROJECT,
		payload: { orgName }
	};
}
