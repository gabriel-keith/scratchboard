import React from 'react';
import { Card, Tab, Tabs, HTMLTable, Checkbox, Alignment } from '@blueprintjs/core';
import { DependenciesTab } from './DependenciesTab';
import { StandardActionTab } from './StandardActionTab';
import { TerminalTab } from './TerminalTab';
import { ScriptsTab } from './ScriptsTab';


export class Actions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabId: 'sp'
	  }
	}

	setSelectedTab(selectedTabId) {
		this.setState({selectedTabId: selectedTabId});
	}

	public render() {
		return (
			<Card id="sidebar" className="m-4">
				<Tabs id="tabs" onChange={(selectedTabId) => this.setSelectedTab(selectedTabId)} selectedTabId={this.state.selectedTabId}>
					<Tab id="stdp" title="Standard Actions" panel={<StandardActionTab />} />
					<Tab id="dpcp" title="Dependencies" panel={<DependenciesTab  />} />
					<Tab id="trmp" title="Terminal" panel={<TerminalTab  />} />
					<Tab id="scrp" title="Scripts" panel={<ScriptsTab  />} />
				</Tabs>
			</Card>
		);
	}
}