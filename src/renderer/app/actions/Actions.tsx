import React from 'react';
import { Card, Tab, Tabs } from '@blueprintjs/core';

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
					<Tab id="stdp" title="Standard Actions" panel={<StandardActionPanel />} />
					<Tab id="dpcp" title="Dependencies" panel={<DependenciesPanel />} />
					<Tab id="trmp" title="Terminal" panel={<TerminalPanel />} />
					<Tab id="scrp" title="Scripts" panel={<ScriptsPanel />} />
				</Tabs>
			</Card>
		);
	}
}

export class StandardActionPanel extends React.Component { 
	public render() {
		return (
		<div className="bg-green-500">
			<p>Panel Works!</p>
		</div>);
	}
}

export class TerminalPanel extends React.Component { 
	public render() {
		return (
		<div className="bg-blue-500">
			<p>Terminal Works!</p>
		</div>);
	}
}

export class DependenciesPanel extends React.Component { 
	public render() {
		return (
		<div className="bg-yellow-500">
			<p>Dependencies Works!</p>
		</div>);
	}
}

export class ScriptsPanel extends React.Component { 
	public render() {
		return (
		<div className="bg-red-500">
			<p>Scripts Works!</p>
		</div>);
	}
}