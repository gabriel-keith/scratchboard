import { ipcMain, WebContents } from "electron"
import { Topics } from "common/ipc/topics"
import { SfdxService } from "./sfdx";

import { defaultSharedData } from "common/data/SharedData";


export class Services {
	sharedData = defaultSharedData()
	subscribers = new Map<string, WebContents>()
	sfdx = new SfdxService()

	constructor() {
		this.sfdx.listOrgs().then(orgList => {
			this.mergeSharedData(orgList);
		}).catch(error => {
			console.error(error);
		});

	}

	mergeSharedData(changes: any) {
		this.sharedData = { ...this.sharedData, ...changes };
		this.sendToAll(Topics.MERGE_SHARED_DATA, changes);
	}

	private sendToAll(topic: string, ...args: any[]) {
		for (const subscriber of this.subscribers.values()) {
			subscriber.send(topic, args);
		}
	}

	register() {
		ipcMain.on(Topics.INITIALIZED, event => {
			const sender = event.sender;
			const senderId = `${sender.id}`;

			this.subscribers.set(senderId, sender);
			sender.on('destroyed', () => this.subscribers.delete(senderId));

			sender.send(Topics.MERGE_SHARED_DATA, this.sharedData);
		});
	}
}