import { OrgUser, ScratchOrg } from "common/data/orgs";

export interface OrgState {
	scratchOrgs: {[username: string]: ScratchOrg};
	users: {[username: string]: OrgUser};
}

export function createDefaultOrgsState(): OrgState {
	return {
		scratchOrgs: {},
		users: {}
	};
}
