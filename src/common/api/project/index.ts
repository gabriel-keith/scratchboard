import path from 'path';
import { readJsonFile } from '../util';
import { ProjectConfig } from 'common/data/projects';

export async function fetchProjectConfig(projectDir: string): Promise<ProjectConfig> {
	const projectScratchDefJson = await readJsonFile(path.join(projectDir, 'config', 'project-scratch-def.json'));

	return {
		orgName: projectScratchDefJson.orgName,
		projectDir
	};
}
