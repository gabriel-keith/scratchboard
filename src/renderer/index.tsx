import React from 'react'
import ReactDom from 'react-dom'

import { App } from './app/App'

import './style.scss'

ReactDom.render(
	<div className='sb-app bp3-dark'>
		<App />
	</div>,
	document.getElementById('app')
)