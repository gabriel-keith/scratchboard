import React from 'react';
import path from 'path';
import { Card, HTMLTable, Checkbox, Button, Classes } from '@blueprintjs/core';
import { listDependencies } from 'common/api/sfdx';
import { OrgDependency } from 'common/data/orgs';
import { ProjectConfig } from 'common/data/projects';
import { readXmlFile, retrieveFilesFromFolder } from 'common/api/util';

interface IDependency extends OrgDependency {
	// current: string;
	isChecked: boolean;
}

interface Props {
	orgUsername: string;
	orgProject?: ProjectConfig;
}

interface State {
	dependencies: IDependency[];
	isButtonDisabled: boolean;
	loading: boolean;
}

export class Dependencies extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			dependencies: [],
			isButtonDisabled: true,
			loading: true
		};
	}

	public componentWillMount() {
		this.loadDependencies();
	}

	public componentDidUpdate(prevProps: Props, prevState: {}, snapshot: {}) {
		if (this.props.orgUsername !== prevProps.orgUsername ||
			this.props.orgProject !== prevProps.orgProject) {
				this.setState({ ...this.state, loading: true });
				this.loadDependencies();
		}
	}

	public render() {
		return (
			<Card id='dependencies' interactive={false} className='m-2'>
				<HTMLTable className={this.state.loading ? Classes.SKELETON : ''} bordered={false} interactive={true}>
					<thead>
						<tr>
							<th>Package</th>
							<th>Installed Version</th>
							<th>Remote Version</th>
							<th>Upgrade to remote</th>
						</tr>
					</thead>
					<tbody>
						{this.renderDependencies()}
					</tbody>
				</ HTMLTable>
				<div className='flex justify-end'>
					<Button
						className={(this.state.loading ? Classes.SKELETON : '') + ' mt-2'}
						type='submit'
						text='Upgrade'
						intent='primary'
						disabled={this.state.isButtonDisabled}
						onClick={() => this.upgrade()}/>
				</div>
			</Card>);
	}

	private loadDependencies() {
		if (!this.props.orgProject) {
			this.setState({ ...this.state, dependencies: [], loading: false });
			return;
		}

		listDependencies(this.props.orgUsername, this.props.orgProject.projectDir)
			.then((result: OrgDependency[]) => {
				const dependencies = result.map((od) => {
					const d = od as IDependency;
					d.isChecked = false;
					return d;
				});
				this.setState({ ...this.state, dependencies });
			})
			.finally(() => { this.setState({ ...this.state, loading: false }); });
	}

	private renderDependencies() {
		return this.state.dependencies.map(this.renderDependency);
	}

	private renderDependency(dependency: IDependency): JSX.Element {
		return (
			<tr key={dependency.Id}>
				<td>{dependency.SubscriberPackageNamespace}</td>
				<td>{'1.0'}</td>
				<td>{dependency.SubscriberPackageVersionName}</td>
				<td>
					<div className='flex justify-center'>
						<Checkbox
							id={dependency.Id}
							checked={dependency.isChecked}
							onChange={(event) => this.handleCheck(event.currentTarget.id)}
							disabled={'1.0' === dependency.SubscriberPackageVersionName}/>
					</div>
				</td>
			</tr>
		);
	}

	private upgrade() {
		// Use services to upgrade here
		return 0;
	}

	private handleCheck(id: string) {
		let disableState = true;
		for (const dependency of this.state.dependencies) {
			if (dependency.Id === id) {
				dependency.isChecked = !dependency.isChecked;
			}
			if (dependency.isChecked) {
				disableState = false;
			}
		}
		this.setState({ ...this.state, isButtonDisabled: disableState });
	}
}
