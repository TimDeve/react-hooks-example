import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

export class Image extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: null,
			isLoading: false,
			error: false,
		}

		this.fetchData.bind(this)
	}

	componentDidMount() {
		this.fetchData()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.id !== this.props.id) {
			this.fetchData()
		}
	}

	fetchData() {
		this.setState({ isLoading: true, setError: false })

		fetch(`https://jsonplaceholder.typicode.com/photos/${this.props.id}`)
			.then(res => {
				if (!res.ok) this.setState({ setError: true })
				return res.json()
			})
			.then(json => {
				this.setState({ isLoading: false, data: json })
			})
			.catch(() => {
				this.setState({ isLoading: false, setError: true })
			})
	}

	render() {
		if (this.state.error) return <p>There was an error. Sorry.</p>

		if (this.state.isLoading) return <p>Loading</p>

		return this.state.data ? <img style={{ width: this.props.width }} src={this.state.data.url} /> : null
	}
}

export function Container() {
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

storiesOf('API with class', module).add('Example', () => <Container />)
