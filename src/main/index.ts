import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import { store } from './store';

import { fetchOrgList } from 'common/store/actions/org';
import { setTheme } from 'common/store/actions/settings';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null = null;

function createMainWindow() {
	const window = new BrowserWindow({
		webPreferences: { nodeIntegration: true },
		titleBarStyle: 'hiddenInset',
		width: 800,
		height: 800
	});

	if (isDevelopment) {
		window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
	} else {
		window.loadURL(
			formatUrl({
				pathname: path.join(__dirname, 'index.html'),
				protocol: 'file',
				slashes: true
			})
		);
	}

	window.on('closed', () => {
		mainWindow = null;
	});

	window.webContents.on('devtools-opened', () => {
		window.focus();
		setImmediate(() => {
			window.focus();
		});
	});

	return window;
}

function createAppMenu(): Menu {
	return Menu.buildFromTemplate([
		{
			label: app.getName(),
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unHide' },
				{ type: 'separator' },
				{ role: 'quit' }
			] as any[]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		},
		{
			label: 'Window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'zoom' },
				{ type: 'separator' },
				{ role: 'front' },
				{ type: 'separator' }
			]
		},
		{
			label: 'Theme',
			submenu: [
				{
					label: 'Toggle Theme',
					click: () => {
						const state = store.getState();
						store.dispatch(setTheme(
							state.settings.theme === 'dark' ? 'light' : 'dark'
						));
					}
				}
			]
		}
	]);
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
	// on macOS it is common for applications to stay open until the user explicitly quits
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// on macOS it is common to re-create a window even after all windows have been closed
	if (mainWindow === null) {
		mainWindow = createMainWindow();
	}
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
	mainWindow = createMainWindow();
	Menu.setApplicationMenu(createAppMenu());

	store.dispatch(fetchOrgList());
});
