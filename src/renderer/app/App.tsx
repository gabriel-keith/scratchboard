import React from 'react';

import { TitleBar } from './Titlebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import { Sidebar } from './sidebar/Sidebar';

export class App extends React.Component {

	public render() {
		return (
			<div className='sb-app bp3-dark'>
				<TitleBar />
				<div id="scratchboard" className="flex">
					<Sidebar />
					<div id="main" className="flex-auto">
						<Details />
						<Actions />
					</div>
				</div>
			</div>
		);
	}
}
