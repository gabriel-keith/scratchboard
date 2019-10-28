import { OrgState, createDefaultOrgsState } from '../state/org';
import { OrgListActions, FETCH_ORG_LIST_ACTION, FETCH_ORG_USERS_ACTION, SET_ORG_NICKNAME_ACTION } from '../actions/org';

export function orgReducer(state: OrgState = createDefaultOrgsState(), action: OrgListActions): OrgState {
	switch(action.type) {
		case FETCH_ORG_LIST_ACTION:
			if (!action.payload) {
				return state;
			}

			return {
				...state,
				scratchOrgs: groupByUsername(action.payload.scratchOrgs)
			};
		case FETCH_ORG_USERS_ACTION:
			if (!action.payload) {
				return state;
			}

			return {
				...state,
				users: {
					...state.users,
					...groupByUsername(action.payload)
				}
			};
		case SET_ORG_NICKNAME_ACTION:
			const newNicknames = { ...state.nicknames };
			if (action.payload.nickname) {
				newNicknames[action.payload.username] = action.payload.nickname;
			} else {
				delete newNicknames[action.payload.nickname];
			}

			return {
				...state,
				nicknames: newNicknames
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
