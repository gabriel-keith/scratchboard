import { executePromise } from '../util';

export interface Package {
	packageName: string;
	version: string;
}

export interface Packages {
	target: Package[];
	current: Package[];
}

function parsePackage(line: string): Package {
	return {
		packageName: line.split(' ', 1)[0],
		version: line.split("'")[3],
	};
}

export async function fetchDependencies(
	projectFolder: string,
	useLatest: boolean,
	username?: string,
): Promise<Packages> {
	let params = '';
	if (useLatest) {
		params += ' -u';
	}
	if (username) {
		params += ` -a ${username}`;
	}

	const results: string = await executePromise(`sfupdate -dx -t${params}`, projectFolder);

	const lines = results.split('\n');

	const target: Package[] = [];
	const current: Package[] = [];

	let index = 2;
	while (lines[index]) {
		target.push(parsePackage(lines[index]));
		index += 1;
	}
	index += 2;

	while (lines[index]) {
		current.push(parsePackage(lines[index]));
		index += 1;
	}

	return {
		target,
		current,
	};
}

export function updateToLatest(
	projectFolder: string,
	useLatest: boolean,
	packages?: string[],
	username?: string,
): Promise<string> {
	let params = '';
	if (username) {
		params += ` -a ${username}`;
	}
	if (packages) {
		params += ` --only ${packages.join(',')}`;
	}

	return executePromise(`sfupdate -dx${params}`, projectFolder);
}
