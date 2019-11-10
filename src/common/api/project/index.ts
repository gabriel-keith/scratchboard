import path from 'path';
import { readJsonFile, fetchDirNameList } from 'common/api/util';
import { ProjectConfig } from 'common/data/projects';

export function fetchProjectUsernames(projectDir: string): Promise<string[]> {
	return fetchDirNameList(path.join(projectDir, '.sfdx', 'orgs'));
}

export async function fetchProjectConfig(projectDir: string): Promise<ProjectConfig> {
	const projectScratchDefJson = await readJsonFile(
		path.join(projectDir, 'config', 'project-scratch-def.json'),
	);

	let orgUsernames: string[];
	try {
		orgUsernames = await fetchProjectUsernames(projectDir);
	} catch {
		orgUsernames = [];
	}

	return {
		orgName: projectScratchDefJson.orgName,
		projectDir,
		orgUsernames,
	};
}
