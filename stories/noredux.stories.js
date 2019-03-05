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

function Container() {
	return (
		<div>
			<p>Counting stuff:</p>
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
