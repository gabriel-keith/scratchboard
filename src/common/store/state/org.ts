import { OrgUser, ScratchOrg } from 'common/data/orgs';

export interface OrgState {
	scratchOrgs: {[username: string]: ScratchOrg};
	users: {[username: string]: OrgUser};
	nicknames: {[username: string]: string};
}

export function createDefaultOrgsState(): OrgState {
	return {
		scratchOrgs: {},
		users: {},
		nicknames: {}
	};
}
