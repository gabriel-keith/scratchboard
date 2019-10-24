import { ipcMain, WebContents } from 'electron';
import { IpcTopics } from 'common/ipc/topics';
import { SfdxService } from './sfdx';

import { defaultSharedData, SharedData } from 'common/data/SharedData';

export class Services {
	private sharedData = defaultSharedData();
	private subscribers = new Map<string, WebContents>();
	private sfdx = new SfdxService();

	constructor() {
		this.sfdx.listOrgs().then((orgList) => {
			this.mergeSharedData({
				...orgList,
				isOrgListLoading: false
			});
		}).catch((error) => {
			console.error(error);
		});
	}

	public register() {
		ipcMain.on(IpcTopics.APP_MOUNT, (event) => {
			const sender = event.sender;
			const senderId = `${sender.id}`;

			this.subscribers.set(senderId, sender);
			sender.on('destroyed', () => this.subscribers.delete(senderId));

			sender.send(IpcTopics.MERGE_SHARED_DATA, this.sharedData);
		});
	}

	private mergeSharedData(changes: Partial<SharedData>) {
		this.sharedData = { ...this.sharedData, ...changes };
		this.sendToAll(IpcTopics.MERGE_SHARED_DATA, changes);
	}

	private sendToAll(topic: string, ...args: any[]) {
		for (const subscriber of this.subscribers.values()) {
			subscriber.send(topic, ...args);
		}
	}
}
