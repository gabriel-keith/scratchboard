import React from 'react';

export class OrgInstance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'LLC_BI_INSTANCE1',
			status: 'Operational'
		};
	}

	public render() {
		return (
			<ul className='bp3-tree-node-list'>
				<li className='bp3-tree-node'>
				<div className='bp3-tree-node-content'>
					<span className='bp3-tree-node-caret-none bp3-icon-standard'></span>
					<span className='flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter'></span>
				<span className='bp3-tree-node-label'>{this.state.name}</span>
				</div>
				</li>
			</ul>
		);
	}
}
