import React from 'react';
import ReactDom from 'react-dom';

import { App } from './app/App';

import './style.scss';
import './tailwind.scss';

ReactDom.render(
	<App />,
	document.getElementById('app')
);
