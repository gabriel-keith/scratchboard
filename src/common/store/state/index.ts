import { OrgState } from './org';
import { ProjectState } from './project';
import { ErrorState } from './error';
import { SettingsState } from './settings';

export interface StoreState {
	org: OrgState;
	project: ProjectState;
	error: ErrorState;
	settings: SettingsState;
}
