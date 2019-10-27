import { Action } from 'redux';
import { createAliasedAction } from 'electron-redux';
import { listOrgs, listUsers } from 'common/api/sfdx';
import { OrgList, OrgUser } from 'common/data/orgs';

export const FETCH_ORG_LIST_ACTION = 'FETCH_ORG_LIST';
export const FETCH_ORG_USERS_ACTION = 'FETCH_ORG_USERS';
export const OPEN_ORG_ACTION = 'OPEN_ORG_ACTION';

export type OrgListActions = FetchOrgListAction | FetchOrgUsersAction;

interface FetchOrgListAction extends Action {
	type: typeof FETCH_ORG_LIST_ACTION;
	payload: OrgList;
}

interface FetchOrgUsersAction extends Action {
	type: typeof FETCH_ORG_USERS_ACTION;
	payload: OrgUser[];
}

export const fetchOrgList = createAliasedAction(
	FETCH_ORG_LIST_ACTION,
	() => ({
		type: FETCH_ORG_LIST_ACTION,
		payload: listOrgs()
	})
);

export const fetchOrgUsers = createAliasedAction(
	FETCH_ORG_USERS_ACTION,
	(usernames: string[]) => ({
		type: FETCH_ORG_USERS_ACTION,
		payload: Promise.all(usernames.map(listUsers))
	})
);

export const openOrg = createAliasedAction(
	OPEN_ORG_ACTION,
	(username: string) => ({
		type: OPEN_ORG_ACTION,
		payload: openOrg(username)
	})
);
