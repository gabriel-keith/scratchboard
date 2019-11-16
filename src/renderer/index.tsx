import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import fixPath from 'common/fixpath';
import { store } from './store';

import App from './app/App';

import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/utilities.css';
import './style.scss';

fixPath();

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app'),
);
