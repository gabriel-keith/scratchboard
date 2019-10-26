import React from 'react';
import { connect } from 'react-redux';

import { ScratchOrg, OrgUser } from 'common/data/orgs';

import { TitleBar } from './Titlebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import Sidebar from './sidebar/Sidebar';
import { StoreState } from 'common/store/state';

interface StateProps {
	scratchOrgs: { [username: string]: ScratchOrg };
	users: { [username: string]: OrgUser };
}

type Props = StateProps;

interface State {
	selectedUsername?: string;
}

function mapStateToProps(state: StoreState): StateProps {
	return {
		scratchOrgs: state.org.scratchOrgs,
		users: state.org.users
	};
}

class App extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.handleOrgSelection = this.handleOrgSelection.bind(this);
		this.state = {};
	}

	public handleOrgSelection(selectedUsername: string) {
		this.setState({
			...this.state,
			selectedUsername
		});
	}

	public render() {
		const username = this.state.selectedUsername;

		let contents: any;

		if (username) {
			const selectedOrg = this.props.scratchOrgs[username];
			contents = <>
				<Details scratchOrg={selectedOrg} />
				<Actions orgUsername={username} />
			</>;
		}

		return (
			<div className='sb-app bp3-dark h-full'>
				<div className='vh-90'>
					<TitleBar />
					<div id='scratchboard' className='flex'>
						<Sidebar orgUsername={username} onOrgSelect={this.handleOrgSelection} />
						<div id='main' className='flex-auto'>
							{contents}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(App);
