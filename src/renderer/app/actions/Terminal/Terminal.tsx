import React from 'react';
var os = require('os');
var pty = require('node-pty');
import { Terminal } from 'xterm';
import '../../../../../node_modules/xterm/css/xterm.css';

//TO DO:
// 1) Margins
// 2) Handle resizing
// 3) figure out how to set starting working directly
// 4) close on change of org
// 5) change bash-3.2 to working directory + username
// 6) Maybe add a border?
// 7) change background color and font color


export class Term extends React.Component {
	public render() {
		return (
			<div ref="xterm"></div>
		);
	}

	componentDidMount() {
		const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
		const ptyProcess = pty.spawn(shell, [], {
			name: 'xterm-color',
			cols: 80,
			rows: 30,
			cwd: process.cwd(), //working directory!
			env: process.env
		});

		const xterm = new Terminal();

		window.setTimeout(() => xterm.open(this.refs.xterm), 2000);

		xterm.onData(data => ptyProcess.write(data));
		ptyProcess.on('data', function (data) {
			xterm.write(data);
		});
	}
}
