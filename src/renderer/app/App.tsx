import React from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { IpcTopics } from 'common/ipc/topics';
import { SharedData, defaultSharedData } from 'common/data/SharedData';

import { TitleBar } from './Titlebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import { Sidebar } from './sidebar/Sidebar';

interface AppState {
	sharedData: SharedData;
}

export class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);

		this.handleMergeSharedData = this.handleMergeSharedData.bind(this);

		this.state = {
			sharedData: defaultSharedData()
		};
	}

	public componentDidMount() {
		ipcRenderer.on(IpcTopics.MERGE_SHARED_DATA, this.handleMergeSharedData);

		ipcRenderer.send(IpcTopics.APP_MOUNT);
	}

	public componentWillUnmount() {
		ipcRenderer.removeListener(IpcTopics.MERGE_SHARED_DATA, this.handleMergeSharedData);
	}

	public render() {
		return (
			<div className='sb-app bp3-dark'>
				<TitleBar />
				<div id="scratchboard" className="flex">
					<Sidebar />
					<div id="main" className="flex-auto">
						<Details />
						<Actions />
					</div>
				</div>
			</div>
		);
	}

	private handleMergeSharedData(_: IpcRendererEvent, data: Partial<SharedData>) {
		this.setState({
			...this.state,
			sharedData: {
				...this.state.sharedData,
				...data
			}
		});
	}
}
