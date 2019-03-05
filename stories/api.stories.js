import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import useApi from '../src/hooks/useApi'

function Image({ id, width }) {
	const [data, isLoading, error] = useApi(`https://jsonplaceholder.typicode.com/photos/${id}`)

	if (error) return <p>There was an error. Sorry.</p>

	if (isLoading) return <p>Loading</p>

	return data ? <img style={{ width }} src={data.url} /> : null
}

function Container() {
	const [id, setId] = useState(1)
	const [width, setWidth] = useState('400')

	return (
		<div>
			<form>
				<label>id:</label>
				<input value={id} onChange={event => setId(event.target.value)} />

				<label>width:</label>
				<input
					type="range"
					min="0"
					max="400"
					value={width}
					onChange={event => setWidth(event.target.value)}
				/>
			</form>

			<Image width={`${width}px`} id={id} />
		</div>
	)
}

storiesOf('API', module).add('Example', () => <Container />)
