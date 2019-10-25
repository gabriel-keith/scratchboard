import React from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

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
						text='Submit'
						intent='primary'
						disabled={this.state.isButtonDisabled}
						onClick={() => this.upgrade()}>
				</Button>
			</div>
        );
    }
}
