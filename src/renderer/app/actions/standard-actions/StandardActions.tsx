
import React from 'react';

import { Alert, Button, ButtonGroup, Popover, Classes, Position, Menu, MenuItem, Intent } from '@blueprintjs/core';
import { CHEVRON_DOWN, WARNING_SIGN } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import { User } from '../../common/interfaces/User';
import { NewUser } from '../new-user/NewUser';
const newUserForm: any = < NewUser />;

export interface StandardActionsState {
	showDeleteOrgModal: boolean;
	currentForm: any;
}

export class StandardActions extends React.Component<{}, StandardActionsState> {
	public constructor(props: {}) {
		super(props);
		this.state = {
			currentForm: null,
			showDeleteOrgModal: false
		};
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
				<Button className='mr-2 mb-2' intent={Intent.PRIMARY} onClick={() => this.handleNewUserClick()}>
					New User
				</Button>
				<Button className='mr-2' intent={Intent.WARNING} onClick={() => { this.setAsDefault(); }}>
					Set as Default
				</Button>
				<Button className='mr-2' intent={Intent.DANGER} onClick={() => { this.setState({showDeleteOrgModal: true}); }}>
					Delete
				</Button>

				<Alert
					cancelButtonText='Cancel'
					confirmButtonText='Delete Org'
					icon={WARNING_SIGN}
					intent={Intent.DANGER}
					isOpen={this.state.showDeleteOrgModal}
					onCancel={() => { this.setState({showDeleteOrgModal: false}); }}
					onConfirm={() => { this.setState({showDeleteOrgModal: false}); this.deleteOrg(); }}
				>
					<p>Are you sure you want to delete this org? This action cannot be undone.</p>
				</Alert>
				<div>
					{this.state.currentForm}
				</div>
			</div>
		);
	}

	private handleNewUserClick(): any {
		if (this.state.currentForm == null) {
			this.setState({currentForm: newUserForm});
		} else {
			this.setState({currentForm: null});
		}
		this.forceUpdate();
		
	}
	private buildUserList(action: (user?: string) => void) {
		const users: User[] = [
			{ alias: 'Test User 1' } as User,
			{ alias: 'Test User 2' } as User,
			{ alias: 'Test User 3' } as User
		];
		const userList = [];
		for (const user of users) {
			userList.push(<MenuItem key={user.alias} onClick={() => { action(user.alias); }} text={user.alias} />);
		}
		return userList;
	}

	private openOrg(user?: string): void {
		console.log(user);
		console.log('Opening...');
	}

	private copyOrgUrl(user?: string): void {
		console.log(user);
		console.log('Copying...');
	}

	private setAsDefault(): void {
		console.log('Setting as default...');
	}

	private deleteOrg(): void {
		console.log('Deleting...');
	}
}
