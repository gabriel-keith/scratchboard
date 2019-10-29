import React from 'react';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';

export class NewUser extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			canSubmit: false,
			password: null,
			username: null
		};
	}

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
						intent='warning'
						onClick={() => this.setFormToNull()}>
				</Button>
				<Button
						type='submit'
						text='Create User'
						intent='primary'
						disabled={!this.state.canSubmit}
						onClick={() => this.upgrade()}>
				</Button>
			</Card>
        );
    }
}
