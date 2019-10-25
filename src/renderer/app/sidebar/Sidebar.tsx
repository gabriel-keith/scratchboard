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
		var orgTypes = ['LLC_BI', 'nRETAIL', 'nFORCE'];
        var orgTypesList = orgTypes.map(function(o){
                        return <OrgType key={o} name={o}/>;
                      });
		return (
		<Card id='sidebar' className='flex-auto ml-2'>
			<div className='bp3-tree'>
				{ orgTypesList }
			</div>
		</Card>
		);
	}
}
