import { OrgState, createDefaultOrgsState } from '../state/org';
import { OrgListActions, FETCH_ORG_LIST_ACTION } from '../actions/org';

export function orgReducer(state: OrgState = createDefaultOrgsState(), action: OrgListActions) {
	switch(action.type) {
		case FETCH_ORG_LIST_ACTION:
			return { ... action.payload };
		default:
			return state;
	}
}
