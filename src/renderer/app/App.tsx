import React from 'react';
import { connect } from 'react-redux';

import { ScratchOrg, OrgUser } from 'common/data/orgs';

import { StoreState } from 'common/store/state';
import { ProjectConfig } from 'common/data/projects';
import { NonIdealState, Card } from '@blueprintjs/core';
import TitleBar from './Titlebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import Sidebar from './sidebar/Sidebar';

interface StateProps {
	scratchOrgs: Record<string, ScratchOrg>;
	users: Record<string, OrgUser>;
	projects: Record<string, ProjectConfig>;
	isDark: boolean;
}

type Props = StateProps;

interface State {
	selectedUsername?: string;
}

function mapStateToProps(state: StoreState): StateProps {
	return {
		scratchOrgs: state.org.scratchOrgs,
		users: state.org.users,
		projects: state.project.projectMap,
		isDark: state.settings.theme === 'dark',
	};
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.handleOrgSelection = this.handleOrgSelection.bind(this);
		this.state = {};
	}

	public handleOrgSelection(selectedUsername: string) {
		this.setState({ selectedUsername });
	}

	public render() {
		const { projects, scratchOrgs, isDark } = this.props;
		const { selectedUsername: username } = this.state;

		let contents: JSX.Element;

		if (username) {
			const selectedOrg = scratchOrgs[username];
			const orgProject = Object.values(projects).find((project) =>
				project.orgUsernames.includes(selectedOrg.username),
			);

			contents = (
				<>
					<Details scratchOrg={selectedOrg} orgProject={orgProject} />
					<Actions orgUsername={username} orgProject={orgProject} />
				</>
			);
		} else {
			contents = (
				<Card className="mb-4 mx-4 p-2">
					<NonIdealState
						className="pb-4"
						icon="error"
						description="Select an org to view details"
					/>
				</Card>
			);
		}
		let baseStyles = 'sb-app h-full';
		if (isDark) {
			baseStyles += ' bp3-dark';
		}

		return (
			<div className={baseStyles}>
				<div className="vh-90">
					<TitleBar />
					<div id="scratchboard" className="flex">
						<Sidebar orgUsername={username} onOrgSelect={this.handleOrgSelection} />
						<div id="main" className="flex-auto">
							{contents}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(App);
