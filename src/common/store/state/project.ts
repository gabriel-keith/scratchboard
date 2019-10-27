import { ProjectConfig } from 'common/data/projects';

export interface ProjectState {
	projectMap: {[orgName: string]: ProjectConfig};
}

export function createDefaultProjectState(): ProjectState {
	return {
		projectMap: {}
	};
}
