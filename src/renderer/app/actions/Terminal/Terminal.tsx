import React from 'react';
import os from 'os';
import pty from 'node-pty';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { ProjectConfig } from 'common/data/projects';
import './Terminal.css';

interface Props {
	orgProject?: ProjectConfig;
	isTerm: boolean;
}

interface State {
	loadedBefore: boolean;
}

export class Term extends React.Component<Props, State> {
	public readonly state = {
		loadedBefore: false
	};

	public xterm = React.createRef<HTMLDivElement>();

	public render() {
		return (
			<div className="flex mx-auto pb-5 w-full border-solid border shadow border-blue-900 rounded overflow-hidden bg-term">
				<div ref={this.xterm} className='w-full'></div>
			</div>
		);
	}

	public componentDidUpdate() {
		if (this.props.isTerm && !this.state.loadedBefore) {
			this.loadTerm();
		}
	}

	private loadTerm() {
		const xtermDiv = this.xterm.current;
		const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];

		if (xtermDiv && shell) {
			// To change into the orgProject folder: cwd: this.props.orgProject ? this.props.orgProject.projectDir : process.env.HOME
			const ptyProcess = pty.spawn(shell, [], {
				name: 'xterm-color',
				cols: 120,
				rows: 25,
				cwd: process.env.HOME,
				//env: process.env
			});

			// Update with colors as you find the need.
			// iTerm Theme docs: https://xtermjs.org/docs/api/terminal/interfaces/itheme/
			// Terminal colors for reference: https://jeffkreeftmeijer.com/vim-16-color/
			const xterm = new Terminal({
				cols: 120,
				rows: 25,
				theme: {
					background: '#202B33',
					cursor: '#00ff00',
					cursorAccent: '#202B33',
					red: '#ff443a'
				}
			});

			xterm.open(xtermDiv);
			xterm.focus();

			xterm.onData(data => ptyProcess.write(data));
			ptyProcess.on('data', (data) => {
				xterm.write(data);
			});
			this.state.loadedBefore = true;
		}
	}
}
