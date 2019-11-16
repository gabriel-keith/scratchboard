import { OrgUser, ScratchOrg } from 'common/data/orgs';

export interface OrgState {
	scratchOrgs: Record<string, ScratchOrg>;
	users: Record<string, OrgUser>;
	nicknames: Record<string, string>;
}

export function createDefaultOrgsState(): OrgState {
	return {
		scratchOrgs: {},
		users: {},
		nicknames: {},
	};
}
