import React from 'react';

import { store } from '../store';
import { Provider } from 'react-redux';
import { TitleBar } from './Titlebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';
import { Sidebar } from './sidebar/Sidebar';


export class App extends React.Component {

	public render() {
		return (
			<div className='sb-app bp3-dark h-full'>
				<Provider store={store}>
					<div className='vh-90'>
						<TitleBar />
						<div id="scratchboard" className="flex">
							<Sidebar />
							<div id="main" className="flex-auto">
								<Details />
								<Actions />
							</div>
						</div>
					</div>
				</Provider>
			</div>
		);
	}
}
