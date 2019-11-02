import React from 'react';
import ReactDom from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';

import App from './app/App';

import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/utilities.css';
import './style.scss';

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
