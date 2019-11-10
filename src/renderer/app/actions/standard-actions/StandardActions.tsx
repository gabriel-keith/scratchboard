import React from 'react';
import { connect } from 'react-redux';

import {
	Alert,
	Button,
	ButtonGroup,
	Popover,
	Classes,
	Position,
	Menu,
	MenuItem,
	Intent,
} from '@blueprintjs/core';
import { CHEVRON_DOWN, WARNING_SIGN } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import { listUsers, openOrg, setOrgAsDefault, deleteOrg } from 'common/api/sfdx';
import { clipboard } from 'electron';
import { OrgUser } from 'common/data/orgs';
import { ProjectConfig } from 'common/data/projects';
import { fetchOrgList } from 'common/store/actions/org';

export interface OwnProps {
	orgUsername: string;
	orgProject?: ProjectConfig;
}

export interface State {
	showDeleteOrgModal: boolean;
	userList: OrgUser[];
}

export interface DispatchProps {
	fetchOrgList(): void;
}

const actions = {
	fetchOrgList,
};

type Props = OwnProps & DispatchProps;

class StandardActions extends React.Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = {
			showDeleteOrgModal: false,
			userList: [],
		};

		this.copyOrgUrl = this.copyOrgUrl.bind(this);
		this.openOrg = this.openOrg.bind(this);
	}

	public UNSAFE_componentWillMount() {
		this.loadUsers();
	}

	public componentDidUpdate(prevProps: Props) {
		const { orgUsername, orgProject } = this.props;
		if (orgUsername !== prevProps.orgUsername || orgProject !== prevProps.orgProject) {
			this.loadUsers();
		}
	}

	private setAsDefault() {
		const { orgProject, orgUsername } = this.props;

		if (orgProject) {
			setOrgAsDefault(orgUsername, orgProject.projectDir);
		}
	}

	private async copyOrgUrl(user?: string): Promise<void> {
		const { orgUsername } = this.props;

		const url = await openOrg(user || orgUsername, true);
		clipboard.writeText(url);
	}

	private openOrg(user?: string) {
		const { orgUsername } = this.props;

		openOrg(user || orgUsername).then(() => {});
	}

	private buildUserList(action: (user?: string) => void | Promise<void>) {
		const { userList } = this.state;

		return userList.map((user) => (
			<MenuItem
				key={user.username}
				onClick={() => {
					action(user.username);
				}}
				text={user.username}
			/>
		));
	}

	private loadUsers() {
		const { orgUsername } = this.props;

		this.setState({ userList: [] });
		listUsers(orgUsername)
			.then((users) => {
				this.setState({ userList: users });
			})
			.catch((error) => {
				console.error(error);
			});
	}

	private deleteOrg() {
		const { orgUsername } = this.props;
		deleteOrg(orgUsername);
	}

	public render() {
		const { showDeleteOrgModal } = this.state;

		return (
			<div id="actions">
				<ButtonGroup className="mr-2 mb-2">
					<Button
						onClick={() => {
							this.openOrg();
						}}
					>
						Open
					</Button>
					<Popover minimal position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN} />
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className="p-2">Open as...</h5>
							{this.buildUserList(this.openOrg)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<ButtonGroup className="mr-2 mb-2">
					<Button
						onClick={() => {
							this.copyOrgUrl();
						}}
					>
						Copy Frontdoor
					</Button>
					<Popover minimal position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN} />
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className="p-2">Copy as...</h5>
							{this.buildUserList(this.copyOrgUrl)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<Button
					className="mr-2"
					intent={Intent.WARNING}
					onClick={() => {
						this.setAsDefault();
					}}
				>
					Set as Default
				</Button>
				<Button
					className="mr-2"
					intent={Intent.DANGER}
					onClick={() => {
						this.setState({ showDeleteOrgModal: true });
					}}
				>
					Delete
				</Button>
				<Alert
					cancelButtonText="Cancel"
					confirmButtonText="Delete Org"
					icon={WARNING_SIGN}
					intent={Intent.DANGER}
					isOpen={showDeleteOrgModal}
					onCancel={() => {
						this.setState({ showDeleteOrgModal: false });
					}}
					onConfirm={() => {
						this.setState({ showDeleteOrgModal: false });
						this.deleteOrg();
					}}
				>
					<p>Are you sure you want to delete this org? This action cannot be undone.</p>
				</Alert>
			</div>
		);
	}
}

export default connect<{}, DispatchProps, OwnProps>(undefined, actions)(StandardActions);
