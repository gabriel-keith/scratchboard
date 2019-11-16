const pathsToAdd = ['/usr/local/bin'];

export default function fixPath() {
	if (process.platform === 'darwin') {
		const currentPath = process.env.PATH || '';
		const pathSet = new Set(currentPath.split(':'));

		process.env.PATH = pathsToAdd
			.filter((path) => !pathSet.has(path))
			.reduce((acc, path) => `${path}:${acc}`, currentPath);
	}
}
