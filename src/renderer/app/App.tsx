import React from 'react';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import { Sidebar } from './sidebar/Sidebar';

export class App extends React.Component {
	public render() {
		return (
			<div id="scratchboard">
				<Sidebar />
				<div id="main">
					<Details />
					<Actions />
				</div>
			</div>
		);
	}
}
