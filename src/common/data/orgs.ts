
//sfdx force:org:list
export interface OrgList {
	nonScratchOrgs: SalesforceOrg[]
	scratchOrgs: ScratchOrg[]
}

export interface SalesforceOrg {
	username: string
	orgId: string
	accessToken: string
	instanceUrl: string
	loginUrl: string
	clientId: string
	alias: string
	lastUsed: Date
	connectedStatus: string
}

export interface ScratchOrg extends SalesforceOrg {
	createdOrgInstance: string
	created: string
	devHubUsername: string
	connectedStatus: string
	attributes: ScratchOrgAttributes
	orgName: string
	status: string
	createdBy: string
	createdDate: string
	expirationDate: Date
	edition: string
	signupUsername: string
	devHubOrgId: string
	isExpired: boolean
}

export interface ScratchOrgAttributes {
	type: string
	url: string
}

export interface OrgUser {
	defaultMarker: string;
	alias: string;
	username: string;
	profileName: string;
	orgId: string;
	accessToken: string;
	instanceUrl: string;
	loginUrl: string;
	userId: string;
}

export type Users = { [username: string]: OrgUser };
