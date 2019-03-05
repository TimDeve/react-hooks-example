import React, { useReducer } from 'react'

export const NoReduxContext = React.createContext([{ count: 0 }, () => {}])

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 }
		case 'decrement':
			return { count: state.count - 1 }
		default:
			throw new Error()
	}
}

export function inc() {
	return { type: 'increment' }
}

export function dec() {
	return { type: 'decrement' }
}

export function NoReduxProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, { count: 0 })

	return <NoReduxContext.Provider value={[state, dispatch]}>{children}</NoReduxContext.Provider>
}
