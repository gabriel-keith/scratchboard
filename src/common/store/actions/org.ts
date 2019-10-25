import { createAliasedAction } from 'electron-redux';
import { listOrgs } from 'common/api/sfdx';
import { OrgList } from 'common/data/orgs';

export const FETCH_ORG_LIST_ACTION = 'FETCH_ORG_LIST';

export type OrgListActions = FetchOrgListAction;

interface FetchOrgListAction {
	type: typeof FETCH_ORG_LIST_ACTION;
	payload: OrgList;
}

export const fetchOrgList = createAliasedAction(
	FETCH_ORG_LIST_ACTION,
	() => ({
		type: FETCH_ORG_LIST_ACTION,
		payload: listOrgs()
	})
);
