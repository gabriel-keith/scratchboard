import React from 'react';

import { Card } from '@blueprintjs/core';
import { OrgType } from './OrgType';

export class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabId: 'sp'
		};
	}

	public render() {
		return (
		<Card id='sidebar' className='flex-auto'>
			<div className='bp3-tree'>
				<OrgType/>
			</div>
		</Card>
		);
	}
}
