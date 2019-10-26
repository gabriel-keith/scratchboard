import React from 'react';

interface Props {
	name: string;
}

export class OrgInstance extends React.Component<Props> {
	public render() {
		return (
			<ul className='bp3-tree-node-list'>
				<li className='bp3-tree-node'>
				<div className='bp3-tree-node-content'>
					<span className='bp3-tree-node-caret-none bp3-icon-standard'></span>
					<span className='flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter'></span>
				<span className='bp3-tree-node-label'>{this.props.name}</span>
				</div>
				</li>
			</ul>
		);
	}
}
