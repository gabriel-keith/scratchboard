import React from 'react';
import { Card, HTMLTable, Checkbox, Button, Classes, Switch } from '@blueprintjs/core';
import { ProjectConfig } from 'common/data/projects';
import { Packages, IPackage, fetchDependencies, updateToLatest } from 'common/api/sfupdate';

interface IDependency extends IPackage {
	current: IPackage;
	target: IPackage;
	isChecked: boolean;
}

interface Props {
	orgUsername: string;
	orgProject?: ProjectConfig;
}

interface State {
	compareWithLatest: boolean;
	dependencies: IDependency[];
	isButtonDisabled: boolean;
	loading: boolean;
}

export class Dependencies extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			compareWithLatest: false,
			dependencies: [],
			isButtonDisabled: true,
			loading: true
		};
	}

	public componentWillMount() {
		this.loadDependencies();
	}

	public componentDidUpdate(prevProps: Props, prevState: State, snapshot: {}) {
		if (this.props.orgUsername !== prevProps.orgUsername ||
			this.props.orgProject !== prevProps.orgProject ||
			this.state.compareWithLatest !== prevState.compareWithLatest) {
				this.setState({ ...this.state, loading: true });
				this.loadDependencies();
		}
	}

	public render() {
		return (
			<Card id='dependencies' interactive={false} className='m-2'>
				<Switch
					label='Compare with latest packages'
					className={(this.state.loading ? Classes.SKELETON : '') + ' fit-content'}
					checked={this.state.compareWithLatest}
					onChange={() => { this.setState({ ...this.state, compareWithLatest: !this.state.compareWithLatest }); }}
				/>
				<HTMLTable className={this.state.loading ? Classes.SKELETON : ''} bordered={false} interactive={true}>
					<thead>
						<tr>
							<th>Package</th>
							<th>Installed Version</th>
							<th>{this.state.compareWithLatest ? 'Latest Version' : 'Project Version'}</th>
							<th></th>
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

		fetchDependencies(this.props.orgProject.projectDir, this.state.compareWithLatest, this.props.orgUsername)
			.then((result: Packages) => {
				const dependencyMap = new Map<string, IDependency>();
				for (const target of result.target) {
					const dependency = dependencyMap.get(target.packageName);
					if (dependency) {
						dependency.target = target;
					} else {
						dependencyMap.set(target.packageName, { target, isChecked: false } as IDependency);
					}
				}
				for (const current of result.current) {
					const dependency = dependencyMap.get(current.packageName);
					if (dependency) {
						dependency.current = current;
					} else {
						dependencyMap.set(current.packageName, { current, isChecked: false } as IDependency);
					}
				}

				const dependencies = Array.from(dependencyMap.values());
				this.setState({ ...this.state, dependencies });
			})
			.finally(() => { this.setState({ ...this.state, loading: false }); });
	}

	private renderDependencies() {
		return this.state.dependencies.map((d) => this.renderDependency(d));
	}

	private renderDependency(dependency: IDependency): JSX.Element {
		const packageName = dependency.current ? dependency.current.packageName : dependency.target.packageName;
		const isDisabled = !dependency.target || !this.hasLowerVersion(dependency);
		return (
			<tr key={packageName} onClick={() => { if (!isDisabled) { this.handleCheck(packageName); } }}>
				<td>{packageName}</td>
				<td>{dependency.current ? dependency.current.version : ''}</td>
				<td>{dependency.target ? dependency.target.version : ''}</td>
				<td>
					<div className='flex justify-center'>
						<Checkbox
							id={packageName}
							checked={dependency.isChecked}
							onChange={() => {this.handleCheck(packageName); }}
							disabled={isDisabled}/>
					</div>
				</td>
			</tr>
		);
	}

	private upgrade() {
		if (!this.props.orgProject) {
			return;
		}

		this.setState({ ...this.state, loading: true });
		const packages = this.state.dependencies.filter((d) => d.isChecked).map((d) => d.target.packageName);
		updateToLatest(this.props.orgProject.projectDir, this.state.compareWithLatest, packages, this.props.orgUsername)
			.then((result) => { this.loadDependencies(); })
			.catch(() => { this.setState({ ...this.state, loading: false }); });
	}

	private handleCheck = (id: string) => {
		let disableState = true;
		for (const dependency of this.state.dependencies) {
			if (dependency.target && dependency.target.packageName === id) {
				dependency.isChecked = !dependency.isChecked;
			}
			if (dependency.isChecked) {
				disableState = false;
			}
		}
		this.setState({ ...this.state, isButtonDisabled: disableState });
	}

	private hasLowerVersion(dependency: IDependency) {
		if (!dependency.target.version) {
			return false;
		}
		if (!dependency.current.version) {
			return true;
		}

		const [targetMajorVersion, targetMinorVersion] = [...dependency.target.version.split('.')];
		const [currentMajorVersion, currentMinorVersion] = [...dependency.current.version.split('.')];

		const hasLowerMajorVersion = Number(currentMajorVersion) < Number(targetMajorVersion);
		const hasEqualMajorVersion = currentMajorVersion === targetMajorVersion;
		const hasLowerMinorVersion = Number(currentMinorVersion) < Number(targetMinorVersion);

		return hasLowerMajorVersion || (hasEqualMajorVersion && hasLowerMinorVersion);
	}
}
