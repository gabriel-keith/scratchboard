import { remote } from 'electron';
import React from 'react';

export class TitleBar extends React.Component {
	constructor(props: {}) {
		super(props);

		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	public render() {
		return <div className='sb-title-bar' onDoubleClick={this.handleDoubleClick} ></div>;
	}

	private handleDoubleClick() {
		const doubleClickAction = remote.systemPreferences.getUserDefault(
			'AppleActionOnDoubleClick',
			'string'
		);
		const win = remote.getCurrentWindow();
		if (doubleClickAction === 'Minimize') {
			win.minimize();
		} else if (doubleClickAction === 'Maximize') {
			if (!win.isMaximized()) {
				win.maximize();
			} else {
				win.unmaximize();
			}
		}
	}
}
