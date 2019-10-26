import React from 'react';

import { TitleBar } from './Titlebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import { Sidebar } from './sidebar/Sidebar';
import { ScratchOrg } from 'common/data/orgs';

export interface AppState {
	orgDetails: ScratchOrg | null;
}

export class App extends React.Component<{}, AppState> {
	public constructor(props: {}) {
		super(props);
		this.state = { orgDetails: { username: 'LLC_BI' } as ScratchOrg };
	}

	public render() {
		let orgPage;
		if (this.state.orgDetails) {
			orgPage = (
				<div>
					<Details />
					<Actions orgUsername={this.state.orgDetails.username} />
				</div>
			);
		}

		return (
			<div className='sb-app bp3-dark h-full'>
				<div className='vh-90'>
					<TitleBar />
					<div id='scratchboard' className='flex'>
						<Sidebar onOrgChange={this.handleOrgChange} />
						<div id='main' className='flex-auto'>
							{orgPage}
						</div>
					</div>
				</div>
			</div>
		);
	}

	private handleOrgChange(orgDetails: ScratchOrg) {
		this.setState({ orgDetails });
	}
}
