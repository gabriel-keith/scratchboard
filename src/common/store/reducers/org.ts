import { OrgState, createDefaultOrgsState } from '../state/org';
import { OrgListActions, FETCH_ORG_LIST_ACTION, FETCH_ORG_USERS_ACTION } from '../actions/org';

export function orgReducer(state: OrgState = createDefaultOrgsState(), action: OrgListActions): OrgState {
	switch(action.type) {
		case FETCH_ORG_LIST_ACTION:
			return {
				...state,
				scratchOrgs: groupByUsername(action.payload.scratchOrgs)
			};
		case FETCH_ORG_USERS_ACTION:
			return {
				...state,
				users: {
					...state.users,
					...groupByUsername(action.payload)
				}
			};
		default:
			return state;
	}
}

function groupByUsername<T extends {username: string}>(data: T[]): {[username: string]: T} {
	const output: {[username: string]: T} = {};
	for (const x of data) {
		output[x.username] = x;
	}
	return output;
}
