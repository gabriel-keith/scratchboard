import { OrgState } from './org';
import { ProjectState } from './project';

export interface StoreState {
	org: OrgState;
	project: ProjectState;
}
