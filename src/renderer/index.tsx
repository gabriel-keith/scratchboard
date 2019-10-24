import React from 'react'
import ReactDom from 'react-dom'

import { Counter } from './components/Counter'

import './style.scss'

ReactDom.render(
	<div className='sb-app bp3-dark'>
		<Counter increment={3} />
	</div>,
	document.getElementById('app')
)