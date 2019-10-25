import { Card, Tab, Tabs } from '@blueprintjs/core';
import React, { ReactText } from 'react';
import { Dependencies } from './dependencies/Dependencies';
import { Scripts } from './scripts/Scripts';
import { StandardActions } from './standard-actions/StandardActions';
import { Terminal } from './Terminal/Terminal';

export interface ActionsState {
	selectedTabId: ReactText;
}

export class Actions extends React.Component<{}, ActionsState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			selectedTabId: 'sp'
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
					<Tab id='stdp' title='Standard Actions' panel={<StandardActions />} />
					<Tab id='dpcp' title='Dependencies' panel={<Dependencies />} />
					<Tab id='trmp' title='Terminal' panel={<Terminal />} />
					<Tab id='scrp' title='Scripts' panel={<Scripts />} />
				</Tabs>
			</Card>
		);
	}

	private setSelectedTab(selectedTabId: ReactText) {
		this.setState({ selectedTabId });
	}
}
