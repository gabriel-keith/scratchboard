import React from 'react';
import { OrgInstance } from './OrgInstance';

export class OrgType extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'LLC_BI',
			status: 'Operational'
		};
	}

	public render() {
		return (
				<ul className='bp3-tree-node-list bp3-tree-root'>
					<li className='bp3-tree-node bp3-tree-node-expanded'>
					<div className='bp3-tree-node-content'>
						<span className='bp3-tree-node-caret bp3-tree-node-caret-open bp3-icon-standard'></span>
						<span className='bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-close'></span>
						<span className='bp3-tree-node-label'>{this.state.name}</span>
					</div>
					<OrgInstance/>
					</li>
				</ul>
		);
	}
}
