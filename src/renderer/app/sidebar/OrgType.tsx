import React from 'react';
import { OrgInstance } from './OrgInstance';

export class OrgType extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props
		};
	}

	public render() {
		var numberOfOrgs = Math.floor(Math.random() * Math.floor(4));

		var OrgInstances = [];
		for (var i = 0; i < numberOfOrgs; i++) {
			if(this.state.name){
				var orgInstanceName = this.state.name + ' ' + (i+1);
				OrgInstances.push(<OrgInstance key={orgInstanceName} name={orgInstanceName}/>);
			}
		}

		return (
			<ul className='bp3-tree-node-list bp3-tree-root'>
				<li className='bp3-tree-node bp3-tree-node-expanded'>
				<div className='bp3-tree-node-content'>
					<span className='bp3-tree-node-caret bp3-tree-node-caret-open bp3-icon-standard'></span>
					<span className='bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-close'></span>
					<span className='bp3-tree-node-label'>{this.state.name}</span>
				</div>
				{ OrgInstances }
				</li>
			</ul>
		);
	}
}
