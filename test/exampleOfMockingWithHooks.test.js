jest.mock('../src/ThrowingComponent')

import React, { useState } from 'react'
import { mount } from 'enzyme'
import ThrowingComponent from '../src/ThrowingComponent'

export function Container() {
	const [num, setNum] = useState(100)
	return (
		<div>
			<input type="text" onChange={event => setNum(event.target.value)} />

			<ThrowingComponent aProp={num} />
		</div>
	)
}

describe('ThrowingComponent', () => {
	beforeAll(() => {
		ThrowingComponent.mockImplementation(() => <></>)
	})

	it('has a ThrowingComponent', () => {
		const wrapper = mount(<Container />)

		const throwing = wrapper.find(ThrowingComponent)

		expect(throwing.exists()).toBe(true)
		expect(throwing.prop('aProp')).toBe(100)
	})

	it('prop change with state', () => {
		const wrapper = mount(<Container />)

		let throwing = wrapper.find(ThrowingComponent)

		expect(throwing.exists()).toBe(true)
		expect(throwing.prop('aProp')).toBe(100)

		wrapper.find('input').simulate('change', { target: { value: 200 } })

		wrapper.update()
		throwing = wrapper.find('ThrowingComponent')
		expect(throwing.prop('aProp')).toBe(200)
	})
})
