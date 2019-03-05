export default function ThrowingComponent() {
	useEffect(() => {
		throw new Error('This was mounted')
	})

	return <div>Hello</div>
}
