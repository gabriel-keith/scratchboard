import { OrgList, OrgUser } from 'common/data/orgs';
import { executePromiseJson } from '../util';

export function listOrgs(): Promise<OrgList> {
	return executePromiseJson('sfdx force:org:list --json');
}

export function listUsers(username: string): Promise<OrgUser[]> {
	return executePromiseJson(`sfdx force:user:list -u ${username} --json`);
}

export function openOrg(username: string, urlOnly: boolean = false): Promise<string> {
	return executePromiseJson(`sfdx force:org:open -u ${username} ${urlOnly ? '-r' : ''} --json`)
}