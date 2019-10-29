import { ProjectConfig } from 'common/data/projects';

export interface ProjectState {
	projectMap: {[projectDir: string]: ProjectConfig};
}

export function createDefaultProjectState(): ProjectState {
	return {
		projectMap: {}
	};
}
