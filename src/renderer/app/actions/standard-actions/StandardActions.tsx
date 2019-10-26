import React from 'react';

import { Alert, Button, ButtonGroup, Popover, Classes, Position, Menu, MenuItem, Intent } from '@blueprintjs/core';
import { CHEVRON_DOWN, WARNING_SIGN } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import { listUsers, openOrg, setOrgAsDefault, deleteOrg } from 'common/api/sfdx';
import { clipboard } from 'electron';
import { OrgUser } from 'common/data/orgs';
import { NewUser } from '../new-user/NewUser';

export interface StandardActionsProps {
	orgUsername: string;
}

export interface StandardActionsState {
	currentForm: JSX.Element | null;
	showDeleteOrgModal: boolean;
	userList: OrgUser[];
}

export class StandardActions extends React.Component<StandardActionsProps, StandardActionsState> {
	public constructor(props: StandardActionsProps) {
		super(props);
		this.state = {
			currentForm: null,
			showDeleteOrgModal: false,
			userList: []
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
					<Button onClick={() => { this.openOrg(); }}>Open</Button>
					<Popover minimal={true} position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN}></Button>
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className='p-2'>Open as...</h5>
							{this.buildUserList(this.openOrg)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<ButtonGroup className='mr-2 mb-2'>
					<Button onClick={() => { this.copyOrgUrl(); }}>Copy Frontdoor</Button>
					<Popover minimal={true} position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN}></Button>
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className='p-2'>Copy as...</h5>
							{this.buildUserList(this.copyOrgUrl)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<Button className='mr-2' intent={Intent.PRIMARY} onClick={() => this.handleNewUserClick()}>
					New User
				</Button>
				<Button className='mr-2' intent={Intent.WARNING} onClick={() => { this.setAsDefault(); }}>
					Set as Default
				</Button>
				<Button className='mr-2' intent={Intent.DANGER} onClick={() => { this.setState({ showDeleteOrgModal: true }); }}>
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
		openOrg(user || this.props.orgUsername);
	}

	private async copyOrgUrl(user?: string): Promise<void> {
		const url = await openOrg(user || this.props.orgUsername, true);
		clipboard.writeText(url);
	}

	private setAsDefault(): void {
		setOrgAsDefault(this.props.orgUsername, './');
	}

	private deleteOrg(): void {
		deleteOrg(this.props.orgUsername);
	}
}
