import React from 'react';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import { Sidebar } from './sidebar/Sidebar';

export class App extends React.Component {
	public render() {
		return (
			<div id="scratchboard" className="flex">
				<Sidebar />
				<div id="main" className="flex-auto">
					<Details />
					<Actions />
				</div>
			</div>
		);
	}
}
