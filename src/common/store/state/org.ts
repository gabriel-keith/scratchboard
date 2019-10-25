import { OrgList } from "common/data/orgs";

export interface OrgState extends OrgList {

}

export function createDefaultOrgsState(): OrgState {
	return {
		scratchOrgs: [],
		nonScratchOrgs: []
	};
}
