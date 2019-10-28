import { executePromise } from '../util';

export interface IPackage {
	packageName: string;
	version: string;
}

export interface Packages {
	target: IPackage[];
	current: IPackage[];
}

export async function fetchDependencies(projectFolder: string, useLatest: boolean, username?: string): Promise<Packages> {
	let params = '';
	if (useLatest) {
		params += ' -u';
	}
	if (username) {
		params += ` -a ${username}`;
	}

	const results: string = await executePromise(`sfupdate -dx -t${params}`, projectFolder);

	const lines = results.split('\n');

	const target: IPackage[] = [];
	const current: IPackage[] = [];

	let index = 2;
	while (lines[index]) {
		target.push(parsePackage(lines[index]));
		index++;
	}
	index += 2;

	while (lines[index]) {
		current.push(parsePackage(lines[index]));
		index++;
	}

	return {
		target,
		current
	};
}

export function updateToLatest(projectFolder: string, packages?: string[], username?: string): Promise<string> {
	let params = '';
	if (username) {
		params += ` -a ${username}`;
	}
	if (packages) {
		params += ` --only ${packages.join(',')}`;
	}

	return executePromise(`sfupdate -dx${params}`, projectFolder);
}

function parsePackage(line: string): IPackage {
	return {
		packageName: line.split(' ', 1)[0],
		version: line.split('\'')[3]
	};
}
