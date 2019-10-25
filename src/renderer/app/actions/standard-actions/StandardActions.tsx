
import React from 'react';

import { Button, ButtonGroup, Popover, Classes, Position, Menu, MenuItem, Intent } from '@blueprintjs/core';
import { CHEVRON_DOWN } from '@blueprintjs/icons/lib/esm/generated/iconNames';

export class StandardActions extends React.Component {
	public render() {
		return (
			<div id='actions' className='m-4'>
				<ButtonGroup className='mr-2'>
					<Button onClick={() => { this.openOrg(); }}>Open</Button>
					<Popover minimal={true} position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN}></Button>
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className='p-2'>Open as...</h5>
							{this.buildUserList(this.openOrg)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<ButtonGroup className='mr-2'>
					<Button onClick={() => { this.copyOrgUrl(); }}>Copy Frontdoor</Button>
					<Popover minimal={true} position={Position.BOTTOM_RIGHT}>
						<Button rightIcon={CHEVRON_DOWN}></Button>
						<Menu className={Classes.POPOVER_DISMISS}>
							<h5 className='p-2'>Copy as...</h5>
							{this.buildUserList(this.copyOrgUrl)}
						</Menu>
					</Popover>
				</ButtonGroup>
				<Button className='mr-2' intent={Intent.WARNING} onClick={() => { this.setAsDefault(); }}>Set as Default</Button>
				<Button className='mr-2' intent={Intent.DANGER} onClick={() => { this.deleteOrg(); }}>Delete</Button>
			</div>
		);
	}

	private buildUserList(action: (user?: string) => void) {
		const users: string[] = [ 'Test User 1', 'Test User 2', 'Test User 3' ];
		const userList = [];
		for (const user of users) {
			userList.push(<MenuItem key={user} onClick={() => { action(user); }} text={user} />);
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
