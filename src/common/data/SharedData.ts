import { OrgList } from './orgs';

export interface SharedData extends OrgList {
	isOrgListLoading: boolean;
}

export function defaultSharedData(): SharedData {
	return {
		isOrgListLoading: true,
		scratchOrgs: [],
		nonScratchOrgs: []
	};
}
