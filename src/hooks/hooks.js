import { useState } from "react";

export function useToggle(initial) {
	const [state, setState] = useState(initial)
	return [
		state,
		function () {
			setState(state => !state)
		}
	]
}
