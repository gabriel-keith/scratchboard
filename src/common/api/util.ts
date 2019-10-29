import fs from 'fs';
import { exec, ExecOptions } from 'child_process';

export function executePromiseJson(command: string, path?: string): Promise<any> {
	const options: ExecOptions = {};

	if (path) {
		options.cwd = path;
	}

	return new Promise((resolve, reject) => {
		exec(command, options, (error, stdout) => {
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

export function executePromise(command: string, path?: string): Promise<string> {
	const options: ExecOptions = {};

	if (path) {
		options.cwd = path;
	}

	return new Promise((resolve, reject) => {
		exec(command, options, (error, stdout) => {
			if (!error) {
				resolve(stdout);
			} else {
				reject(error.message);
			}
		});
	});
}

export function readJsonFile(filePath: string): Promise<any> {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			try {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(data.toString()));
				}
			} catch (exception) {
				reject(exception);
			}
		});
	});
}

export function fetchDirNameList(dirPath: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		fs.readdir(dirPath, { withFileTypes: true}, (err, files) => {
			if (err) {
				reject(err);
			} else {
				resolve(files.filter((file) => file.isDirectory()).map((dir) => dir.name));
			}
		});
	});
}
