import React from 'react';
var os = require('os');
var pty = require('node-pty');
import { Terminal } from 'xterm';
import '../../../../../node_modules/xterm/css/xterm.css';
import { ProjectConfig } from 'common/data/projects';
import { number } from 'prop-types';

//TO DO:
// 1) Margins
// 2) Handle resizing (check?)
// 3) figure out how to set starting working directory (check)
// 4) close on change of org
// 5) change bash-3.2 to working directory + username => exec bash vs exec bash --login / exec bash -l
// 6) Maybe add a border?
// 7) change background color and font color

interface Props {
	orgProject?: ProjectConfig;
	isTerm: boolean;
}

export class Term extends React.Component<Props> {
	public constructor(props: Props) {
		super(props);
		this.state = {
			loadedBefore: false
		};
	}

	public render() {
		return (
			<div className="flex mx-auto w-full">
				<div ref="xterm" className='w-full'></div>
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isTerm && !this.state.loadedBefore) {
			this.loadTerm();
		}
	}

	loadTerm() {
		const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
		const ptyProcess = pty.spawn(shell, [], {
			name: 'xterm-color',
			cols: 80,
			rows: 30,
			cwd: this.props.ProjectConfig ? this.props.ProjectConfig.projectDirectory : process.env.HOME,
			env: process.env
		});

		const xterm = new Terminal();

		xterm.open(this.refs.xterm);

		xterm.onData(data => ptyProcess.write(data));
		ptyProcess.on('data', function (data) {
			xterm.write(data);
		});
		this.state.loadedBefore = true;
	}
}
