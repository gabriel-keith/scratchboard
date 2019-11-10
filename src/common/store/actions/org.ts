import { Action } from 'redux';
import { createAliasedAction } from 'electron-redux';
import { listOrgs, listUsers } from 'common/api/sfdx';
import { OrgList, OrgUser } from 'common/data/orgs';

export const FETCH_ORG_LIST_REQUEST = 'FETCH_ORG_LIST';
export const FETCH_ORG_USERS_REQUEST = 'FETCH_ORG_USERS';
export const OPEN_ORG_ACTION_REQUEST = 'OPEN_ORG_ACTION';

export const FETCH_ORG_LIST_FULFILLED = 'FETCH_ORG_LIST_FULFILLED';
export const FETCH_ORG_USERS_FULFILLED = 'FETCH_ORG_USERS_FULFILLED';
export const OPEN_ORG_ACTION_FULFILLED = 'OPEN_ORG_ACTION_FULFILLED';

export const SET_ORG_NICKNAME_ACTION = 'SET_ORG_NICKNAME';

export type OrgListActions = FetchOrgUsersFulfilled | FetchOrgListFulfilled | SetOrgNicknameAction;

interface FetchOrgListFulfilled extends Action {
	type: typeof FETCH_ORG_LIST_FULFILLED;
	payload: OrgList;
}

interface FetchOrgUsersFulfilled extends Action {
	type: typeof FETCH_ORG_USERS_FULFILLED;
	payload: OrgUser[];
}

interface SetOrgNicknameAction extends Action {
	type: typeof SET_ORG_NICKNAME_ACTION;
	payload: {
		username: string;
		nickname: string;
	};
}

export const fetchOrgList = createAliasedAction(FETCH_ORG_LIST_REQUEST, () => ({
	type: FETCH_ORG_LIST_REQUEST,
	payload: listOrgs(),
}));

export const fetchOrgUsers = createAliasedAction(
	FETCH_ORG_USERS_REQUEST,
	(usernames: string[]) => ({
		type: FETCH_ORG_USERS_REQUEST,
		payload: Promise.all(usernames.map(listUsers)),
	}),
);

export const openOrg = createAliasedAction(OPEN_ORG_ACTION_REQUEST, (username: string) => ({
	type: OPEN_ORG_ACTION_REQUEST,
	payload: openOrg(username),
}));

export function setOrgNickname(username: string, nickname: string): SetOrgNicknameAction {
	return {
		type: SET_ORG_NICKNAME_ACTION,
		payload: { username, nickname },
	};
}
