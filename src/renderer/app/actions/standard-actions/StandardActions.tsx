import React from 'react';
import { connect } from 'react-redux';

import { Alert, Button, ButtonGroup, Popover, Classes, Position, Menu, MenuItem, Intent, Overlay, Card, Toaster } from '@blueprintjs/core';
import { CHEVRON_DOWN, WARNING_SIGN } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import { listUsers, openOrg, setOrgAsDefault, deleteOrg } from 'common/api/sfdx';
import { clipboard } from 'electron';
import { OrgUser } from 'common/data/orgs';
import { NewUser } from '../new-user/NewUser';
import { ProjectConfig } from 'common/data/projects';
import { fetchOrgList } from 'common/store/actions/org';

export interface StandardActionsProps {
	orgUsername: string;
	orgProject?: ProjectConfig;
}

export interface StandardActionsState {
	currentForm: JSX.Element | null;
	showDeleteOrgModal: boolean;
	userList: OrgUser[];
	isSetDefaultLoading: boolean;
	isOrgOpening: boolean;
	isOrgCopying: boolean;
}

export interface DispatchProps {
	fetchOrgList(): void;
}

const actions = {
	fetchOrgList
};

type Props = StandardActionsProps | DispatchProps;

class StandardActions extends React.Component<Props, StandardActionsState> {
	private toaster: Toaster;
	private refHandlers = {
		toaster: (ref: Toaster) => (this.toaster = ref),
	};

	public constructor(props: Props) {
		super(props);

		this.state = {
			currentForm: null,
			showDeleteOrgModal: false,
			userList: [],
			isSetDefaultLoading: false,
			isOrgOpening: false,
			isOrgCopying: false,
		};
	}

	public componentWillMount() {
		listUsers(this.props.orgUsername)
			.then((users) => { this.setState({ ...this.state, userList: users }); })
			.catch((error) => { console.error(error); });
	}

	public render() {
		return (
			<div id='actions'>
				<ButtonGroup className='mr-2 mb-2'>
					<Button
						onClick={() => { this.openOrg(); }}
						loading={this.state.isOrgOpening}>
							Open
					</Button>
					<Popover minimal={true} position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN} disabled={this.state.isOrgOpening}></Button>
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className='p-2'>Open as...</h5>
							{this.buildUserList(this.openOrg)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<ButtonGroup className='mr-2 mb-2'>
					<Button
						onClick={() => { this.copyOrgUrl(); }}
						loading={this.state.isOrgCopying}>Copy Frontdoor</Button>
					<Popover minimal={true} position={Position.BOTTOM_RIGHT}>
						<Button
							rightIcon={CHEVRON_DOWN}
							disabled={this.state.isOrgCopying}></Button>
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className='p-2'>Copy as...</h5>
							{this.buildUserList(this.copyOrgUrl)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<Toaster ref={this.refHandlers.toaster} />
				<Button className='mr-2' intent={Intent.PRIMARY} onClick={() => this.handleNewUserClick() }>
					New User
				</Button>
				<Button className='mr-2'
					intent={Intent.WARNING}
					onClick={() => { this.setAsDefault(); }}
					loading={this.state.isSetDefaultLoading}>
					Set as Default
				</Button>
				<Button className='mr-2'
					intent={Intent.DANGER}
					onClick={() => { this.setState({ showDeleteOrgModal: true }); }}>
					Delete
				</Button>
				<Alert
					cancelButtonText='Cancel'
					confirmButtonText='Delete Org'
					icon={WARNING_SIGN}
					intent={Intent.DANGER}
					isOpen={this.state.showDeleteOrgModal}
					onCancel={() => { this.setState({ showDeleteOrgModal: false }); }}
					onConfirm={() => {
						this.setState({ showDeleteOrgModal: false });
						this.deleteOrg();
					}}
				>
					<p>
						Are you sure you want to delete this org? This action cannot be
						undone.
					</p>
				</Alert>
				<div>
					{this.state.currentForm}
				</div>
			</div>
		);
	}

	private handleNewUserClick(): any {
		if (this.state.currentForm == null) {
			this.setState({currentForm: < NewUser />});
		} else {
			this.setState({currentForm: null});
		}
		this.forceUpdate();
	}

	private buildUserList(action: (user?: string) => void) {
		const users = this.state.userList;
		const userList: JSX.Element[] = [];

		for (const user of users) {
			userList.push(
				<MenuItem key={user.username} onClick={() => { action(user.username); }} text={user.username} />
			);
		}
		return userList;
	}

	private openOrg(user?: string): void {
		this.setState({isOrgOpening: true});
		this.setState({currentForm: this.renderOpenOrgConfirm()});
		openOrg(user || this.props.orgUsername).then( () => {
			this.setState({currentForm: null});
			this.setState({isOrgOpening: false});
		}
		);
	}

	private async copyOrgUrl(user?: string): Promise<void> {
		this.setState({isOrgCopying: true});
		this.setState({currentForm: null});
		const url = await openOrg(user || this.props.orgUsername, true);
		clipboard.writeText(url);
		this.setState({isOrgCopying: false});
		this.toaster.show({ message: 'Copied to clipboard!' });
	}

	private setAsDefault(): void {
		this.setState({isSetDefaultLoading: true});
		const orgProject = this.props.orgProject;
		if (orgProject) {
			setOrgAsDefault(this.props.orgUsername, orgProject.projectDir);
			this.setState({currentForm: this.renderDefaultOrgMessage(true)});
		} else {
			this.setState({currentForm: this.renderDefaultOrgMessage(false)});
		}
		this.forceUpdate();
		this.setState({isSetDefaultLoading: false});
	}

	private deleteOrg(): void {
		deleteOrg(this.props.orgUsername);
	}

	private renderDefaultOrgMessage(success: boolean) {
		if (success) {
			return (
				<Card id='defaultSet' interactive={false} className='m-2 mt-4'>
					<div className='flex-col justify-center'>
						<p className="mb-2">Default Org successfully set </p>
						<p>Org Name: {this.props.orgProject.orgName}</p>
						<p>Project Directory: {this.props.orgProject.projectDir}</p>
					</div>
				</Card>
			);
		} else {
			return (
				<Card id='defaultSet' interactive={false} className='m-2'>
					<div className='flex justify-center'>
						<p> Defualt Org unable to be set</p>
					</div>
				</Card>
			);
		}
	}

	private renderOpenOrgConfirm() {
		return (
			<Card id='defaultSet' interactive={false} className='m-2 mt-4'>
				<div className='flex-col justify-center'>
					<p>Org opening...</p>
				</div>
			</Card>
		);
	}
}

export default connect<{}, DispatchProps, StandardActionsProps>(undefined, actions)(StandardActions);
