import React from 'react';
import { Card, HTMLTable, Checkbox, Alignment, Button } from '@blueprintjs/core';

export class Dependencies extends React.Component {
	constructor(props: {}) {
		super(props);
		this.state = {
			dependencies: [{
				id: 'nFORCE',
				current: '2.345',
				remote: '2.543',
				isChecked: false
			},
			{
				id: 'LLC_BI',
				current: '7.543',
				remote: '7.987',
				isChecked: false
			},
			{
				id: 'nDESIGN',
				current: '1.114',
				remote: '1.114',
				isChecked: false
			}],
			isButtonDisabled: true
		};
	}

	public renderDependency(dependency) {
		return (
			<tr>
				<td>{dependency.id}</td>
				<td>{dependency.current}</td>
				<td>{dependency.remote}</td>
				<td>
					<div className='flex justify-center'>
						<Checkbox
							id={dependency.id}
							checked={dependency.isChecked}
							onChange={(event) => this.handleCheck(event.target.id)}
							disabled={dependency.current === dependency.remote}/>
					</div>
				</td>
			</tr>
		);
	}

	public renderDependencies() {
		let rendered = [];
		for (const dependency of this.state.dependencies) {
			rendered.push(this.renderDependency(dependency));
		}
		return rendered;
	}

	public render() {
		return (
			<Card id='dependencies' interactive={false} className='m-2'>
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
						{this.renderDependencies()}
					</tbody>
				</ HTMLTable>
				<div className='flex justify-end'>
					<Button
						type='submit'
						text='Upgrade Selected'
						intent='primary'
						disabled={this.state.isButtonDisabled}
						onClick={() => this.upgrade()}/>
				</div>
			</Card>);
	}

	private upgrade() {
		// Use services to upgrade here
		return 0;
	}

	private handleCheck(id) {
		let disableState = true;
		// tslint:disable-next-line:forin
		for (let i in this.state.dependencies) {
			if (this.state.dependencies[i].id === id) {
				this.state.dependencies[i].isChecked = !this.state.dependencies[i].isChecked;
				this.forceUpdate();
			}
			if (this.state.dependencies[i].isChecked) {
				disableState = false;
			}
			this.state.isButtonDisabled = disableState;
		}
	}
}
