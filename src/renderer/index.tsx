import React from 'react'
import ReactDom from 'react-dom'

import { Counter } from './components/Counter'

import './style.scss'

function sayHi() {
	console.log('Hi')
}

ReactDom.render(
	<div className='sb-app bp3-dark'>
		<Counter increment={3} handleClick={sayHi} />
	</div>,
	document.getElementById('app')
)