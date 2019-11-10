import { remote } from 'electron';
import React from 'react';

export default class TitleBar extends React.Component {
	private static handleDoubleClick() {
		const doubleClickAction = remote.systemPreferences.getUserDefault(
			'AppleActionOnDoubleClick',
			'string',
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

	public render() {
		return <div className="sb-title-bar" onDoubleClick={TitleBar.handleDoubleClick} />;
	}
}
