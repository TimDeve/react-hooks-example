import React, { useContext } from 'react'
import { storiesOf } from '@storybook/react'

import { NoReduxContext, inc, dec, NoReduxProvider } from '../src/noRedux'

function Counter() {
	const [state, dispatch] = useContext(NoReduxContext)

	return (
		<div>
			<p>Count: {state.count}</p>
			<button onClick={() => dispatch(inc())}>+</button>
			<button onClick={() => dispatch(dec())}>-</button>
		</div>
	)
}

function CounterDisplay() {
	const [state] = useContext(NoReduxContext)

	return <h1>{state.count}</h1>
}

function Container() {
	return (
		<div>
			<CounterDisplay />
			<Counter />
			<Counter />
			<Counter />
		</div>
	)
}

storiesOf('noRedux', module).add('Example', () => (
	<NoReduxProvider>
		<Container />
	</NoReduxProvider>
))
