import { OrgList } from 'common/data/orgs';
import { executePromiseJson } from '../util';

export class SfdxService {
	listOrgs(): Promise<OrgList> {
		return executePromiseJson('sfdx force:org:list --json');
	}
}
