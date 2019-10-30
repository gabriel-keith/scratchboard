import React from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

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
			<div id='new-users' className='m-4'>
				<FormGroup
					label="Username"
					labelFor="username"
				>
					<InputGroup id="username" />
				</FormGroup>
				<FormGroup
					label="Password"
					labelFor="password"
				>
					<InputGroup id="password" />
				</FormGroup>
				<Button
						type='submit'
						text='Create User'
						intent='primary'
						disabled={!this.state.canSubmit}>
				</Button>
			</div>
		);
	}
}
