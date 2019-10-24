import React from 'react'
import { Button } from '@blueprintjs/core'

//Just an example component to mess around with

export interface CounterProps {
	increment: number
}

export interface CounterState {
	count: number
}

export class Counter extends React.Component<CounterProps, CounterState> {
	constructor(props: CounterProps) {
		super(props)

		this.handleIncrement = this.handleIncrement.bind(this);

		this.state = {
			count: 0
		}
	}

	handleIncrement() {
		this.setState({
			...this.state,
			count: this.state.count + this.props.increment
		})
	}

	render() {
		return <div className="sb-counter">
			<div>Count: {this.state.count}</div>
			<Button onClick={this.handleIncrement}>Increment by {this.props.increment}</Button>
		</div>
	}
}