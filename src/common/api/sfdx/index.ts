import { OrgList, OrgUser } from 'common/data/orgs';
import { executePromiseJson, executePromise } from '../util';

export function listOrgs(): Promise<OrgList> {
	return executePromiseJson('sfdx force:org:list --json');
}

export function listUsers(username: string): Promise<OrgUser[]> {
	return executePromiseJson(`sfdx force:user:list -u ${username} --json`);
}

export function openOrg(username: string): void {
	executePromise(`sfdx force:org:open -u ${username}`);
}

export function fetchOrgUrl(username: string): Promise<string> {
	return executePromiseJson(`sfdx force:org:open -u ${username} --urlonly --json | jq -r '.result.url'`);
}

export function setOrgAsDefault(username: string): void {
	executePromise(`sfdx force:config:set defaultusername=${username}`);
}

export function deleteOrg(username: string): void {
	executePromise(`sfdx force:org:delete -u ${username}`);
}
