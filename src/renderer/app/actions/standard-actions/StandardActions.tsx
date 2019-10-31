import React from 'react';
import { connect } from 'react-redux';

import { Alert, Button, ButtonGroup, Popover, Classes, Position, Menu, MenuItem, Intent, Card, Toaster } from '@blueprintjs/core';
import { CHEVRON_DOWN, WARNING_SIGN } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import { listUsers, openOrg, setOrgAsDefault, deleteOrg, pushToOrg } from 'common/api/sfdx';
import { clipboard } from 'electron';
import { OrgUser } from 'common/data/orgs';
import { NewUser } from '../new-user/NewUser';
import { ProjectConfig } from 'common/data/projects';
import { fetchOrgList } from 'common/store/actions/org';

export interface OwnProps {
	orgUsername: string;
	orgProject?: ProjectConfig;
}

export interface State {
	currentForm: JSX.Element | null;
	showDeleteOrgModal: boolean;
	userList: OrgUser[];
	isSetDefaultLoading: boolean;
	isOrgOpening: boolean;
	isOrgCopying: boolean;
	isPushing: boolean;
	isLoadingUsers: boolean;
}

export interface DispatchProps {
	fetchOrgList(): void;
}

const actions = {
	fetchOrgList
};

type Props = OwnProps & DispatchProps;

class StandardActions extends React.Component<Props, State> {
	private toaster?: Toaster;
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
			isPushing: false,
			isLoadingUsers: true
		};
	}

	public componentWillMount() {
		this.loadUsers();
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
							{this.buildUserList(this.openOrg.bind(this))}
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
							{this.buildUserList(this.copyOrgUrl.bind(this))}
						</Menu>
					</Popover>
				</ButtonGroup>
				<Toaster ref={this.refHandlers.toaster} />
				<Button
					className='mr-2'
					onClick={() => { this.pushToOrg(); }}
					loading={this.state.isPushing}>
						Push
					</Button>
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

	public componentDidUpdate(prevProps: Props, prevState: State, snapshot: {}) {
		if (this.props.orgUsername !== prevProps.orgUsername ||
			this.props.orgProject !== prevProps.orgProject) {
				this.loadUsers();
		}
	}

	private loadUsers() {
		this.setState({ ...this.state, userList: [], isLoadingUsers: true });
		listUsers(this.props.orgUsername)
			.then((users) => { this.setState({ ...this.state, userList: users, isLoadingUsers: false }); })
			.catch((error) => { console.error(error); this.setState({ ...this.state, isLoadingUsers: false }); });
	}

	private handleNewUserClick(): any {
		if (this.state.currentForm == null) {
			this.setState({
				...this.state,
				currentForm: < NewUser />});
		} else {
			this.setState({
				...this.state,
				currentForm: null});
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
		this.setState({
			...this.state,
			isOrgOpening: true,
			currentForm: this.renderOpenOrgConfirm()
		});
		openOrg(user || this.props.orgUsername).then( () => {
			this.setState({
				...this.state,
				currentForm: null,
				isOrgOpening: false});
		}
		);
	}

	private pushToOrg(user?: string): void {
		this.setState({isPushing: false});
		if (this.props.orgProject) {
			this.setState({currentForm: this.renderPushOrgConfirm()});
			pushToOrg(user || this.props.orgUsername, this.props.orgProject.projectDir).then( () => {
					this.setState({
						...this.state,
						currentForm: this.renderPushOrgResult(),
						isPushing: false
					});
				}
			);
		} else {
			this.setState({
				...this.state,
				currentForm: this.renderUnableToPush()});
		}
	}
	private renderUnableToPush() {
		return(
			<Card id='orgPush' interactive={false} className='m-2 mt-4'>
				<div className='flex-col justify-center'>
					<p className='mb-2'>Unable to push to org.
						Try associating the org with username: <b>{this.props.orgUsername}</b> to an existing project folder.</p>
				</div>
			</Card>
		);
	}

	private renderPushOrgConfirm() {
		return(
			<Card id='orgPush' interactive={false} className='m-2 mt-4'>
				<div className='flex-col justify-center'>
					<p className='mb-2'>Initiated push to org with username {this.props.orgUsername} </p>
				</div>
			</Card>
		);
	}

	private renderPushOrgResult() {
		return(
			<Card id='orgPushConfirm' interactive={false} className='m-2 mt-4'>
				<div className='flex-col justify-center'>
					<p className='mb-2'>Finished pushing to org</p>
				</div>
			</Card>
		);
	}

	private async copyOrgUrl(user?: string): Promise<void> {
		this.setState({isOrgCopying: true});
		this.setState({currentForm: null});
		const url = await openOrg(user || this.props.orgUsername, true);
		clipboard.writeText(url);
		this.setState({isOrgCopying: false});

		if (this.toaster) {
			this.toaster.show({ message: 'Copied to clipboard!' });
		}
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
		const orgProject = this.props.orgProject;
		if (success && orgProject) {
			return (
				<Card id='defaultSet' interactive={false} className='m-2 mt-4'>
					<div className='flex-col justify-center'>
						<p className="mb-2">Default Org successfully set </p>
						<p>Org Name: {orgProject.orgName}</p>
						<p>Project Directory: {orgProject.projectDir}</p>
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

	// private setFormToNull() {
	// 	this.setState({currentForm: null});
	// }
}

export default connect<{}, DispatchProps, OwnProps>(undefined, actions)(StandardActions);
