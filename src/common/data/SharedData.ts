import { OrgList } from "./orgs";

export interface SharedData extends OrgList {

}

export function defaultSharedData(): SharedData {
	return {
		scratchOrgs: [],
		nonScratchOrgs: []
	}
}