import { AnyAction } from 'redux';
import { ErrorState, createDefaultErrorState } from '../state/error';
// import { ErrorData } from '../../data/errors';

export function errorReducer(state: ErrorState = createDefaultErrorState(), action: AnyAction): ErrorState {
	if (action.error) {
		// const newError: ErrorData = {
		// 	message: action.error,
		// 	timestamp: Date.now().toString()
		// };

		return state; // { ...state, errorList: [ ...state.errorList, newError ] };
	} else {
		switch (action.type) {
			default:
				return state;
		}
	}
}
