import { ErrorData } from '../../data/errors';

export interface ErrorState {
	errorList: ErrorData[];
}

export function createDefaultErrorState() {
	return {
		errorList: [],
	};
}
