import { AnyAction } from 'redux';
import { ErrorState, createDefaultErrorState } from '../state/error';
// import { ErrorData } from '../../data/errors';

export default function errorReducer(
	state: ErrorState = createDefaultErrorState(),
	action: AnyAction,
): ErrorState {
	return state;
}
