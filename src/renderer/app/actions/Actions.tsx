import React from 'react';
import { Card, Tab, Tabs, HTMLTable, Checkbox, Alignment } from '@blueprintjs/core';

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
			<Card id="dependencies" interactive={false} className="m-2">
				<HTMLTable bordered={false} interactive={true}>
					<thead>
						<tr>
							<th>Package</th>
							<th>Installed Version</th>
							<th>Remote Version</th>
							<th>Upgrade to remote</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>LLC_BI</td>
							<td>2.9354</td>
							<td>2.9765</td>
							<td>
								<Checkbox alignIndicator={Alignment.CENTER} checked={false} onChange={() => console.log(':)')} />
							</td>
						</tr>
						<tr>
							<td>nFORCE</td>
							<td>1.8234</td>
							<td>1.9456</td>
							<td>
								<Checkbox checked={false} onChange={() => console.log(':)')} />
							</td>
						</tr>
						<tr>
							<td>nDESIGN</td>
							<td>7.532</td>
							<td>7.975</td>
							<td>
								<Checkbox checked={false} onChange={() => console.log(':)')} />
							</td>
						</tr>
					</tbody>
				</ HTMLTable>
			</Card>);
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