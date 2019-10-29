import { ErrorData } from '../../data/errors';

export function createDefaultErrorState() {
	return {
		errorList: []
	};
}

export interface ErrorState {
	errorList: ErrorData[];
}
