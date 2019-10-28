import React from 'react';
var os = require('os');
var pty = require('node-pty');
import { Terminal } from 'xterm';
import '../../../../../node_modules/xterm/css/xterm.css';
import { ProjectConfig } from 'common/data/projects';
import { number } from 'prop-types';
import './Terminal.css';

interface Props {
	orgProject?: ProjectConfig;
	isTerm: boolean;
}

export class Term extends React.Component<Props> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			loadedBefore: false,
		};
	}

	public render() {
		return (
			<div className="flex mx-auto w-full border-solid border border-teal-900 rounded overflow-hidden">
				<div ref="xterm" className='w-full'></div>
			</div>
		);
	}

	componentDidUpdate() {
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
			cwd: this.props.orgProject ? this.props.orgProject.projectDir : process.env.HOME,
			env: process.env
		});

		const xterm = new Terminal({
			theme: {
				background: '#293742',
				cursor: '#00ff00',
				cursorAccent: '#293742',
				red: '#FF605C',
				selection: 'transparent'
			}
		});

		xterm.writeln('Welcome to Scratchboard Terminal. Please use `exec bash -l` for the full bash experience.');
		xterm.open(this.refs.xterm);
		xterm.focus();

		xterm.onData(data => ptyProcess.write(data));
		ptyProcess.on('data', function (data) {
			xterm.write(data);
		});
		this.state.loadedBefore = true;
	}
}
