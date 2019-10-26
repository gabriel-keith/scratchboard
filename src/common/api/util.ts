import { exec } from 'child_process';

export function executePromiseJson(command: string, path?: string): Promise<any> {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout) => {
			if (!error) {
				try {
					resolve(JSON.parse(stdout).result);
				} catch(exception) {
					reject(exception);
				}
			} else {
				reject(error.message);
			}
		});
	});
}

export function executePromise(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout) => {
			if (!error) {
				resolve(stdout);
			} else {
				reject(error.message);
			}
		});
	});
}
