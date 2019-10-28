import React from 'react';
var os = require('os');
var pty = require('node-pty');
import { Terminal } from 'xterm';
import '../../../../../node_modules/xterm/css/xterm.css';
import { ProjectConfig } from 'common/data/projects';

//TO DO:
// 1) Margins
// 2) Handle resizing
// 3) figure out how to set starting working directly
// 4) close on change of org
// 5) change bash-3.2 to working directory + username
// 6) Maybe add a border?
// 7) change background color and font color

interface Props {
	orgProject?: ProjectConfig;
}

export class Term extends React.Component<Props> {
	public render() {
		return (
			<div className="flex mx-auto w-full">
				<div ref="xterm" className='w-full'></div>
			</div>
		);
	}

	componentDidMount() {
		const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
		const ptyProcess = pty.spawn(shell, [], {
			name: 'xterm-color',
			cols: 80,
			rows: 30,
			cwd: process.cwd(), // working directory!
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
