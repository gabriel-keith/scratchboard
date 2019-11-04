const pathsToAdd = ['/usr/local/bin'];

export function fixPath() {
	if (process.platform === 'darwin') {
		let newPath = process.env.PATH || '';
		const pathSet: Set<string> = new Set(newPath.split(':'));

		for (const p of pathsToAdd) {
			if (!pathSet.has(p)) {
				newPath = `${p}:${newPath}`;
			}
		}

		process.env.PATH = newPath;
	}
}