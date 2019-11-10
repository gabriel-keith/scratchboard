import React, { ReactText } from 'react';
import { Card, Tab, Tabs } from '@blueprintjs/core';
import { ProjectConfig } from 'common/data/projects';
import StandardActions from './standard-actions/StandardActions';

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
			selectedTabId: 'standardActions',
		};

		this.setSelectedTab = this.setSelectedTab.bind(this);
	}

	private setSelectedTab(selectedTabId: ReactText) {
		this.setState({ selectedTabId });
	}

	public render() {
		const { orgUsername, orgProject } = this.props;
		const { selectedTabId } = this.state;

		return (
			<Card className="m-4">
				<Tabs onChange={this.setSelectedTab} selectedTabId={selectedTabId}>
					<Tab
						id="standardActions"
						key="standardActions"
						title="Standard Actions"
						panel={<StandardActions orgUsername={orgUsername} orgProject={orgProject} />}
					/>
				</Tabs>
			</Card>
		);
	}
}
