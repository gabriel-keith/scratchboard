import { OrgState, createDefaultOrgsState } from '../state/org';
import {
	OrgListActions,
	FETCH_ORG_LIST_FULFILLED,
	FETCH_ORG_USERS_FULFILLED,
	SET_ORG_NICKNAME_ACTION,
} from '../actions/org';

function groupByUsername<T extends { username: string }>(data: T[]): Record<string, T> {
	return data.reduce((acc: Record<string, T>, a) => {
		acc[a.username] = a;
		return acc;
	}, {});
}

function removeValue<T>(
	value: string,
	{ [value]: _, ...values }: Record<string, T>,
): Record<string, T> {
	return values;
}

export default function orgReducer(
	state: OrgState = createDefaultOrgsState(),
	action: OrgListActions,
): OrgState {
	switch (action.type) {
		case FETCH_ORG_LIST_FULFILLED:
			if (!action.payload) {
				return state;
			}

			return {
				...state,
				scratchOrgs: groupByUsername(action.payload.scratchOrgs),
			};
		case FETCH_ORG_USERS_FULFILLED:
			if (!action.payload) {
				return state;
			}

			return {
				...state,
				users: {
					...state.users,
					...groupByUsername(action.payload),
				},
			};
		case SET_ORG_NICKNAME_ACTION:
			if (action.payload.nickname) {
				return {
					...state,
					nicknames: {
						...state.nicknames,
						[action.payload.username]: action.payload.nickname,
					},
				};
			}

			return {
				...state,
				nicknames: removeValue(action.payload.username, state.nicknames),
			};
		default:
			return state;
	}
}
