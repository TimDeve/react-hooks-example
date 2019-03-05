import React, { useReducer } from 'react'

const INITIAL_STATE = { count: 0 }

export const NoReduxContext = React.createContext([INITIAL_STATE, () => {}])

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
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	return <NoReduxContext.Provider value={[state, dispatch]}>{children}</NoReduxContext.Provider>
}
