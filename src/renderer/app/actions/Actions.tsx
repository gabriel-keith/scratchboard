import { Card, Tab, Tabs } from '@blueprintjs/core';
import React, { ReactText } from 'react';
import { Dependencies } from './dependencies/Dependencies';
import { Scripts } from './scripts/Scripts';
import { StandardActions } from './standard-actions/StandardActions';
import { Terminal } from './Terminal/Terminal';
import { NewUser } from './new-user/NewUser';

export interface ActionsState {
	selectedTabId: ReactText;
}

export class Actions extends React.Component<{}, ActionsState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			selectedTabId: 'standardActions'
		};
	}

	public render() {
		return (
			<Card id='sidebar' className='m-4'>
				<Tabs
					id='tabs'
					onChange={(selectedTabId) => this.setSelectedTab(selectedTabId)}
					selectedTabId={this.state.selectedTabId}
				>
					<Tab id='standardActions' key={'standardActions'} title='Standard Actions' panel={<StandardActions />} />
					<Tab id='dependencies' key={'dependencies'} title='Dependencies' panel={<Dependencies />} />
					<Tab id='terminal' key={'terminal'} title='Terminal' panel={<Terminal />} />
					<Tab id='scripts' key={'scripts'} title='Scripts' panel={<Scripts />} />
				</Tabs>
			</Card>
		);
	}

	private setSelectedTab(selectedTabId: ReactText) {
		this.setState({ selectedTabId });
	}
}
