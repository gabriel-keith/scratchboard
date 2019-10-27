import { executePromise } from "../util";

export async function fetchDependencies(projectFolder: string, username?: string): Promise<void> {
	const results: string = await executePromise(`sfupdate -dx -t ${username ? username : '' }`, projectFolder);

	//results.split()
}