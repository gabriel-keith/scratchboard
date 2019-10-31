import React from 'react';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';

interface State {
	canSubmit: boolean;
	password: string;
	username: string;
}

export class NewUser extends React.Component<{}, State> {
	public readonly state = {
		canSubmit: false,
		password: '',
		username: ''
	};

	public render() {
		return (
			<Card id='new-users' interactive={false} className='m-4'>
				<FormGroup
					className='w-1/2'
					label="Username"
					labelFor="username"
				>
					<InputGroup id="username" />
				</FormGroup>
				<FormGroup
					className='w-1/2'
					label="Password"
					labelFor="password"
				>
					<InputGroup id="password" />
				</FormGroup>
				<Button
						className='mr-2'
						type='submit'
						text='Cancel'
						intent='warning'>
				</Button>
				<Button
						type='submit'
						text='Create User'
						intent='primary'
						disabled={!this.state.canSubmit}>
				</Button>
			</Card>
		);
	}
}
