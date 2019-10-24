import React from 'react';

import { Card } from '@blueprintjs/core';

export class Sidebar extends React.Component {

	public render() {
		return (
		<Card id='sidebar' className='flex-auto'>
			<div className='bp3-tree'>
				<ul className='bp3-tree-node-list bp3-tree-root'>
					<li className='bp3-tree-node bp3-tree-node-expanded'>
					<div className='bp3-tree-node-content'>
						<span className='bp3-tree-node-caret bp3-tree-node-caret-open bp3-icon-standard'></span>
						<span className='bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-close'></span>
						<span className='bp3-tree-node-label'>Label</span>
					</div>
					<ul className='bp3-tree-node-list'>
						<li className='bp3-tree-node'>
						<div className='bp3-tree-node-content'>
							<span className='bp3-tree-node-caret-none bp3-icon-standard'></span>
							<span className='flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter'></span>
						<span className='bp3-tree-node-label'>A Document</span>
						</div>
						</li>
					</ul>
					</li>
				</ul>
			</div>
		</Card>
		);
	}
}
