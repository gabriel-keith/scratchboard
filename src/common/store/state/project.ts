import { ProjectConfig } from 'common/data/projects';

export interface ProjectState {
	projectMap: Record<string, ProjectConfig>;
}

export function createDefaultProjectState(): ProjectState {
	return {
		projectMap: {}
	};
}
