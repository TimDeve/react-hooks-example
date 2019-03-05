import { useReducer } from 'react'

export function useLocalReducer(localStorageKey, reducer, initialArg, init) {
	const savedValue = localStorage.getItem(localStorageKey)

	const [state, dispatch] = useReducer(reducer, savedValue ? JSON.parse(savedValue) : initialArg, init)

	const localDispatch = action => {
		localStorage.setItem(localStorageKey, JSON.stringify(reducer(state, action)))
		dispatch(action)
	}

	return [state, localDispatch]
}
