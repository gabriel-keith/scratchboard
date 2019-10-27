import { Card, Tab, Tabs } from '@blueprintjs/core';
import React, { ReactText } from 'react';
import { Dependencies } from './dependencies/Dependencies';
import { Scripts } from './scripts/Scripts';
import { StandardActions } from './standard-actions/StandardActions';
import { Term } from './Terminal/Terminal';
import { ProjectConfig } from 'common/data/projects';

export interface ActionsProps {
	orgUsername: string;
	orgProject?: ProjectConfig;
}

export interface ActionsState {
	selectedTabId: ReactText;
}

export class Actions extends React.Component<ActionsProps, ActionsState> {
	constructor(props: ActionsProps) {
		super(props);
		this.state = {
			selectedTabId: 'standardActions'
		};
	}

	public render() {
		return (
			<Card id='actions' className='m-4'>
				<Tabs
					id='tabs'
					onChange={(selectedTabId) => this.setSelectedTab(selectedTabId)}
					selectedTabId={this.state.selectedTabId}
				>
					<Tab id='standardActions' key='standardActions' title='Standard Actions' panel={<StandardActions orgUsername={this.props.orgUsername} orgProject={this.props.orgProject} />} />
					<Tab id='dependencies' key='dependencies' title='Dependencies' panel={<Dependencies />} />
					<Tab id='terminal' key='terminal' title='Terminal' panel={<Term />} />
					<Tab id='scripts' key='scripts' title='Scripts' panel={<Scripts />} />
				</Tabs>
			</Card>
		);
	}

	private setSelectedTab(selectedTabId: ReactText) {
		this.setState({ selectedTabId });
	}
}
